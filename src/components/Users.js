import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Navi from './Navi';
// import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Footer from './Footer';
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      token:localStorage.getItem('usertoken'),
      usersdata:[],
      ordersData: [],
      search:'',
      selectededituser:'',
      classnamesidebar:'navbar-nav sidebar sidebar-light accordion',
      alerttext:'',
      alertshow:false,
      alertshowsuccess:false,
      totalpages:0,
      start:0,
      userIdEditable:0,
      // user variable
      fnameEditable:'',
      lnameEditable:'',
      emailEditable:'',
      passwordEditable: '',
      mobilenoEditable: '',
      fname:'',
      lname:'',
      email:'',
      password:'',
      confirmpassword:'',
      mobileno:'',
      gender:'',
      // user variable
      activeIndex: 0,
    };
    console.log(this.state)

    if(this.state.token){
      this.getUsers()
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
edituser=()=>{
  var body={
    "user_id":this.state.userIdEditable,
    "fname": this.state.fnameEditable,
    "lname": this.state.lnameEditable,
    "email": this.state.emailEditable,
    "mobileno": this.state.mobilenoEditable,
    "password": this.state.passwordEditable
  }
  axios.post(global.url+'/updateUserAdmin', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
        this.getUsers()
        this.hideAlert();
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert();
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert();
  })
}
hideAlert(){
  setTimeout(()=>{
    this.setState({alertshow:false,alertshowsuccess:false});
  }, 3000)
}

getUsers(){
  axios.get(global.url+'/getUsers' ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
    if(res.data.statusCode=== 200){
      for(let tempUser of res.data.data){
        if(tempUser.image){
          tempUser.image = global.url + tempUser.image.replace('/public', '')
        } else{
          tempUser.image = '/img/user-profile.png'
        }
      }
      this.setState({usersdata: res.data.data})
      this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
      this.hideAlert();
    }
    else{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
      this.hideAlert();
    }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert();
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
        this.getUsers()
        this.hideAlert();
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert();
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert();
  })
}
adduser=()=>{
  console.log('====================================');
  console.log(this.state.gender);
  console.log('====================================');
  var body={
    "fname":this.state.fname,
    "lname":this.state.lname,
    "mobileno":this.state.mobileno,
    "email":this.state.email,
    "gender": this.state.gender==='1'?0:1,
    "password":this.state.password,
    "role": 2
  }
  if(this.state.fname!=='' && this.state.lname!=='' && this.state.mobileno!=='' && this.state.email!==''
  && this.state.gender!=='' && this.state.password!==''){
    axios.post(global.url+'/customerSignup', body ,{headers:{
      "Authorization": this.state.token,
      "Content-Type":"application/json"
    }}).then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
          this.getUsers()
        this.hideAlert();
      }
        else{
          this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert();
      }
    }).catch(error=>{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
      this.hideAlert();
    })
  } else{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Kindly fill all required information'});
    this.hideAlert();
  }
  
}

getUserOrders=(id)=>{
  axios.get(global.url+'/getOrdersAdmin?user_id='+id, {headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }}).then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
        this.hideAlert();
        for(let tempRestaurant of res?.data?.data){
          if(tempRestaurant.restaurant_image){
            tempRestaurant.restaurant_image = global.url + tempRestaurant.restaurant_image
          } else{
            tempRestaurant.restaurant_image = '/img/default_cook.png'
          }
        }
        this.setState({ordersData: res?.data?.data})
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        this.hideAlert();
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    this.hideAlert();
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
                     Users
                    </h1>
                    <div className="col-md-2 mb-3 responsive" style={{marginLeft:10}}>
                        <button data-toggle="modal" data-target="#myModal" className="btn btn-rounded button-style "
                            style={{width:'100%',height:40,border:0}}>Create User</button>
                    </div>
                  </div>
                </div>
                <div className='scrollviewcontent'>
                {this.state.usersdata.map((item,index) => {
                  return(
                <div className="row ml-4 mr-4 mb-4 table-content" key={index}>
                  <div className="col-md-12 table-img" style={{textTransform:'capitalize'}}>
                    <img alt="profile" className="img-profile rounded-circle mr-2 ml-3" src= {item?.image}
                      style={{objectFit:'cover',float:'left'}} />
                   <div className="text-truncate col-md-5 pt-2 pl-0" style={{float:'left',cursor:'pointer'}} title={item.fname + ' ' +  item.lname}>   {item.fname} {item.lname} </div>
                  </div>
        
                  <div className="table table-scroll">
                    <table className="table table-bordered mb-4" style={{backgroundColor:'#f8f8f8'}}>
                      <thead>
                        <tr style={{textAlign:'center',color:'black'}}>
                          {/* <th className=" text-truncate" style={{fontWeight:'500'}}>Wave</th> */}
                          <th className=" text-truncate col-3" style={{fontWeight:'500'}}>Email</th>
                          <th className=" text-truncate col-3" style={{fontWeight:'500'}}>Gender</th>
                          <th className=" text-truncate col-3" style={{fontWeight:'500'}}>Phone number</th>
                          <th className="text-truncate col-3" style={{fontWeight: '500',textAlign: 'center'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-width" style={{textAlign:'center',color:'black',fontWeight: '400',}}>
                          {/* <td className="text-truncate">{item.waveName}</td> */}
                          <td className="text-truncate col-3">{item.email}</td>
                          <td className="text-truncate col-3">{this.gendercheck(item.gender)}</td>
                          <td className="text-truncate col-3">{item.mobileno}</td>
                          <td className="pt-2 text-truncate col-3">
                                <span>
                                <i data-toggle="modal" data-target="#editModal" title="Edit" onClick={()=>{this.setState({userIdEditable:item.user_id, fnameEditable:item.fname, lnameEditable: item.lname, emailEditable: item.email, passwordEditable: item.password, mobilenoEditable: item.mobileno})}}  className="fas fa-pen  wave-icon border-color"></i>
                                <i data-toggle="modal" data-target="#menuModal" title="View Orders" onClick={()=>{this.getUserOrders(item.user_id)}}  className="fas fa-eye wave-icon border-color"></i>
                                <i  className="far fa-trash-alt  wave-icon border-color" title="Delete" onClick={()=>{this.deleteUser(item.user_id)}}></i>
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
              </div>
        
          {/* <!-- Modal HTML--> */}
            <div className="modal fade" id="addnotes" role="dialog">
              <div className="modal-dialog modal_login">
              {/* <!-- Modal content--> */}
              <div className="modal-content">
                <div className="modal-header modal-border">
                  <h4 className=" modal-title modal-heading ">Josh Notes</h4>
                  <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                </div>
                <div className="modal-footer">
                  <div >
                    <button style={{border:0}} className="btn btn-sm button-style"  data-dismiss="modal" onClick={()=>{this.addcheckinreview()}}>Add</button>
                  </div>
                </div>
              </div>
            {/* // <!-- Modal HTML Close--> */}
            </div>
          </div>
          {/* <!-- Modal HTML Close--> */}
          {/* <!-- Modal HTML--> */}
        
          {/* <!-- Modal HTML Close--> */}
          {/* <!-- Modal HTML--> */}
            <div className="modal fade" id="editModal" role="dialog">
                          <div className="modal-dialog modal_login">
                          <form onSubmit={e => { e.preventDefault(); }}>
                        <div className="modal-content">
                          <div className="modal-header modal-border">
                            <h4 className="modal-title modal-heading edit-Heading">Edit User</h4>
                            <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                          </div>
                          <div className="modal-body madal-padd">

                        <div className="row">
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-user">First Name</label>   
                            <input type="text" onChange={e => {this.setState({fnameEditable:e.target.value})}} className="form-control field-text p-0" name="name" value={this.state.fnameEditable}
                                  required="required"/>
                          </div>
                          <div className="form-group col-md-6"> 
                            <label className="edit-modal-user">Last name</label>     
                            <input type="text" onChange={e => {this.setState({lnameEditable:e.target.value})}} className="form-control field-text p-0" name="name" value={this.state.lnameEditable}
                              required="required"/>
                          </div>
                        </div>
                        <div className="row">
                          
                        <div className="form-group col-md-6"> 
                            <label className="edit-modal-user">Email</label>   
                            <input type="text" onChange={e => {this.setState({emailEditable:e.target.value})}} className="form-control field-text p-0" name="name" value={this.state.emailEditable}
                              required="required"/>
                          </div>
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-user">Password</label>
                            <input type="password" onChange={e => {this.setState({passwordEditable:e.target.value})}} className="form-control field-text p-0" name="name" placeholder="*********" value={this.state.passwordEditable}
                              required="required"/>
                          </div>
                          
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-user">Mobile no</label> 
                            <input type="tel" onChange={e => {this.setState({mobilenoEditable:e.target.value})}} className="form-control field-text p-0" name="name" value={this.state.mobilenoEditable}
                              required="required"/>
                          </div>
                        </div>
                        
                          </div>
                          <div className="modal-footer" style={{textAlign:'center',display:'block'}}>
                            <div >
                              <button style={{border:0}} className="btn btn-sm button-style" onClick={()=>{this.edituser(this.state.selectededituser)}}>Save</button>
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
                          <form onSubmit={e => { e.preventDefault(); }}>
                        <div className="modal-content">
                          <div className="modal-header modal-border">
                            <h4 className="modal-title modal-heading edit-Heading">Orders</h4>
                            <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                          </div>
                          <div className="modal-body madal-padd">
                          <div className='scrollviewcontent'>
                {this.state.ordersData.map((item,index) => {
                  return(
                <div className="row ml-4 mr-4 mb-4 table-content" key={index}>
                  <div className="col-md-12 table-img" style={{textTransform:'capitalize'}}>
                    <img alt="profile" className="img-profile rounded-circle mr-2 ml-3" src= {item?.restaurant_image}
                      style={{objectFit:'cover',float:'left'}} />
                   <div className="text-truncate col-md-5 pt-2 pl-0" style={{float:'left',cursor:'pointer'}} title={item.name}>{item.name}</div>
                  </div>
        
                  <div className="table table-scroll">
                    <table className="table table-bordered mb-4" style={{backgroundColor:'#f8f8f8'}}>
                      <thead>
                        <tr style={{textAlign:'center',color:'black'}}>
                          {/* <th className=" text-truncate" style={{fontWeight:'500'}}>Wave</th> */}
                          <th className=" text-truncate col-4" style={{fontWeight:'500'}}>Restaurant</th>
                          <th className=" text-truncate col-4" style={{fontWeight:'500'}}>Status</th>
                          <th className=" text-truncate col-4" style={{fontWeight:'500'}}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-width" style={{textAlign:'center',color:'black',fontWeight: '400',}}>
                          {/* <td className="text-truncate">{item.waveName}</td> */}
                          <td className="text-truncate col-4">{item.restaurant_name}</td>
                          <td className="text-truncate col-4">{item.status}</td>
                          <td className="text-truncate col-4">{new Date(item.created_at).toLocaleString()}</td>
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
                <form id="createuser" onSubmit={e => { e.preventDefault(); }}>
                <div className="modal-content">
                  <div className="modal-header modal-border">
                    <h4 className="modal-title modal-heading">Create User</h4>
                    <button type="button" className="close fas fa-times" data-dismiss="modal" onClick={()=>{this.setState({firstname:'',lastname:'',email:'',password:'',mobileno:'',age:''})}}></button>
                  </div>
                  <div className="modal-body madal-padd">
                      <div className="form-group" style={{width:'48%',float:'left',marginRight:10}}>
                        <div className="input-group">
                          <input type="text" className="form-control field-text" name="name" placeholder="First Name *"
                            required="required" value={this.state.firstname} onChange={e => {this.setState({fname:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group" style={{width:'48%',float:'left'}}>
                        <div className="input-group">
                          <input type="text" className="form-control field-text" name="name" placeholder="Last Name *"
                            required="required" value={this.state.lastname} onChange={e => {this.setState({lname:e.target.value})}}/>
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
                          <input type="phone" className="form-control field-text" name="name" placeholder="Mobile No"
                            required="required" value={this.state.mobileno} onChange={e => {this.setState({mobileno:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'100%',float:'left'}}>
                        <div className="input-group">
                          <select className="btn form-control btn-height border-color btn-border"
                            onChange={(event)=>{
                              console.log('====================================');
                              console.log(event.target.value);
                              console.log('====================================');
                              this.setState({gender:event.target.value});}} value={this.state.gender}>
                              <option value="">Select Gender</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                          </select>
                        </div>
                      </div>
                      
                      
                  </div>
                  {/* <!-- Modal HTML Close--> */}
                  <div className="modal-footer">
                    <div className="btn-group-vertical">
                      <button className="btn button-style " 
                       onClick={()=>{ this.adduser()}}>Create User</button>
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
