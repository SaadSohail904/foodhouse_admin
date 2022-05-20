import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Navi from './Navi';
// import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Footer from './Footer';
export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      token:localStorage.getItem('usertoken'),
      restaurantsdata:[],
      menuData:[],
      usersdata:[],
      search:'',
      selectededitrestaurant:'',
      classnamesidebar:'navbar-nav sidebar sidebar-light accordion',
      alerttext:'',
      alertshow:false,
      alertshowsuccess:false,
      totalpages:0,
      start:0,
      userIdEditable:0,
      // restaurant variable
      nameEditable:'',
      ownerEditable:'',
      addressEditable:'',
      passwordEditable: '',
      mobilenoEditable: '',
      name:'',
      email:'',
      password:'',
      confirmpassword:'',
      mobileno:'',
      gender:'',
      // restaurant variable
      activeIndex: 0,
    };
    console.log(this.state)
    if(this.state.token){
      this.getRestaurants()
    }
    else{
      localStorage.clear();
      this.props.history.push('/login');
    }
    
  }
  gendercheck=(gender)=>{
    if(gender===1){
      return 'Female'
    }
    else{
      return 'Male'
    }
  }
  togglesidebar=()=>{
    if(this.state.classnamesidebar==='navbar-nav sidebar sidebar-light accordion')
    {
      this.setState({classnamesidebar:'navbar-nav sidebar sidebar-light accordion toggled'})
    }
    else{
      this.setState({classnamesidebar:'navbar-nav sidebar sidebar-light accordion'})
    }
  }
editrestaurant=()=>{
  var body={
    "user_id":this.state.userIdEditable,
    "name": this.state.nameEditable,
    "owner": this.state.ownerEditable,
    "address": this.state.addressEditable,
    "mobileno": this.state.mobilenoEditable,
    "password": this.state.passwordEditable
  }
  axios.post(global.url+'/updateRestaurantAdmin', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
        this.getRestaurants()
        this.hideAlert()
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert()
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert()
  })
}

hideAlert(){
  setTimeout(()=>{
    this.setState({alertshow:false,alertshowsuccess:false});
  }, 3000)
}
getRestaurants(){
  axios.get(global.url+'/getRestaurantsAndCategories' ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
    if(res.data.statusCode=== 200){
      console.log(res?.data?.data?.restaurants)
      for(let tempRestaurant of res?.data?.data?.restaurants){
        if(tempRestaurant.image){
          tempRestaurant.image = global.url + tempRestaurant.image
        } else{
          tempRestaurant.image = '/img/user-profile.png'
        }
      }
      this.setState({restaurantsdata: res?.data?.data?.restaurants})
      this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
      this.hideAlert()
    }
    else{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
      this.hideAlert()
    }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert()
  })
}

approvePayment=(id)=>{
  var body={
    "user_id":id
  }
  axios.post(global.url+'/approvePayment', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
        this.getRestaurants()
        this.hideAlert()
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert()
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert()
  })
}

approveRestaurant=(id)=>{
  var body={
    "user_id":id
  }
  axios.post(global.url+'/approveRestaurant', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
        this.getRestaurants()
        this.hideAlert()
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert()
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert()
  })
}

deleteUser=(id)=>{
  var body={
    "user_id":id
  }
  axios.post(global.url+'/deleteUser', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
        this.getRestaurants()
        this.hideAlert()
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert()
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert()
  })
}
addrestaurant=()=>{
  var body={
    "name":this.state.name,
    "owner":this.state.owner,
    "mobileno":this.state.mobileno,
    "email":this.state.email,
    "address": this.state.address,
    "password":this.state.password
  }
  if(this.state.name!=='' && this.state.mobileno!=='' && this.state.owner!=='' && this.state.address!=='' && this.state.email!==''
  && this.state.password!==''){
    axios.post(global.url+'/restaurantSignup', body ,{headers:{
      "Authorization": this.state.token,
      "Content-Type":"application/json"
    }}).then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
          this.getRestaurants()
          this.hideAlert()
        }
        else{
          this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
          this.hideAlert()
        }
    }).catch(error=>{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
      this.hideAlert()
    })
  }
  
}
getRestaurantMenu=(restaurant_id)=>{
  axios.get(global.url+'/getRestaurantMenu?restaurant_id='+restaurant_id, {headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }}).then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        for(let tempItem of res?.data?.data){
          if(tempItem.image){
            tempItem.image = global.url + tempItem.image
          } else{
            tempItem.image = '/img/default_cook.png'
          }
        }
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
        this.setState({menuData: res?.data?.data})
        console.log(this.state.menuData)
        this.hideAlert()
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert()
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert()
  })
  
}




// Workout Services
// Workout Services
handleClick(index, props) {
  this.setState({ activeIndex: index });
}



    render() {
        return (
            <div id="wrapper">
            <Sidebar classnamesidebar={this.state.classnamesidebar} itemclass={['nav-item','nav-item ','nav-item active','nav-item ']}/>
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
              {/* nav bar start  */}
              {/* nav bar start  */}
              <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                <button id="sidebarToggleTop" onClick={()=>{this.togglesidebar()}} style={{borderWidth:0,borderRadius:0,backgroundColor:'white'}} 
                className="btn-input btn-link rounded-circle mr-3">
                <i className="fa fa-bars" style={{color:'black'}}></i>
                </button>
                <Navi/>
              </nav>
              {/* nav bar end  */}
              {/* nav bar end  */}
                <div className="container-fluid" id="container-wrapper">
                  <div className="d-sm-flex align-items-center mb-2">
                    <h1 className="h3 mb-0 text-gray-800 col-md-10 check-in-heading mb-3 responsive" style={{paddingRight: 0,}}>
                     Restaurants
                    </h1>
                    <div className="col-md-2 mb-3 responsive" style={{marginLeft:10}}>
                        <button data-toggle="modal" data-target="#myModal" className="btn btn-rounded button-style "
                            style={{width:'100%',height:40,border:0}}>Add Restaurant</button>
                    </div>
                  </div>
                </div>
                <div className='scrollviewcontent'>
                {this.state.restaurantsdata.map((item,index) => {
                  return(
                <div className="row ml-4 mr-4 mb-4 table-content" key={index}>
                  <div className="col-md-12 table-img" style={{textTransform:'capitalize'}}>
                    <img alt="profile" className="img-profile rounded-circle mr-2 ml-3" src= {item?.image}
                      style={{objectFit:'cover',float:'left'}} />
                   <div className="text-truncate col-md-5 pt-2 pl-0" style={{float:'left',cursor:'pointer'}} title={item.name}>{item.name}</div>
                  </div>
        
                  <div className="table table-scroll">
                    <table className="table table-bordered mb-4" style={{backgroundColor:'#f8f8f8'}}>
                      <thead>
                        <tr style={{textAlign:'center',color:'black'}}>
                          {/* <th className=" text-truncate" style={{fontWeight:'500'}}>Wave</th> */}
                          <th className=" text-truncate col-2" style={{fontWeight:'500'}}>Email</th>
                          <th className=" text-truncate col-2" style={{fontWeight:'500'}}>Owner</th>
                          <th className=" text-truncate col-2" style={{fontWeight:'500'}}>Address</th>
                          <th className=" text-truncate col-2" style={{fontWeight:'500'}}>Phone number</th>
                          <th className="text-truncate col-2" style={{fontWeight: '500',textAlign: 'center'}}>Status</th>
                          <th className="text-truncate col-2" style={{fontWeight: '500',textAlign: 'center'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-width" style={{textAlign:'center',color:'black',fontWeight: '400',}}>
                          {/* <td className="text-truncate">{item.waveName}</td> */}
                          <td className="text-truncate col-2">{item.email}</td>
                          <td className="text-truncate col-2">{item.owner}</td>
                          <td className="text-truncate col-2">{item.address}</td>
                          <td className="text-truncate col-2">{item.mobileno}</td>
                          {(item.verified && item.payment_completed) ? <td className="text-truncate col-2">Approved</td> :
                          (!item.verified) ? <td className="text-truncate col-2">Pending Approval</td> : 
                          <td className="text-truncate col-2">Payment Pending</td> }
                          <td className="pt-2 text-truncate col-2">
                                <span>
                                <i data-toggle="modal" data-target="#editModal" title="Edit" onClick={()=>{this.setState({userIdEditable:item.user_id, nameEditable:item.name||'', addressEditable:item.address||'', ownerEditable:item.owner||'', passwordEditable: item.password||'', mobilenoEditable: item.mobileno||''})}}  className="fas fa-pen  wave-icon border-color"></i>
                                <i data-toggle="modal" data-target="#menuModal" title="View Menu" onClick={()=>{this.getRestaurantMenu(item.restaurant_id)}}  className="fas fa-eye wave-icon border-color"></i>
                                <i  className="far fa-trash-alt  wave-icon border-color" title="Delete" onClick={()=>{this.deleteUser(item.user_id)}}></i>
                                {!item.verified && !item.payment_completed ? <i  className="fa fa-check  wave-icon border-color" title="Approve" onClick={()=>{this.approveRestaurant(item.user_id)}}></i> : null}
                                {item.verified && !item.payment_completed ? <i  className="fa fa-credit-card  wave-icon border-color" title="Approve Payment" onClick={()=>{this.approvePayment(item.user_id)}}></i> : null}
                                </span>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                  )         
                })}
              </div>
              {/* <ReactPaginate
                previousLabel={'PRE'}
                nextLabel={'NEXT'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.totalpages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(data)=>{
                  console.log(data);
                }}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              /> */}
              </div>
        
            <div className="modal fade" id="editModal" role="dialog">
                          <div className="modal-dialog modal_login">
                          <form onSubmit={e => { e.preventDefault(); }} autoComplete="off">
                        <div className="modal-content">
                          <div className="modal-header modal-border">
                            <h4 className="modal-title modal-heading edit-Heading">Edit Restaurant</h4>
                            <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                          </div>
                          <div className="modal-body madal-padd">

                        <div className="row">
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-restaurant">Name</label>   
                            <input type="text" onChange={e => {this.setState({nameEditable:e.target.value})}} className="form-control field-text p-0" name="name" value={this.state.nameEditable}
                                  required="required"/>
                          </div>
                          <div className="form-group col-md-6"> 
                            <label className="edit-modal-restaurant">Address</label>     
                            <input type="text" onChange={e => {this.setState({addressEditable:e.target.value})}} className="form-control field-text p-0" name="name" value={this.state.addressEditable}
                              required="required"/>
                          </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-6">   
                            <label className="edit-modal-restaurant">Owner</label> 
                            <input type="text" onChange={e => {this.setState({ownerEditable:e.target.value})}} className="form-control field-text p-0" name="name" value={this.state.ownerEditable}
                              required="required"/>
                          </div>
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-restaurant">Contact no</label> 
                            <input type="text" onChange={e => {this.setState({mobilenoEditable:e.target.value})}} className="form-control field-text p-0" name="name" value={this.state.mobilenoEditable}
                              required="required"/>
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-restaurant">Password</label>
                            <input type="password" onChange={e => {this.setState({passwordEditable:e.target.value})}} className="form-control field-text p-0" name="name" placeholder="*********" value={this.state.passwordEditable}
                              required="required"/>
                          </div>
                          
                        </div>
                        
                          </div>
                          <div className="modal-footer" style={{textAlign:'center',display:'block'}}>
                            <div >
                              <button style={{border:0}} className="btn btn-sm button-style" onClick={()=>{this.editrestaurant(this.state.selectededitrestaurant)}}>Save</button>
                            </div>
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
          {/* <!-- Modal HTML Close--> */}
          
          {/* <!-- Modal HTML--> */}
          <div className="modal fade" id="menuModal" role="dialog">
                          <div className="modal-dialog modal_login menu-modal">
                          <form onSubmit={e => { e.preventDefault(); }} autoComplete="off">
                        <div className="modal-content">
                          <div className="modal-header modal-border">
                            <h4 className="modal-title modal-heading edit-Heading">Restaurant Menu</h4>
                            <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                          </div>
                          <div className="modal-body madal-padd">
                          <div className='scrollviewcontent'>
                {this.state.menuData.map((item,index) => {
                  return(
                <div className="row ml-4 mr-4 mb-4 table-content" key={index}>
                  <div className="col-md-12 table-img" style={{textTransform:'capitalize'}}>
                    <img alt="profile" className="img-profile rounded-circle mr-2 ml-3" src= {item?.image}
                      style={{objectFit:'cover',float:'left'}} />
                   <div className="text-truncate col-md-5 pt-2 pl-0" style={{float:'left',cursor:'pointer'}} title={item.name}>{item.name}</div>
                  </div>
        
                  <div className="table table-scroll">
                    <table className="table table-bordered mb-4" style={{backgroundColor:'#f8f8f8'}}>
                      <thead>
                        <tr style={{textAlign:'center',color:'black'}}>
                          {/* <th className=" text-truncate" style={{fontWeight:'500'}}>Wave</th> */}
                          <th className=" text-truncate col-4" style={{fontWeight:'500'}}>Name</th>
                          <th className=" text-truncate col-4" style={{fontWeight:'500'}}>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-width" style={{textAlign:'center',color:'black',fontWeight: '400',}}>
                          {/* <td className="text-truncate">{item.waveName}</td> */}
                          <td className="text-truncate col-4">{item.name}</td>
                          <td className="text-truncate col-4">PKR {item.price}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                  )         
                })}
              </div>
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
          {/* <!-- Modal HTML Close--> */}
          {/* <!-- Modal HTML--> */}
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog modal_login">
                {/* <!-- Modal content--> */}
                <form id="addrestaurant" onSubmit={e => { e.preventDefault(); }}>
                <div className="modal-content">
                  <div className="modal-header modal-border">
                    <h4 className="modal-title modal-heading">Add Restaurant</h4>
                    <button type="button" className="close fas fa-times" data-dismiss="modal" onClick={()=>{this.setState({name:'',address:'',email:'',password:'',mobileno:'',owner:''})}}></button>
                  </div>
                  <div className="modal-body madal-padd">
                      <div className="form-group" style={{width:'48%',float:'left',marginRight:10}}>
                        <div className="input-group">
                          <input type="text" className="form-control field-text" name="name" placeholder="Name *"
                            required="required" value={this.state.name} onChange={e => {this.setState({name:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group" style={{width:'48%',float:'left'}}>
                        <div className="input-group">
                          <input type="text" className="form-control field-text" name="name" placeholder="Address *"
                            required="required" value={this.state.address} onChange={e => {this.setState({address:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group" style={{width:'100%',float:'left'}}>
                        <div className="input-group">
                          <input type="email" className="form-control field-text" name="name" placeholder="Email *"
                            required="required" value={this.state.email} onChange={e => {this.setState({email:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'100%',float:'left',marginRight:10}}>
                        <div className="input-group">
                          <input type="password" className="form-control field-text" name="name" placeholder="Password *"
                            required="required" value={this.state.password} onChange={e => {this.setState({password:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'100%',float:'left'}}>
                        <div className="input-group">
                          <input type="text" className="form-control field-text" name="name" placeholder="Owner"
                            required="required" value={this.state.owner} onChange={e => {this.setState({owner:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'100%',float:'left'}}>
                        <div className="input-group">
                          <input type="text" className="form-control field-text" name="name" placeholder="Contact No"
                            required="required" value={this.state.mobileno} onChange={e => {this.setState({mobileno:e.target.value})}}/>
                        </div>
                      </div>
                  </div>
                  {/* <!-- Modal HTML Close--> */}
                  <div className="modal-footer">
                    <div className="btn-group-vertical">
                      <button className="btn button-style " 
                       onClick={()=>{ this.addrestaurant()}}>Add Restaurant</button>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          {/* <!-- Modal HTML--> */}
          {(this.state.alertshow===true) && (
            <div className="alert alert-danger alert-dismissible fade show" style={{alignSelf:'flex-end',position:'fixed',top:80,zIndex:999999}} role="alert">
              <strong>Alert! <br/> </strong> {this.state.alerttext}
              <button type="button" className="close" aria-label="Close" onClick={()=>{this.setState({alertshow:false})}}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          {(this.state.alertshowsuccess===true) && (
              <div className="alert alert-success alert-dismissible fade show" style={{alignSelf:'flex-end',position:'fixed',top:80,zIndex:999999,right:0}}>
              <strong>Alert! <br/> </strong> {this.state.alerttext}
              <button type="button" className="close" aria-label="Close" onClick={()=>{this.setState({alertshowsuccess:false})}}>
                  <span aria-hidden="true">&times;</span>
              </button>
              </div>
          )}
          <Footer/>
            </div>
        
          </div>
        )
    }
}
