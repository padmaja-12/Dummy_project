import React, { Component } from 'react';
import axios from 'axios';


export default class EditTodo extends Component {

    state = {
        name: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        completed : false,
    }
    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }
    onChangeDate= (e) => {
        this.setState({
            date: e.target.value
        });
    }
    onChangeStartTime = (e) => {
        this.setState({
            startTime: e.target.value
        });
    }
    onChangeEndTime = (e) => {
        this.setState({
            endTime: e.target.value
        });
    }

    onChangeTodoCompleted = (e)=> {
        this.setState({
            completed: !this.state.completed
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            guestNo: this.state.guestNo,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            completed: this.state.completed
        };
        console.log(obj);
        axios.put('http://localhost:4000/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/events');
    }
    componentDidMount() {
        axios.get('http://localhost:4000/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name : response.data.name,
                    guestNo : response.data.guestNo,
                    date : response.data.date,
                    startTime : response.data.startTime,
                    endTime : response.data.endTime
                });
                console.log(response);   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>No. of Guests: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.guestNo}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.date}
                                onChange={this.onChangeDate}
                                />
                    </div>
                    <div className="form-group">
                        <label>Start-Time: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.startTime}
                                onChange={this.onChangeStartTime}
                                />
                    </div>
                    <div className="form-group">
                        <label>End-Time: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.endTime}
                                onChange={this.onChangeEndTime}
                                />
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.completed}
                                value={this.state.completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Event" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}