import React, { Component } from 'react'
import axios from 'axios';
import {Link, Redirect,History} from 'react-router-dom'
import './home.css'
import NavComp from './NavComp';
export default class AddStock extends Component {
    constructor(props){
        super(props)
        
        this.state={
            show:true,
              stockcode:"",
              name:"",
              price:"" ,
              stocklimit:""
        }
     
    } 
       
    componentDidMount(){
      this.isLoggedIn()
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
  

        dataChange(e){
          this.setState({
            [e.target.name]:e.target.value
          })
       }


     handleSubmit=(e)=>{
         e.preventDefault()

         const name=this.state.name
         const price=this.state.price
         const stockcode=this.state.stockcode
         const stocklimit=this.state.stocklimit
         const data ={name,price,stockcode,stocklimit}
                           
            // console.log(data)
            axios.post("http://localhost:8000/stocks",data)
            .then(res=>{
                // console.log(res)
                // alert('succesfully inserted')
                this.props.history.push('/all-stocks')
                // this.setState({show:false})
            }).catch((err)=>{
                console.log('error occured here is',err)
            })
               
        }
 
   
    render() {
        
        return (
            <div>
           <NavComp/>
<div>
     <div className="card bg-light mb-3 mt-5 border shadow" id="addStockForm">
  <div className="card-header bg-success text-light"><solid>Add The Stock</solid></div>
  <div className="card-body">
  <form  onSubmit={this.handleSubmit.bind(this)} >
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-8">
      <input type="text" name="name" value={this.state.name} class="form-control" id="stockNamme" onChange={this.dataChange.bind(this)} required/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Price</label>
    <div class="col-sm-8">
      <input type="text" name="price" value={this.state.price} class="form-control" id="stockPrice" onChange={this.dataChange.bind(this)}  required/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Code</label>
    <div class="col-sm-8">
      <input type="text" name="stockcode" value={this.state.stockcode} class="form-control" id="stockcode" onChange={this.dataChange.bind(this)} required/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Stock Limit</label>
    <div class="col-sm-8">
      <input type="text" name="stocklimit" value={this.state.stocklimit} class="form-control" id="stockcode" onChange={this.dataChange.bind(this)} required/>
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-10">
    <Link  className="btn btn-dark border shadow float-right " to="/all-stocks">back</Link>
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
}
