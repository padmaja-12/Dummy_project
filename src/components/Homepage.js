import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Homepage extends Component{
    render () {
        return (
            <div>
                <h1>WELCOME TO THE EVENT-ORGANISER APP</h1>
            <h4>Before starting with the map you must login or sign-up</h4>
            <tr>
              <th><Link to="/login"><button className="btn btn-lg btn-primary">LOGIN</button></Link></th>
              <th><Link to="/sign-up"><button className="btn btn-lg btn-primary">SIGN-UP</button></Link></th>
            </tr>
            </div>
        )
    }
}

export default Homepage;