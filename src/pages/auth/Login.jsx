
/*
import Joi from "joi-browser";
import React from "react";
import Form from "../../components/common/form";
import { auth } from "../../infra/services/authService";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // se trouxer os dados do usuário logado, redireciona para a página inicial
    // if (auth.getCurrentUser()) return <Redirect push to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
*/

import { Component } from "react";

class Logout extends Component {
  /* 
   componentDidMount() {
     auth.logout();
 
     window.location = "/";
   }
 */
   render() {
     return null;
   }
 }
 
 export default Logout;
