import React, { Component } from 'react';
import { Switch } from "react-router-dom";
// import Route from "./Route";
import { Route } from "react-router-dom";
import Login from './components/Login';
import Checkins from './components/Checkins';
import Users from './components/Users';
import Restaurants from './components/Restaurants';
import Navi from "./components/Navi";
import Sidebar from "./components/Sidebar";
import ChangePassword from "./components/ChangePassword";
import './App.css';
import Urlhit from './components/Urlhit';
import Urlhithome from './components/Urlhithome';
export default class App extends Component {
  constructor(props){
    super(props);
    global.url='http://ec2-44-201-171-84.compute-1.amazonaws.com:4005'
    // global.url='http://localhost:4005'
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/app" component={Users} />
        <Route path="/restaurants" component={Restaurants}/>
        <Route path="/users" component={Users} />
        <Route path="/checkins" component={Checkins} />
        <Route path="/navi" component={Navi}/>
        <Route path="/changepassword" component={ChangePassword}/>
        <Route path="/sidebar" component={Sidebar}/>
        <Route path="/urlhit" component={Urlhit}/>
        <Route path="/urlhithome" component={Urlhithome}/>
        
      </Switch>
    )
  }
}
