import Axios from 'axios'
import React from 'react'
import { Link ,Redirect} from 'react-router-dom'
import NavComp from './NavComp'
import ReactDOM from 'react-dom'
//  import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//regular expression for email ,password ,and phone 
const emailRegex=RegExp(	/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
const passRegex=RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
const phoneRegex=RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)
//it validates that in formerrore element any value is there or not 
const formValid=fromerrors=>{
    let valid=true;
    Object.values(fromerrors).forEach(val =>{ val.length>0 && (valid=false)})
    return valid;
}
export default class Register extends React.Component {
    constructor(props){
        super(props)
        //setting the state values inside the constructor
        this.state={
            show:true,
            name:"",
            email:"",
            password:"",
            phone:"",
            formerrors:{
                firstName:"",
                email:"",
                password:"",
                phone:""
            }

        }
    }
     

    //setstate is used after constructor otherwise it wont works
   
 
    handleSubmit = e =>{
        e.preventDefault();
        if(formValid(this.state.formerrors)){
          const name=this.state.name
          const email=this.state.email
          const password=this.state.password
          const phone=this.state.phone
          const data ={name,email,password,phone}
          // console.log(data)
        
             Axios.post("http://localhost:8000/user/register",data)
             .then(res=>{
                //  console.log(res.data.message)
                 if(res.data.message==='Email already exists'){
                  const element =(<div class="alert alert-danger" role="alert">
                  {`Oops!!! look like something went wrong!!!${res.data.message}`}
                </div>)
                  ReactDOM.render(element, document.getElementById('alert'));
                  
                 }
                 else{
                 
                  const element =(<div class="alert alert-success" role="alert">
                  user registered successfully
                </div>)
                  ReactDOM.render(element, document.getElementById('alert'));
                   setTimeout(()=>{
                   
                     this.setState({show:false})},3000)
                   
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
    e.preventDefault();
    
    const {name,value}=e.target;//targetting the form element and assigning the name of the field element and value 
    let formerrors=this.state.formerrors;
    switch(name){
        case "firstName":
          //assigning the error value in formerrors object elements
            formerrors.firstName=
            value.length<3 ? "minimum 4 charecter is required":"";
            break;
        case "email":
                formerrors.email=
                emailRegex.test(value) &&value.length>0? "":"invalid email address!";
                break;
        case "password":
                formerrors.password=
                passRegex.test(value)  ? "":"invalid password!";
                break;
        case "phone":
            formerrors.phone=
           phoneRegex.test(value) ? "":"pnone no should be of 10 digit only!";
            break;
        default:
            break;
                                        
    }
    this.setState({
      [e.target.name]:e.target.value
    })

this.setState({formerrors,[name]:value},()=>{
// console.log(formerrors)
})
}

    render(){
        const {formerrors}=this.state;//destructuring the formerroors to use later easily
        //if the state of show will true then this will be rendered else redirect to login page 
        if(this.state.show){
    return (
        <div>
        <NavComp/>
          <div className="text-center">
              <div id="alert"></div>
           <div className="container-fluid mb-0 mt-5"  id="register">
<div className="row ">
<div className="col-10 mx-auto">
   
        <form id="form" onSubmit={this.handleSubmit} >
           <h1 className="text-center1">Register</h1>
           <div className="form-row">
             <div className="form-group col-md-6">
              
               <input  type="text" onChange={this.handleChange} name="name" className="form-control" id="fn" placeholder="first name" required />
    
    {formerrors.firstName.length>0 && 
    <span className="errorMessage">{formerrors.firstName}</span>}
             </div>
             <div className="form-group col-md-6">
            
               <input  type="text"  className="form-control" id="ln" placeholder="last name"/>
             </div>
           </div>
           <div className="form-group">
            
             <input  type="email" onChange={this.handleChange} name="email" className="form-control" id="email" placeholder="enter your email" required/>
             {formerrors.email.length>0 && 
    <span className="errorMessage">{formerrors.email}</span>}
           </div>
          
           <div className="form-group">
          
             <input type="password" onChange={this.handleChange} name="password" className="form-control" id="pwd" placeholder="password" required/>
             {formerrors.password.length>0 && 
    <span className="errorMessage">{formerrors.password}</span>}
           </div>
           <div className="form-group">
            
             <input type="number" onChange={this.handleChange} name="phone" className="form-control" id="phone" placeholder="phone" required />
             {formerrors.phone.length>0 && 
    <span className="errorMessage">{formerrors.phone}</span>}
           </div>


         <div className="form-row" required> 
              {/* <div className="form-group col-md-6">
               <label forHtml="inputCity">City</label>
               <input type="text" className="form-control" id="inputCity"/>
             </div> */}
             {/* <!-- className="form-check form-check-inline" -->
              <!-- ---------------check box----------------- --> */}
              <div  className="form-check form-check-inline"  >
               <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
               <label className="form-check-label" forHtml="inlineRadio1">Male</label>
             </div>
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
               <label className="form-check-label" forHtml="inlineRadio2">Female</label>
             </div>
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
               <label className="form-check-label" forHtml="inlineRadio3">Others</label>
             </div>


             <div   className="form-group col-md-4">
             
               <select  id="inputState" className="form-control" required>
                 <option selected disabled hidden >Choose state</option>
                 <option>Bihar</option>
                 <option>Karnataka</option>
                 <option>Delhi</option>
                 <option>Mumbai</option>
               </select>
              
             </div>
         </div>
         
         <button type="submit" id="submit" className="btn btn-dark mt-3 btn-block" >Sign in</button>
         <Link className="nav-link"  to="/login">Already Have An Account?login</Link>
         
         </form>

         </div>
         
        </div>
        
        </div>
        
        </div>

        </div>
    )}
    //redirecting to the login page.
    else if(this.state.show==false){
      return <Redirect to="/login"/>
}
}
}