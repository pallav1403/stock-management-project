import React,{useState,useEffect,useContext} from 'react'
import Axios from 'axios'

import {useHistory} from 'react-router-dom';
import NavComp from './NavComp';
// import UserContext from '../context/UserContext'
export default function Portfolio(props) {
  const user_id=localStorage.getItem('user_id')
  const token=localStorage.getItem('token')
  const role=localStorage.getItem('role')
  const history=useHistory()
  // let {userData,setUser}=useContext(UserContext);
  const [stocks,setStock]=useState([])
  const [quantity,setQuantity]=useState({
    quantity:""
  })
  useEffect(() => {
    isLoggedIn()
    getUsers()
  }, [])

  const isLoggedIn=()=>{
    if(!token){
      history.push('/login')
    }
    else if(token){
      if(role!='investor'){
        history.push('/unauthorized')
      }
    }
  }

  const handleChange=(e)=>{
    e.preventDefault()
       setQuantity({...quantity,[e.target.name]:e.target.value})
  }
  // if(userData.user.users){
  //   var role=userData.user.users[0].role
  //   var investorid=userData.user.users[0].user_id
  // }

  const getUsers= async ()=>{
   
    // console.log("investorid",investorid)
  
     Axios.get(`http://localhost:8000/stocks/getInvestorStocks/${user_id}`).then(res=>{
      // console.log("buydata",res.data)
      setStock(res.data.stocks.reverse());
     }).catch(err=>{
       console.log("error:",err)
     })
  }  
const handleClick=(stockcode,previousQuantity)=>{
  const sellStockData={
   
    quantity:quantity.quantity,
    previousQuantity
  }
  // console.log('quantity',quantity)
  alert('are you sure')
  Axios.put(`http://localhost:8000/stocks/sellStock/${stockcode}`,sellStockData).then(res=>{
    // console.log("delete",res)
    if(res.data.stocklimit){
      alert(`your can sell max of ${res.data.stocklimit} stocks!!`)
    }
    getUsers()  
  })
}
 return (
       <div>
         <NavComp/>
<div className="container main bg-white border shadow mt-3">
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
      <th scope="col">Quantity</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {stocks.map(stock=>{
           return (
        <tr key={stock.stockcode}>
            <td>{stock.ownername}</td>
            <td>{stock.stockcode}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.buydate}</td>
            <td>{stock.quantity}</td>
            <td>
            <span class="quantity buttons_added">
	
  <input type="number" name="quantity"  value={quantity.quantity} class="input-text qty text" size="4" pattern="" inputmode="" placeholder=" enter quantity" onChange={(e)=>{handleChange(e)}}/>
  
</span>
                <button type="submit" className="btn btn-danger" id="btn" value="Submit"  onClick={()=>{handleClick(stock.stockcode,stock.quantity)}}>Sell Stock</button>
            </td>                                                  
        </tr>
             )   
    })}

  </tbody>
</table>
{/* <div className="buyStock">
<form class="buyform">
<div className="stockname">
<label for="name">Stock Name:</label>
  <input type="text" name="name" className="form-field1" />
  
  <button type="submit" className="btn btn-danger" id="btn">Search Stock</button>
 
  </div>
  <div className="stockname">
  <label for="no">Stock Quantity:</label>
  <input type="number" name="no" className="form-field2"/>
  <button type="submit" className="btn btn-success" id="btn" value="Submit"  onClick={()=>{alert('one stock is added to your profile')}}>Sell Stock</button>
  </div>
</form> */}
{/* </div> */}
</div>        
      
      
      
      
         </div>
              
    )
}
