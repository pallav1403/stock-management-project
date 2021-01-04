import {React,useState,useEffect,useContext} from 'react'
import Axios from 'axios'
import {Link,Redirect,useHistory} from 'react-router-dom';
import NavComp from './NavComp';
// import UserContext from '../context/UserContext'
export default function Stocks(props) {
  const investorid=localStorage.getItem('user_id')
  const token=localStorage.getItem('token')
  const role=localStorage.getItem('role')
  const ownername=localStorage.getItem('name')
  // let {userData,setUser}=useContext(UserContext);
  let history=useHistory();
  const [stocks,setStock]=useState([])
  //  const [show,setShow]=useState(true);
  const [quantity,setQuantity]=useState({
    quantity:""
  })
  const [getSearchData,setSearchData]=useState({getSearchData:""})
  
 
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

const handleSearch=(e)=>{
  e.preventDefault()
  setSearchData({...getSearchData,[e.target.name]:e.target.value})
}
  // if(userData.user.users){
  //   var role=userData.user.users[0].role
  //   var ownername=userData.user.users[0].name
  //   var investorid=userData.user.users[0].user_id
  // }
   const getUsers= async ()=>{
    const response=await Axios.get('http://localhost:8000/stocks')
    // console.log(response.data)
    setStock(response.data.stocks.reverse());
  }

const handleClick=(stockcode,name,price,stocklimit)=>{
       
          const buyStockData={
             investorid,
             ownername,
             stockcode,
             name,
             price,
             buydate:new Date(),
             quantity:quantity.quantity
           }
          //  console.log(buyStockData,"buystockdata")
      Axios.post('http://localhost:8000/stocks/buyStock',buyStockData).then((res)=>{
              //  console.log("response",res)
               if(res.data.error===false){
               history.push('/portfolio')}
               else if(res.data.message==='Server Error'){
                   addStocks(stockcode)
               }
               else {
                 alert(`your stock limit is ${res.data.stocklimit}`)
               }
      }).catch(err=>{
        console.log("error is:",err)
      })
  }
const addStocks=(stockcode)=>{
 
  Axios.get(`http://localhost:8000/stocks/getQuantity/${stockcode}`).then(res=>{
    // console.log("get quantity",res)
   var previousQuantity= res.data.quantity
   var buyStockData={
    quantity:quantity.quantity,
    previousQuantity
  }
  // console.log(buyStockData.previousQuantity,"buystockdata")
  Axios.put(`http://localhost:8000/stocks/updateBuy/${stockcode}`,buyStockData).then(res=>{
    // console.log(res)
    if(res.data.error===false){
    history.push('/portfolio')
    }
    else{
      alert(`your stock limit is ${res.data.stocklimit}`)
    }
  }).catch(err=>{
    console.log(err)
  })
  }).catch(err=>{
    console.log(err)
  })
  
  // Axios.put(`http://localhost:8000/stocks/addInvestorStocks/${stockcode}`,buyStockData).then(res=>{
  //   console.log("updated",res)
  //   if(res.data.stocklimit){
  //     alert(`your can sell max of ${res.data.stocklimit} stocks!!`)
  //   }
  //   history.push('/portfolio')
  // }).catch(err=>{
  //   console.log(err)
  // })
}
  // if(show){
    return (
     
       <div>
<NavComp/>
<div className="container main bg-white border shadow mt-3">
<div className="buyStock mt-3">
 <div className="searchdiv"> 
  <input class="form-control col-3 searchbox" name="getSearchData" value={getSearchData.getSearchData} type="text" placeholder="Search stock by name" aria-label="Search" onChange={(e)=>{handleSearch(e)}}/>
  </div>
</div>
<div className="stockTable">

      <table className="table" >
  <thead>
    <tr>
      <th scope="col">Stock ID</th>
      <th scope="col">Stock Name</th>
      <th scope="col">Stock Price</th>
      <th scope="col">Stock Limit</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {stocks.filter((stock)=>{
    const search=getSearchData.getSearchData
    if(search===""){
      return stock;
    }
    else if(stock.name.toLowerCase().includes(search.toLowerCase())){
      return stock;
    }
  }).map(stock=>{
           return (
        <tr key={stock.stockcode}>
            <td>{stock.stockcode}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.stocklimit}</td>
            <td>
            <span class="quantity buttons_added">
  <input type="number" name="quantity"  value={quantity.quantity} class="input-text qty text" size="4" pattern="" inputmode="" placeholder=" enter quantity" onChange={(e)=>{handleChange(e)}}/>
  
</span>
                <button type="submit" className="btn btn-success" id="btn" value="Submit"  onClick={()=>{handleClick(stock.stockcode,stock.name,stock.price)}}>Buy Stock</button>
            </td>                                                  
        </tr>
             )   
    })}
  </tbody>
</table>
</div>
</div>        
         </div>
              
    )
  // }
    // else{
    //   return <Redirect to="/portfolio"/>
    // }

}
