import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateEvent from "./components/createEvent/createEvent.component";
import EditEvent from "./components/editEvent/editEvent.component";
import EventList from "./components/eventList/eventList.component";
import "bootstrap/dist/css/bootstrap.min.css";




class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/" target="_blank">
              <img src="https://www.pngfind.com/pngs/m/543-5435404_svg-events-calendar-events-symbol-hd-png-download.png" width="30" height="30" alt="EventIcon" />
            </a>
            <Link to="/" className="navbar-brand">Event Organiser</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Events</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Event</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
        <Route path="/" exact component={EventList} />
        <Route path="/edit/:id" component={EditEvent} />
        <Route path="/create" component={CreateEvent} />
        </div>
      </Router>
      
    );
  }
}
export default App;