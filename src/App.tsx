import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ProtectedRoute } from './components/common/protected-route'
import NavBar from './components/template/navbar'
import routes from './config/routes'
import { auth } from './infra/services/authService'
import { UserJwtParams } from './interfaces'

const App: React.FunctionComponent<Record<string, unknown>> = (props) => {
  const [user, setUser] = useState<UserJwtParams>({name: ''})
  useEffect(() => {
    (async () => {
        auth.getCurrentUser()
        .then((user:any) =>{
            setUser(user)
        })
        .catch((err) => { console.log(err);
        })
        })()
  }, [])
 
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          {routes.map((route, index) => {
            if (route.auth)
             {
            return (
              <Route
                key={index}
                path={route.path}                
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <ProtectedRoute from={location.pathname} >
                  <route.component title={route.title} {...props} {...route.props} />
                  </ProtectedRoute>
                )}
              />
            )
          }
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: RouteComponentProps<any>) => (
                <route.component title={route.title} {...props} {...route.props} />                
              )}
            />
          )
          })}
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App

// ToDo
// Toast Container

/*
import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import ProtectedRoute from './components/common/protectedRoute'
import { Customers } from './components/customers'
// import LoginForm from './components/loginForm'
// import Logout from './components/logout'
// import MovieForm from './components/movieForm'
import NavBar from './components/navBar'
import NotFound from './components/notFound'
import { Movies } from './pages/Movies'
// import RegisterForm from './components/registerForm'
// import Rentals from './components/rentals'
// import auth from './services/authService'

function App() {
  // componentDidMount() {
  //   const user = auth.getCurrentUser()
  //   this.setState({ user })
  // }

  // const { user } = this.state

  //   type UserParams = {
  //     _id: string
  //     name: string
  //     email: string
  //     password: string
  // }
  const user = {
    _id: { $oid: '60a178327476cd104886862f' },
    name: 'Luan PSG',
    email: 'luanpsg@gmail.com',
    password: '$2b$10$RX4j/xWlLQgViqNHPgUZYuFQsYC2yTGuZ3pQ2zN33dItpURq3aCHi'
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
           
         
            
        <Route path="/customers" component={Customers} />
          <Route path="/movies" render={(props: RouteComponentProps) => <Movies {...props} user={user} />} />
          <Route path="/movies" component={Movies} />
          <Redirect from="/" exact to="/movies" />        
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </React.Fragment>
  )
}

export default App


/*
<Route path="/register" component={RegisterForm} />
<Route path="/login" component={LoginForm} />
<Route path="/logout" component={Logout} />
<ProtectedRoute path="/movies/:id" component={MovieForm} />
<Route path="/movies" render={(props) => <Movies {...props} user={this.state.user} />} />
<Route path="/customers" component={Customers} />
<Route path="/rentals" component={Rentals} />
*/
