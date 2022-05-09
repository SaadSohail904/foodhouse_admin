import React, { Component } from 'react'

export default class Urlhithome extends Component {
    constructor(props){
        super(props);
        window.location = "foodhouse://app/";
    }
    render() {
        return (
            <div style={{padding:20,width:"100%",height:'100%'}}>
                <h3>This page is for foodhouse admin panel redirect.</h3>
            </div>
        )
    }
}
