import ReactDOM from 'react-dom'
import React,{Component} from 'react'
import { Link,Redirect } from 'react-router-dom'
import NavComp from './NavComp'
import Axios from 'axios'
const emailRegex=RegExp(	/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
const passRegex=RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
//this fn is for checking that the formerrore elements is ahving any value or not 
const formValid=fromerrors=>{
    let valid=true;
    //if val.length >0 then the valid=false will execute
    Object.values(fromerrors).forEach(val =>{ val.length>0 && (valid=false)})
    return valid;
}

export default class  Login extends Component {

  constructor(props){
    super(props)
    this.state={
        show:true,
        role:"",
        email:"",
        password:"",
        formerrors:{
           email:"",
            password:"",
           }
          }
        //   console.log("browserrouter",this.props.value)
        // const {setUser}=this.props.value
        //   console.log(setUser)
}

componentDidMount(){
  this.roleBasedRender()
}
handleSubmit = e =>{
  e.preventDefault();
  if(formValid(this.state.formerrors)){
    const email=this.state.email
    const password=this.state.password
    const data ={email,password}
    // console.log(data)
   
       Axios.post("http://localhost:8000/user/login",data)
       .then(res=>{
          //  console.log(res.data)
           if(res.data.message==='Email not found. Please Register'){
            const element =(<div class="alert alert-danger" role="alert">
            {`Oops!!! ${res.data.message}`}
          </div>)
            ReactDOM.render(element, document.getElementById('alert'));
            
           }
           else if(res.data.message==='Invalid credentials'){
            const element =(<div class="alert alert-danger" role="alert">
            The password you have given, is not correct!!!Please check the password
          </div>)
            ReactDOM.render(element, document.getElementById('alert'));
           }
           else{
            const element =(<div class="alert alert-success" role="alert">
            successfully loged in!!wait for 3 seconds@@@
          </div>)
            ReactDOM.render(element, document.getElementById('alert'));
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('role',res.data.role)
            localStorage.setItem('name',res.data.name)
            localStorage.setItem('user_id',res.data.user_id)
            this.setState({role:res.data.role})
            // console.log(this.state.role)
            // this.setUser({token:localStorage.getItem('token'),user:""})
           
             setTimeout(()=>{
              this.roleBasedRender()
            //  this.setState({show:false})
          },1000)
           }
       }).catch((err)=>{
           console.log('error occured here is',err)
       })
  }
  else{
      console.log("error")
  }
}
  
  handleChange=e=>{
    //preventdefaultis used to prevent the default behaviour of any event 
      e.preventDefault();
      //targetting the fieldsof form and assigning the name and value of the field where we are targetting 
      const {name,value}=e.target;
      let formerrors=this.state.formerrors;
      switch(name){
          
          case "email":
            //setting the errors values  in formerrors elements 
                  formerrors.email=
                  emailRegex.test(value) &&value.length>0? "":"invalid email address!";
                  break;
          case "password":
                  formerrors.password=
                  passRegex.test(value)  ? "":"invalid password!";
                  break;
         
          default:
              break;
                                          
      } 
      this.setState({
        [e.target.name]:e.target.value
      })
  this.setState({formerrors,[name]:value},()=>console.log(formerrors))
  }

      roleBasedRender=()=>{
        if(localStorage.getItem('role')==='admin'){
         this.props.history.push('/managers')
          }
          else if(localStorage.getItem('role')==='investor'){
            this.props.history.push('/stocks')
          }
          else if(localStorage.getItem('role')==='manager'){
            this.props.history.push('/all-stocks')
          }
      }
      render(){
      const {formerrors}=this.state;//destructuring the formerrors to use later easily
      //if the state of show will true then this will be rendered else redirect to login page 
      // if(this.state.show){
    return (
        <>
      <NavComp/>
      <div id="bg-login">
        <div className="text-center ">
              <div id="alert"></div></div>
       <div className="container-fluid bg"  id="bg">
 <div className="row ">
  <div className="col-md-4 col-sm-4 col-xs-12"></div>  
   <div className="col-md-4 col-sm-4 col-xs-12">
    
   <form className="form-container" onSubmit={this.handleSubmit} >
       <h1 className="text-center1">Login</h1>
  <div className="form-group">
    <label className="float-left" for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name="email" id="exampleInputEmail1" onChange={this.handleChange} aria-describedby="emailHelp" required/>
    {formerrors.email.length>0 && 
    <span className="errorMessage">{formerrors.email}</span>}
  </div>
  <div className="form-group">
    <label className="float-left" for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" name="password" onChange={this.handleChange} id="exampleInputPassword1"/>
    {formerrors.password.length>0 && 
    <span className="errorMessage">{formerrors.password}</span>}
  </div>
 
  <div className="form-group form-check" >
    <input type="checkbox" className="form-check-input" name="checkbox" onClick={this.handleCheck}  id="exampleCheck1"/>
    
    <label className="form-check-label " for="exampleCheck1">check me out</label>
    <p id="errormessage" className="errorMessage"></p>
   
  </div>
  <button type="submit" className="btn btn-success btn-block" >Submit</button>
  <Link className="nav-link"  to="/register">Sign Up</Link>
</form>    
    </div>
    </div>
        </div>
        </div>
        </>
    )}
    //onsubmit it will change the state of show to false ND REDIRECT to stocks page
    // else if(this.state.show==false){
        
    //   if(this.state.role==='admin'){
    //   return <Redirect to="/all-investors-details"/>
    //   }
    //   else if(this.state.role==='investor'){
    //     return <Redirect to="/stocks"/>
    //   }
    //   else if(this.state.role==='manager'){
    //     return <Redirect to='/all-stocks'/>
    //   }
    // }
// }
}