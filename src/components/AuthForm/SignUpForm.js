import React, { Component } from "react";
import "./AuthForm.css";

/* <------------API------------> */
import axios from 'axios';

export default class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      fields: [
        "name",
        "country",
        "age",
        "emailAddress",
        "password",
        "confirmPassword"
      ],
      fieldDetails: [
        {
          fieldName: "name",
          label: "Name",
          type: "text",
          placeholderMessage: "Enter your name.",
          requiredErrorMessage: "Please enter your name."
        },
        {
          fieldName: "country",
          label: "Country",
          type: "text",
          placeholderMessage: "Enter your country.",
          requiredErrorMessage: "Please enter your country."
        },
        {
          fieldName: "age",
          label: "Age",
          type: "number",
          placeholderMessage: "Enter your age.",
          requiredErrorMessage: "Please enter your age."
        },
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
        },
        {
          fieldName: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholderMessage: "Enter your password again.",
          requiredErrorMessage: "Please confirm your password.",
          passwordMatchErrorMessage: "Passwords do not match."
        }
      ],
      user: {},
      errors: {},
      submitDisabled: true,
      submitAttempted: false
    };
  }

  componentWillMount() {
    let { user, errors } = this.state;
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
        const { user, fields, fieldDetails, submitAttempted } = this.state;
        const { password, confirmPassword } = user;

        let submitDisabled = false;
        let passwordError = "";
        let confirmPasswordError = "";

        for (let key in user) {
          if (user[key] === "") {
            submitDisabled = true;
          }
        }

        if (password && confirmPassword && password !== confirmPassword) {
          submitDisabled = true;
          if (submitAttempted) {
            const passwordIndex = fields.indexOf("password");
            const confirmPasswordIndex = fields.indexOf("confirmPassword");
            const passwordMatchErrorMessage =
              fieldDetails[passwordIndex].passwordMatchErrorMessage;
            const confirmPasswordMatchMessage =
              fieldDetails[confirmPasswordIndex].passwordMatchErrorMessage;

            passwordError = passwordMatchErrorMessage;
            confirmPasswordError = confirmPasswordMatchMessage;
          }
        }

        this.setState({
          submitDisabled: submitDisabled,
          errors: {
            ...this.state.errors,
            passwordError: passwordError,
            confirmPasswordError: confirmPasswordError
          }
        });
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(
      {
        submitAttempted: true
      },
      () => {
        const {
          submitDisabled,
          fields,
          fieldDetails,
          errors,
          user
        } = this.state;

        if (submitDisabled) {
          let newErrors = Object.assign({}, errors);
          for (let i = 0; i < fields.length; i++) {
            const formField = fields[i];
            if (user[formField] === "") {
              const formFieldError = formField + "Error";
              const errorMessage = fieldDetails[i].requiredErrorMessage;
              newErrors[formFieldError] = errorMessage;
            }
          }

          const { password, confirmPassword } = user;
          let passwordError = "";
          let confirmPasswordError = "";

          if (password !== confirmPassword) {
            const passwordIndex = fields.indexOf("password");
            const confirmPasswordIndex = fields.indexOf("confirmPassword");
            const passwordMatchErrorMessage =
              fieldDetails[passwordIndex].passwordMatchErrorMessage;
            const confirmPasswordMatchMessage =
              fieldDetails[confirmPasswordIndex].passwordMatchErrorMessage;
            passwordError = passwordMatchErrorMessage;
            confirmPasswordError = confirmPasswordMatchMessage;

            newErrors["passwordError"] = passwordError;
            newErrors["confirmPasswordError"] = confirmPasswordError;
          }

          this.setState({
            errors: newErrors
          });
        } else {
            axios.post('http://localhost:4000/login', user)
            .then(res => {
                console.log(res.data)
            this.setState({
                user: {},
                errors : {}
                });
            })
        }
      }
    );
  };

  render() {
    const { fields, fieldDetails, user, errors, submitDisabled } = this.state;

    const formBodyJSX = fieldDetails.map((field, index) => {
      const { fieldName, label, type, placeholderMessage } = field;
      return (
        <div key={index} className="SignUpForm-input-group">
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
            <h3 className="SignUpForm-title">Sign Up</h3>
          </div>
          <div className="SignUpForm-body">
            <form className="SignUpForm" onSubmit={this.handleSubmit}>
              {formBodyJSX}
              <button
                type="submit"
                className={
                  submitDisabled
                    ? "SignUpForm-button button-disabled"
                    : "SignUpForm-button"
                }
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
