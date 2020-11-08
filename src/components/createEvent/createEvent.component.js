import React, { Component } from 'react';
import axios from 'axios';
export default class CreateTodo extends Component {

    state = {
        name: '',
        guestNo: '',
        date: '',
        startTime: '',
        endTime: '',
        completed : false,
        errors : {}
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }
    onChangeDescription = (e) => {
        this.setState({
            guestNo: e.target.value
        });
    }
    onChangeDate = (e)  => {
        this.setState({
            date: e.target.value
        });
    }
    onChangeStartTime=(e) => {
        this.setState({
            startTime: e.target.value
        });
    }

    onChangeEndTime = (e) => {
        this.setState({
            endTime: e.target.value
        });
    }

    onSubmit=(e) => {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log('Event Name:' ,this.state.name);
        console.log(`Event Description: ${this.state.description}`);
        console.log(`Event Date: ${this.state.date}`);

        const newData = {
            name: this.state.name,
            guestNo: this.state.guestNo,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
        }
        if(this.handleValidation()){
            alert("Form submitted");
            axios.post('http://localhost:4000/add', newData)
            .then(res => console.log(res.data));
            this.setState({
                name: '',
                guestNo: '',
                date: '',
                startTime: '',
                endTime: '',
                completed: false,
                errors : {}
                })
                this.props.history.push('/events');
         }else{
            alert("Form has errors.")
         }
    }
    handleValidation = () => {
        let fields = {
            name : this.state.name,
            guestNo : this.state.guestNo,
            date : this.state.date,
            startTime : this.state.startTime,
            endTime : this.state.endTime
        };
        let errors = {};
        let formIsValid = true;
    
        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }
        if(!fields["guestNo"]){
            formIsValid = false;
            errors["guestNo"] = "Cannot be empty";
         }
         if( fields["guestNo"].length > 0 ){
            if(!fields["guestNo"].match("[0-9]+")){
               formIsValid = false;
               errors["guestNo"] = "Only Numbers"
            }        
         }
         var regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
         if (!regex.test(fields["date"])){
            // not a date
            formIsValid = false;
            errors["date"] = "Not a valid date";
          }
          if(!fields["startTime"]) {
            formIsValid = false;
            errors["startTime"] = "Cannot leave empty";
          }
          else {
              if (!fields["startTime"].match(/^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/)){
                formIsValid = false;
                errors["startTime"] = "Not a valid format";
              }
          }
          if(!fields["endTime"]) {
            formIsValid = false;
            errors["endTime"] = "Cannot leave empty";
          }
          else {
              if (!fields["endTime"].match(/^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/)){
                formIsValid = false;
                errors["endTime"] = "Not a valid format";
              }
          }
       this.setState({errors: errors});
       return formIsValid
    }



    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                        <span style={{color: "red"}}>{this.state.errors.name}</span>
                    </div>
                    <div className="form-group">
                        <label>No. Of Guests: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                        <span style={{color: "red"}}>{this.state.errors.guestNo}</span>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                placeholder="YYYY-MM-DD"
                                value={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        <span style={{color: "red"}}>{this.state.errors.date}</span>
                    </div>
                    <div className="form-group">
                        <label>Start-Time: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                placeholder = "00:00am/pm"
                                value={this.state.startTime}
                                onChange={this.onChangeStartTime}
                                />
                        <span style={{color: "red"}}>{this.state.errors.startTime}</span>
                    </div>
                    <div className="form-group">
                        <label>End-Time: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.endTime}
                                placeholder = "00:00am/pm"
                                onChange={this.onChangeEndTime}
                                />
                        <span style={{color: "red"}}>{this.state.errors.endTime}</span>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}