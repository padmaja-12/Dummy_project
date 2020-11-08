import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Todo = props => {
    let edit = null;
    if(props.todo.completed) {
       edit = (
           <td>
              <button>Completed</button>
           </td>
       )
    }
    else {
        edit = (
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        )
    }
    return (
    <tr>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.name}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.date}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.startTime}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.endTime}</td>
        {edit}
    </tr>
    )
}

export default class TodosList extends Component {

    state = {
        events : []
    }


    componentDidMount() {
        axios.get('http://localhost:4000/')
            .then(response => {
                this.setState({ events: response.data });
                console.log(response);
            })
            .catch(function (error){
                console.log(error);
            })
    }
    eventList = () => {
        return this.state.events.map(function(currentEvent, i){
            return <Todo todo={currentEvent} key={i} />;
        })
    }
    render() {
        let data = null;
        if(this.state.events.length > 0){
          data = (
            <div>
            <h3>Event List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>No. Of Guests</th>
                        <th>Start-Time</th>
                        <th>End-Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { this.eventList() }
                </tbody>
            </table>
        </div>
          );
        }
        else {
            data = (
                <div>
                    <h5>No event created yet!!</h5>
                    <button className = "btn btn-light btn-lg"><Link to="/create">Create Your First Event</Link></button>
                </div>
            );
        }
        return data;       
    }
}