import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';

import './App.css';

import './component/all.css';
import UserContext from './context/UserContext'
import Login from './component/Login';
import Home from  './component/Home';

import Register from './component/Register';


import Stocks from './component/Stocks';
import AllStocks from './component/AllStocks';
import About from './component/About';
import Portfolio from './component/Portfolio';
import AddStock from './component/AddStock';
import EditStock from './component/EditStock';
import Manager from './component/Manager';

import AddManager from './component/AddManager';
import EditManager from './component/EditManager';
import Investor from './component/Investor';
import AddInvestor from './component/AddInvestor';
import EditInvestor from './component/EditInvestor';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import NavComp from './component/NavComp';
import NotAuthorized from './component/NotAuthorized';
import Profile from './component/Profile';
import AllInvestorsStock from './component/AllInvestorsStock';
import EditProfile from './component/EditProfile';
 //Router is used to make the url in sync with Ui 


//switch component will only render the first route that matches/includes the path
function App() {
     const [userData,setUser]=useState({user:"",token:""})
     const  history=useHistory()
     useEffect(()=>{
        const isLoggedIn= async ()=>{
         const token=  localStorage.getItem('token')
         if(token===null){
            localStorage.setItem('token',"")
            token="";
         }
       const getToken=await Axios.post('http://localhost:8000/user/tokenCheck',null,{headers:{"authorization":token}})
      //  console.log(getToken)
       if(getToken.data){
         const getUser=await Axios.get('http://localhost:8000/user/getUser',{headers:{"authorization":token}})
          setUser({token,user:getUser.data})
          // console.log("userData",getUser.data)
        }
      }


      isLoggedIn();
      // checkLoggedIn()
    },[])

//    const checkLoggedIn=()=>{
// if(!userData.user.users){
//   history.push('/login')
// }
//     }


  // setToken=(token)=>{
  //     setUser({token})
  // }
  return (
    
    <div className="App">

  
   <BrowserRouter>
  
   <UserContext.Provider value={{userData,setUser}}>

   {/* <NavComp  value={{userData,setUser}}/> */}
<Switch>

  //Route is used to do component based rendering
  <Route  exact path="/login" component={Login }/>
  <Route exact path="/" component={Home}/>
  //exact only returns the route if the path is anexact  match to the current url
  <Route  exact path="/register" component={Register}/>
  <Route  exact path="/stocks"  component={Stocks}/>
  <Route  exact path="/all-stocks"  component={AllStocks } />
  <Route  exact path="/about" component={About}/>
  <Route  exact path="/portfolio" component={Portfolio}/>
  <Route  exact path="/add-stocks" component={AddStock }/>
  <Route  exact path="/edit-stocks/:stockcode" component={EditStock }/>
  <Route  exact path="/managers" component={Manager} />
  <Route  exact path="/add-managers" component={AddManager} />
  <Route  exact path="/edit-managers/:user_id" component={EditManager} />
  <Route  exact path="/investors" component={Investor} />
  <Route  exact path="/add-investors" component={AddInvestor} />
  <Route  exact path="/edit-investors/:user_id" component={EditInvestor} />
  <Route  exact path="/unauthorized" component={NotAuthorized} />
  <Route  exact path="/profile" component={Profile} />
  <Route  exact path="/edit-profile/:user_id" component={EditProfile} />
  <Route  exact path="/all-investors-details" component={AllInvestorsStock} />
</Switch>
</UserContext.Provider>
</BrowserRouter>

    </div> 
 
  );
}

export default App;
