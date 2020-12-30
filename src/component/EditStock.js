import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
// import {Link,Params,History, Redirect} from 'react-router-dom'
import NavComp from './NavComp';
export default class EditStock extends Component {
    constructor(props){
        super(props)
        this.state={
            stock:{
              stockcode:"",
              name:"",
              price:"",
              stocklimit:""
                 },
            show:true,  
        }
      }
        componentDidMount(){
          this.isLoggedIn()
           const stockcode=this.props.match.params.stockcode
          // console.log(stockcode);
          axios.get(`http://localhost:8000/stocks/${stockcode}`).then(res=>{
              console.log("data is:",res.data.stocks[0])
                this.setState({stock:res.data.stocks[0]})
                // console.log(this.state.stock);
          }).catch((err)=>{
              console.log('error occured here is: ',err)
          })
      }
       isLoggedIn=()=>{
        const token=  localStorage.getItem('token')
        const role=  localStorage.getItem('role')
        if(!localStorage.getItem('token')){
          this.props.history.push('/login');
        }
        else if(token){
       
          if(role!='manager'){
            this.props.history.push('/unauthorized')
          }
        }
      }
        dataChange=(e)=>{
          this.setState({
         stock:{...this.state.stock, [e.target.name]:e.target.value}
          })
       }
     postData=(e)=>{
        e.preventDefault()
        const stockcode=this.props.match.params.stockcode
        // console.log("this is",stockcode)
           axios.put(`http://localhost:8000/stocks/${stockcode}`,this.state.stock)
           .then(res=>{
              //  console.log("res is:",res)
                this.props.history.push('/all-stocks')
                // this.setState({show:false})
           }).catch((err)=>{
               console.log('error occured  is',err)
           })
               // this.setState({show:false})
       }
    render() {
      // if(this.state.show){
        return (
            <div>
           <NavComp/>

     <div className="card bg-light mb-3 mt-3" id="addStockForm">
  <div className="card-header bg-warning">Add Stock</div>
  <div className="card-body">
  <form  onSubmit={this.postData}>
  <div className="form-group row">
    <label for="inputEmail3" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-8">
      <input type="text" name="name" value={this.state.stock.name} className="form-control" id="stockNamme" onChange={this.dataChange}/>
    </div>
  </div>
  <div className="form-group row">
    <label for="inputPassword3" className="col-sm-2 col-form-label">Price</label>
    <div className="col-sm-8">
      <input type="text" name="price" value={this.state.stock.price} className="form-control" id="stockPrice" onChange={this.dataChange}/>
    </div>
  </div>
  <div className="form-group row">
    <label for="inputPassword3" className="col-sm-2 col-form-label">Code</label>
    <div className="col-sm-8">
      <input type="text" name="stockcode" value={this.state.stock.stockcode} className="form-control" id="stockcode" onChange={this.dataChange}/>
    </div>
  </div>
  <div className="form-group row">
    <label for="inputPassword3" className="col-sm-2 col-form-label">Limit</label>
    <div className="col-sm-8">
      <input type="text" name="stocklimit" value={this.state.stock.stocklimit} className="form-control" id="stockcode" onChange={this.dataChange}/>
    </div>
  </div>
  <div className="form-group row">
    <div className="col-sm-10">
    <Link  className="btn btn-dark border shadow float-right " to="/all-stocks">back</Link>
      <input type="submit" className="btn btn-warning border shadow  float-right mr-2" />
    </div>
  </div>
</form>
  </div>
     </div>
            </div>
        
    )
    
        
    }
}
