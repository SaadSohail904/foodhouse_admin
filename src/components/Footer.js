import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="sticky-footer ">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span style={{color:'#ffffff',fontSize:11,fontWeight:'400'}}>Copyright &copy; 
                  <a target="_blank" href="http://www.fitnessvwork.com/" rel="noopener noreferrer" > Foodhouse admin</a>
                  </span>
                </div>
              </div>
            </footer>
        )
    }
}
