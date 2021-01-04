import React ,{useContext, useEffect, useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import  UserContext from '../context/UserContext'
//  import  '../node_modules/bootstrap/dist/css/bootstrap.min.css'
//  import  '../node_modules/bootstrap/dist/js/bootstrap.bundle'

export default function NavComp(props) {
  const history=useHistory()
  const role=localStorage.getItem('role')
    let {userData,setUser}=useContext(UserContext);
  //  console.log("navcomp",userData)
    const [token,setToken]=useState(localStorage.getItem('token'))
    if(userData.user.users){
    var name=userData.user.users[0].name
    // console.log("data from props",data)
    }
    // console.log("data is",userData)
    useEffect(()=>{
    },[])
    
    const handleLogout=()=>{
      
      localStorage.clear()
      // setUser({
      //   token:"",
      //   user:""
      // })
      // console.log("user",userData.user)
      localStorage.setItem('token',"")
      history.push('/login')

    }
    // if(userData.user){
    // var getUser=userData.user.users[0].role
    // }
    // setUser({userData,setUser})
    return (
        <div >
           
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand text-warning" to="#">STOCK MANAGEMENT SYSTEM</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className ="collapse navbar-collapse" id="navbarText">
  <ul className ="navbar-nav mr-auto">
      <li className ="nav-item active">
        <Link className ="nav-link" to="/">Home </Link>
      </li>
      <li className ="nav-item active">
        <Link className ="nav-link" to="/about">About </Link>
      </li>
      {
       role==='admin' ? 
        (<><li className ="nav-item active">
        <Link className ="nav-link" to="/all-investors-details">Investors Details</Link>
      </li>
      <li className ="nav-item active">
       <Link className ="nav-link" to="/managers">Managers </Link>
     </li>
     <li className ="nav-item active">
       <Link className ="nav-link" to="/investors">Investors </Link>
     </li>
     <li className ="nav-item active">
       <Link className ="nav-link" to="/setstocklimit">SetLimit </Link>
     </li>
     <li className ="nav-item active">
       <Link className ="nav-link" to="/profile">Profile </Link>
     </li>
     </>):role==='investor' ? (<>
     <li className ="nav-item active">
        <Link className ="nav-link" to="/stocks">ShowStock </Link>
      </li>
      <li className ="nav-item active">
        <Link className ="nav-link" to="/portfolio">Portfolio </Link>
      </li><li className ="nav-item active">
       <Link className ="nav-link" to="/profile">Profile </Link>
     </li></>):role==='manager' ? (<><li className ="nav-item active">
        <Link className ="nav-link" to="/all-stocks">All Stocks </Link>
      </li>
      <li className ="nav-item active">
       <Link className ="nav-link" to="/profile">Profile</Link>
     </li></>):(<></>)
} 
     </ul>
    <span className="navbar-text">
     <ul className="navbar-nav mr-auto">
   

   {
     !token? (<><li className="nav-item active">
    
     <Link className="btn btn-outline-warning mr-2" to="/login" >Login</Link>
  
      
      </li>
      <li className="nav-item active">
          
        <Link className="btn btn-outline-warning" to="/register">Register</Link>
      </li></>):(<><li className="text-warning mr-4 mt-2">Welcome {name}</li>
      <li className="nav-item active">
          
          <button className="btn btn-outline-warning"  onClick={handleLogout} >Logout</button>

           </li></>)
   }

     </ul>
    </span>
  </div>
</nav>

        </div>
    )
}
