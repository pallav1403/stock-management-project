import React, { Component } from 'react'
import NavComp from './NavComp'

import {Link} from 'react-router-dom'
import axios from 'axios';
export default class AllStocks extends Component {
  constructor(props){
    super(props)
    this.state={
       stocks:[]
       
    }} 
    
    componentDidMount(){
      this.isLoggedIn()
        // console.log('pallav')
        axios.get("http://localhost:8000/stocks").then(res=>{
            // console.log("data is:",res.data.stocks[0].stockcode)
              this.setState({stocks:res.data.stocks})
              // console.log("hi");
        }).catch((err)=>{
            console.log('error occured ',err)
        })
    }
   isLoggedIn(){
    //  console.log("njdbhh",this.props.history.push)
    const token=localStorage.getItem('token')
    const role=localStorage.getItem('role')
    // console.log("bhqvd",token)
     if(!token){
      
      this.props.history.push('/login')
     }
     else if(token){
       
      if(role!='admin'){
        this.props.history.push('/unauthorized')
      }
    }
   }
  render(){
    return (
        <div>
          <NavComp/>
            
      <div className="container main bg-white border shadow mt-3">
  
 <table className="table">
<thead>                                                              
<tr>
  <th scope="col">Stock Code</th>
  <th scope="col">Stock Name</th>
  <th scope="col">Stock Price</th>
  <th scope="col">Stock Limit</th>
  <th scope="col">UPDATE</th>
</tr>
</thead>
<tbody>


{this.state.stocks.map(stock=>{
           return (
            <tr key={stock.stockcode}>
           <td>{stock.stockcode}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.stocklimit}</td>                                                     
            <td>
              <Link className="btn btn-warning"   to={`/edit-stock-limit/${stock.stockcode}`}>Update</Link>
            </td>
          </tr>
             )
          })
          }
 
</tbody>
</table>
</div>
   </div>
    )}
}
                                               