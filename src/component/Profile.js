import React,{useEffect,useState,useContext} from 'react'
// import UserContext from '../context/UserContext'
import  Axios from'axios'
import { Link ,useHistory} from 'react-router-dom';
import NavComp from './NavComp';
export default function Profile() {
  const user_id=localStorage.getItem('user_id')
  const token=localStorage.getItem('token')
  const history=useHistory()
    // let {userData,setUser}=useContext(UserContext);
    const [users,setUserData]=useState({})
    // if(userData.user.users){
    //   var role=userData.user.users[0].role
    //   var user_id=userData.user.users[0].user_id
    // }
    useEffect(() => {
      isLoggedIn()
      getUsers()
    }, [])
  
    const isLoggedIn=()=>{
      if(!token){
        history.push('/login')
      }
    }

    const getUsers= ()=>{
        console.log(user_id)
     Axios.get(`http://localhost:8000/manager/${user_id}`).then(res=>{
        console.log("profile",res.data)
        setUserData(res.data.users[0]);
        console.log("users profile",users)
     }).catch(err=>{
         console.log("error",err)
     })
      
    }

    return (
        <div>
            <NavComp/>
            <div className="container  mt-5">
            <div class="card border shadow col-4 row-4 m-auto profilecard">
   <img src="icons\profile.png" alt="" className="profileimage"/>
   <p class="card-text">{users.role}</p>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{`Name:${users.name}`}</li>
    <li class="list-group-item">{`Email:${users.email}`}</li>
    <li class="list-group-item">{`Phone:${users.phone}`}</li>
  </ul>
  <div class=" card-footer bg-color-secondary">
    <Link to={`/edit-profile/${users.user_id}`} class="card-link">Edit Profile</Link><br/>
    <Link to="/login" class="card-link">go to login</Link>
  </div>
</div>
        </div>
        </div>
    )
}
