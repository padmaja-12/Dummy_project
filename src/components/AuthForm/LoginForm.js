import React, { Component } from "react";
import "./AuthForm.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      fields: ["emailAddress", "password"],
      fieldDetails: [
        {
          fieldName: "emailAddress",
          label: "Email Address",
          type: "email",
          placeholderMessage: "Enter your email address.",
          requiredErrorMessage: "Please enter your email address."
        },
        {
          fieldName: "password",
          label: "Password",
          type: "password",
          placeholderMessage: "Enter your password.",
          requiredErrorMessage: "Please enter your password.",
          passwordMatchErrorMessage: "Passwords do not match."
        }
      ],
      user: {},
      errors: {}
    };
  }

  componentWillMount() {
    let user = {},
      errors = {};
    const { fields } = this.state;
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      let fieldError = field + "Error";
      user[field] = "";
      errors[fieldError] = "";
    }
    this.setState({
      user: user,
      errors: errors
    });
  }

  handleFocus = e => {
    const { fields, fieldDetails, user, errors } = this.state;
    const focusedField = e.target.name;
    const focusedFieldIndex = fields.indexOf(focusedField);

    let clearErrors = {};
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const fieldError = field + "Error";
      clearErrors[fieldError] = "";
    }

    this.setState(
      {
        errors: clearErrors
      },
      () => {
        let newErrors = Object.assign({}, errors);
        for (let i = 0; i < focusedFieldIndex; i++) {
          const formField = fields[i];
          if (user[formField] === "") {
            const formFieldError = formField + "Error";
            const errorMessage = fieldDetails[i].requiredErrorMessage;
            newErrors[formFieldError] = errorMessage;
          }
        }
        this.setState({
          errors: newErrors
        });
      }
    );
  };

  handleChange = e => {
    const formField = e.target.name;
    const formFieldError = formField + "Error";
    this.setState(
      {
        user: {
          ...this.state.user,
          [formField]: e.target.value
        },
        errors: {
          ...this.state.errors,
          [formFieldError]: ""
        }
      },
      () => {
        console.log(this.state.user);
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.user);
    axios.post('http://localhost:4000/login', this.state.user)
            .then(res => {
                console.log(res.data)
            this.setState({
                user: {},
                errors : {}
                });
            <Redirect></Redirect>
            })
    console.log("Button Clicked");
  };

  render() {
    const { fieldDetails, user, errors } = this.state;

    let formBodyJSX = fieldDetails.map(field => {
      const { fieldName, label, type, placeholderMessage } = field;
      return (
        <div className="SignUpForm-input-group">
          <label className="SignUpForm-label" htmlFor={fieldName}>
            {label}
          </label>
          <input
            className="SignUpForm-input"
            name={fieldName}
            value={user[fieldName]}
            type={type}
            placeholder={placeholderMessage}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
          <p className="SignUpForm-error">{errors[fieldName + "Error"]}</p>
        </div>
      );
    });

    return (
      <div className="SignUpForm-positioner">
        <div className="SignUpForm-container">
          <div className="SignUpForm-header">
            <h3 className="SignUpForm-title">Login</h3>
          </div>
          <div className="SignUpForm-body">
            <form className="SignUpForm" onSubmit={this.handleSubmit}>
              {formBodyJSX}
              <button type="submit" className="SignUpForm-button">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}