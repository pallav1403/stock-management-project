import React,{useState,useEffect,useContext} from 'react'
import Axios from 'axios'
import {Link,useHistory} from 'react-router-dom';
import NavComp from './NavComp';
import UserContext from '../context/UserContext'
export default function AllInvestorsStock() {
    let history=useHistory();
    
   const user_id=localStorage.getItem('user_id')
    let {userData,setUser}=useContext(UserContext);
    const [stocks,setStock]=useState([])
    useEffect(() => {
        isLoggedIn()
      getUsers()
    }, [])
  
    
    // if(userData.user.users){
    //   var role=userData.user.users[0].role
    //   var investorid=userData.user.users[0].user_id
    // }
    const isLoggedIn=()=>{
       const token=localStorage.getItem('token')
       const role=localStorage.getItem('role')
       if(!token){
         this.props.history.push('/login')
        }
        else if(token){
          if(role!='admin'){
            history.push('/unauthorized')
          }
        }
      }
    const getUsers= async ()=>{
      // console.log("investorid",investorid)
       Axios.get(`http://localhost:8000/stocks/allInvestors`).then(res=>{
        // console.log("alldata",res)
        setStock(res.data.stocks);
       }).catch(err=>{
         console.log("error:",err)
       })
     
    }

    const handleClick=(stockcode)=>{
        Axios.delete(`http://localhost:8000/stocks/sellStock/${stockcode}`).then(res=>{
          console.log(res)
          getUsers()
        }).catch(err=>{
          console.log(err)
        })
    }
    return (
        <div>
            <NavComp/>
            <div class="container main bg-white border shadow mt-3">
<div className="buyStock mt-3">
  <h1>
     Investor Stock List
  </h1>
</div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Owner Name</th>
      <th scope="col">Stock ID</th>
      <th scope="col">Stock Name</th>
      <th scope="col">Stock Price</th>
      <th scope="col">Buy Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {stocks.map(stock=>{
           return (
        <tr>
            <td>{stock.ownername}</td>
            <td>{stock.stockcode}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.buydate}</td>
            <td>
                <button type="submit" className="btn btn-danger" id="btn" value="Submit"  onClick={()=>{handleClick(stock.stockcode)}}>Delete</button>
            </td>                                                  
        </tr>
             )   
    })}

  </tbody>
</table>
        </div>
        </div>
    )
}
