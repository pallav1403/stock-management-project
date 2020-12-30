import Axios from 'axios'
import React,{useEffect,useState,useContext} from 'react'
import {Link,Redirect, useHistory} from 'react-router-dom'
import NavComp from './NavComp'
// import UserContext from '../context/UserContext'
export default function Investor(props) {
  const role=localStorage.getItem('role')
const token=localStorage.getItem('token')
const history=useHistory()
  // let {userData,setUser}=useContext(UserContext);
  const [users,setuser]=useState([])
  useEffect(() => {
    isLoggedIn()
    getUsers()
  }, [])

  const isLoggedIn=()=>{
    if(!token){
      history.push('/login')
    }
  
  else if(token){
    if(role!='admin'){
      history.push('/unauthorized')
    }
  }
  }
  // if(userData.user.users){
  //   var role=userData.user.users[0].role
  // }
  const getUsers= async ()=>{
    const response=await Axios.get('http://localhost:8000/investor')
    // console.log(response.data)
    setuser(response.data.users.reverse());
  }
  const handleClick= async(user_id)=>{
    await Axios.delete(`http://localhost:8000/investor/${user_id}`)
    getUsers();
  }
  if(role==='investor'||role==='admin'){
  return (
    <div>
      <NavComp/>

      
      <div className="container main bg-white border shadow mt-3">
      <div className="py-2">
      <Link className="btn btn-primary float-right mt-3 mb-3 border shadow" to="/add-investors">Add Investor</Link>


      <table className="table border shadow">
  <thead className="thead-dark">
    <tr>
    <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      users.map((user,index)=>
       (
          <tr>
      <th scope="row">{index+1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
      <Link className="btn btn-outline-primary mr-2">Show</Link>
      <Link className="btn btn-outline-warning mr-2" to={`/edit-investors/${user.user_id}`}>Edit</Link>
      <Link className="btn btn-outline-danger" onClick={()=>{handleClick(user.user_id)}}>Delete</Link>
      </td>
    </tr>
        )
      )
    }
  </tbody>
</table>

      </div>
      </div>
    </div>
  )
}
else{
  return <Redirect to="/unauthorized"/>
}
}

