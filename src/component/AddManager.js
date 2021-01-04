import Axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import NavComp from './NavComp';
// import UserContext from '../context/UserContext'
export default function AddManager() {
  const token=localStorage.getItem('token')
  const role=localStorage.getItem('role')
    let history=useHistory();
    // let {userData,setUser}=useContext(UserContext);
const [users,setUserData]=useState(
    {
        name:"",
        email:"",
        password:"",
        phone:""
    }
)

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
useEffect(() => {
 isLoggedIn()
}, [])

const {name,email,password,phone}=users;
const handleChange=(e)=>{
  e.preventDefault()
     setUserData({...users,[e.target.name]:e.target.value})
}



const handleSubmit= async e=>{
    e.preventDefault();
   const data={
      name:users.name,
      email:users.email,
      password:users.password,
      phone:users.phone
    }
    // console.log("users",users)
  Axios.post('http://localhost:8000/manager',data).then(res=>{
    // console.log("managepostres",res)
    history.push('/managers')
  }).catch(err=>{
    // console.log("error",err)
  })

}

    return (
        <div>
                     <NavComp/>
<div>
     <div className="card bg-light mb-3 mt-5 border shadow" id="addStockForm">
  <div className="card-header bg-success text-light"><solid>Add The Manager</solid></div>
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

  
  
  <div class="form-group row">
    <div class="col-sm-10">
    <Link  className="btn btn-dark border shadow float-right " to="/managers">back</Link>
      <input type="submit" class="btn btn-primary  float-right mr-2" />
     
    </div>
  </div>
</form>
  </div>
     </div>
     </div>
        </div>
    )
}
