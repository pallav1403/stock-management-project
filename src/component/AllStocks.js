import React, { Component } from 'react'
import NavComp from './NavComp'
import SideBar from './SideBar'
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
        console.log('pallav')
        axios.get("http://localhost:8000/stocks").then(res=>{
            console.log("data is:",res.data.stocks[0].stockcode)
              this.setState({stocks:res.data.stocks})
              console.log("hi");
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
       
      if(role!='manager'){
        this.props.history.push('/unauthorized')
      }
    }
   }
  deleteStock=(stockcode)=>{
    console.log(stockcode)
        axios.delete(`http://localhost:8000/stocks/${stockcode}`).then((res)=>{
                   console.log("deleted",res)
                  this.componentDidMount()
        }).catch((err)=>{
          console.log("error:",err)
        })

       }
 
  render(){
    return (
        <div>
          <NavComp/>
            
      <div className="container main bg-white border shadow mt-3">
  <Link className="btn btn-primary float-left mt-3 mb-3" to="/add-stocks">Add Stock</Link>
 <table className="table">
<thead>                                                              
<tr>
  <th scope="col">Stock Code</th>
  <th scope="col">Stock Name</th>
  <th scope="col">Stock Price</th>
  <th scope="col">Stock Limit</th>
  <th scope="col">DELETE</th>
  <th scope="col">UPDATE</th>
</tr>
</thead>
<tbody>


{this.state.stocks.map(stock=>{
           return (
            <tr>
           <td>{stock.stockcode}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.stocklimit}</td>
            <td>
              <form className="form-group" onSubmit={this.handleDelete} method="get">
                <Link type="submit" class="btn btn-danger " onClick={()=>{this.deleteStock(stock.stockcode)}}> DELETE </Link>
              </form>
            </td>                                                      
            <td>
           
              <Link className="btn btn-warning"   to={`/edit-stocks/${stock.stockcode}`}>Update</Link>
            </td>
           
          </tr>
             )
          }
          )
          }
 
</tbody>
</table>
</div>
   </div>
    )}
}
                                               