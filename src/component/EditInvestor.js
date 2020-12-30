import Axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import NavComp from './NavComp';
export default function EditInvestor() {
  const token=  localStorage.getItem('token')
  const role=  localStorage.getItem('role')
    let history=useHistory();
    const {user_id}=useParams();
const [users,setUser]=useState(
    {
        name:"",
        email:"",
        password:"",
        phone:""
    }
)

useEffect(() => {
  isLoggedIn()
  getUsers()
}, [])

const isLoggedIn=()=>{
  if(!localStorage.getItem('token')){
    history.push('/login');
  }
  else if(token){
    if(role!='admin'){
      history.push('/unauthorized')
    }
  }
}
  
const {name,email,password,phone}=users;
const handleChange=(e)=>{
     setUser({...users,[e.target.name]:e.target.value})
}

const handleSubmit= async e=>{
    e.preventDefault();
    await Axios.put(`http://localhost:8000/investor/${user_id}`,users)
    history.push('/investors')
}

  const getUsers= async ()=>{
    const response=await Axios.get(`http://localhost:8000/investor/${user_id}`)
    // console.log(response.data)
    setUser(response.data.users[0]);
  }

    return (
        <div>
            <NavComp/>          
<div>
     <div className="card bg-light mb-3 mt-5 border shadow" id="addStockForm">
  <div className="card-header bg-success text-light"><solid>Update The Investors</solid></div>
  <div className="card-body">
  <form  onSubmit={(e)=>{handleSubmit(e)}} >
  <div className="form-group row">
    <label for="inputEmail3" className="col-sm-3 col-form-label">Name</label>
    <div className="col-sm-7">
      <input type="text" name="name" value={name} className="form-control" id="userName" onChange={(e)=>{handleChange(e)}} required/>
    </div>
  </div>
  <div className="form-group row">
    <label for="inputPassword3" className="col-sm-3 col-form-label">Email</label>
    <div className="col-sm-7">
      <input type="email" name="email" value={email} className="form-control" id="userEmail" onChange={(e)=>{handleChange(e)}}  required/>
    </div>
  </div>
  <div className="form-group row">
    <label for="inputPassword3" className="col-sm-3 col-form-label">Password</label>
    <div className="col-sm-7">
      <input type="password" name="password" value={password} className="form-control" id="userPassword" onChange={(e)=>{handleChange(e)}} required/>
    </div>
  </div>

  <div className="form-group row">
    <label for="inputPassword3" className="col-sm-3 col-form-label">Phone</label>
    <div className="col-sm-7">
      <input type="text" name="phone" value={phone} className="form-control" id="userPhone" onChange={(e)=>{handleChange(e)}} required/>
    </div>
  </div>

  
  
  <div className="form-group row">
    <div className="col-sm-10">
    <Link  className="btn btn-dark border shadow float-right " to="/investors">back</Link>
      <input type="submit" className="btn btn-warning border shadow  float-right mr-2" />
     
    </div>
  </div>
</form>
  </div>
     </div>
     </div>
        </div>
    )
}
