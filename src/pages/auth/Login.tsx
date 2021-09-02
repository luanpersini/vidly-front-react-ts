import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import { Button, Input } from '../../components/form'
import { Title } from '../../components/template'
import { auth } from '../../infra/services/authService'
import { Validate } from '../../infra/validation/validate-factory'
import { Page } from '../../protocols'
import { HttpStatusCode } from '../../protocols/http'

///FAZER AOS POUCOS - ADICIONANDO AS FUNCIONALIDADES
///Assistir a aula do mosh com a parte de login parar utilizar o jwt
// export const Login: React.FC<Page> = props => {
export function Login(props: Page) {
  const validate = Validate()
  const history = useHistory()
  const location = useLocation()

  const [errors, setErrors] = React.useState<any[]>([])
  const [data, setData] = useState({
    username: undefined,
    password: undefined
  })

  const validationSchema: any = {
    username: Yup.string().required().min(4).max(50).label('Username'),
    password: Yup.string().required().min(6).max(25).label('Password')
  }
  //Handle Submit - Avisar que username ou password são inválidos

  async function handleChange({ currentTarget: input }: any) {
    const formData: any = { ...data }
    const { name, value } = input
    formData[name] = value
    setData(formData)

    const errorsFound = { ...errors }
    const errorMessage = await validate.One(name, value, validationSchema)

    if (errorMessage) errorsFound[input.name] = errorMessage
    else delete errorsFound[input.name]
    setErrors(errorsFound)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const { from: previousLocation }: any = location.state
    console.log('handle sub')
    console.log(previousLocation)

    try {
      await auth.login(data.username, data.password)
      if (previousLocation !== '/login') {
        window.location = previousLocation as unknown as Location
      } else {
        window.location = '/' as unknown as Location
      }
    } catch (error: any) {
      console.log(error)
      if (error.response && error.response.status === HttpStatusCode.badRequest) {
        //Se BadRequest, enviar mensagem "Invalid Username or Password "
        // const errors = { ...this.state.errors };
        // errors.username = ex.response.data;
        // this.setState({ errors });
      }
    }
  }

  return (
    // se trouxer os dados do usuário logado, redireciona para a página inicial
    //  if (auth.getCurrentUser()) return history.push('/')

    <div>
      <Title title={props.title} />
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          errors={errors}
          onChange={handleChange}
          inputvalue={data}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          errors={errors}
          onChange={handleChange}
          inputvalue={data}
        />
        <Button type="submit" label="Login" />
      </form>
    </div>
  )
}
/*
import Joi from "joi-browser";

import Form from "../../components/common/form";
import { auth } from "../../infra/services/authService";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  // schema = {
  //   username: Joi.string()
  //     .required()
  //     .label("Username"),
  //   password: Joi.string()
  //     .required()
  //     .label("Password")
  // };

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
