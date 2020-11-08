import React, { Component } from "react";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import CreateEvent from "./components/createEvent/createEvent.component";
import EditEvent from "./components/editEvent/editEvent.component";
import EventList from "./components/eventList/eventList.component";
import AuthPage from "./Pages/AuthPage/Auth";
import Homepage from "./components/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";




class App extends Component {
  render() {
    return (
      <Switch>
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
          <Route path="/" exact component={Homepage} />
        <Route path="/event" exact component={EventList} />
        <Route path="/edit/:id" exact component={EditEvent} />
        <Route path="/create" exact component={CreateEvent} />
        <Route path="/login" exact component={props => <AuthPage match={props.match} />} />
        <Route path="/sign-up" exact component={props => <AuthPage match={props.match} />}/>
        </div>
      </Switch>
      
    );
  }
}
export default App;