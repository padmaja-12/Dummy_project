import React, { Component } from "react";

/*---------Components--------*/
import SignUpForm from "../../components/AuthForm/SignUpForm";
import LoginForm from "../../components/AuthForm/LoginForm";

export default class AuthPage extends Component {
  render() {
    const { match } = this.props;
    let formJSX;

    if (match.path === "/sign-up") {
      formJSX = <SignUpForm />;
    } else if (match.path === "/login") {
      formJSX = <LoginForm />;
    }

    return <div className="AuthPage-container">{formJSX}</div>;
  }
}