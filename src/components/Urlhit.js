import React, { Component } from 'react'

export default class Urlhit extends Component {
    constructor(props){
        super(props);
        this.state = { 
            width: 0, height: 0 ,
            email:'' , password:'',
            alertshow:false,
            alerttext:'',
            token:''
        };
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');
        this.state.token=urlParams.get('token');
        window.location = "foodhouse://name/"+token;
    }
    render() {
        return (
            <div style={{padding:20,width:"100%",height:'100%'}}>
                <h3>This page is for foodhouse admin email varification.</h3>
            </div>
        )
    }
}
