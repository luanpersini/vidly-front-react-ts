import React, { useEffect, useState } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/common/error-boundary'
import { ProtectedRoute } from './components/common/protected-route'
import NavBar from './components/template/navbar'
import routes from './config/routes'
import { auth } from './infra/services/authService'
import { UserJwtParams } from './interfaces'
import GlobalStyle from './styles/global'
import dark from './styles/themes/dark'
import light from './styles/themes/light'
import usePersistedState from './utils/common/usePersistedState'

//Todo
//Add log service to error boundary - log on files incase db server is down

const App: React.FunctionComponent<Record<string, unknown>> = (props) => {
  const [user, setUser] = useState<UserJwtParams>({name: ''})
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
   
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  
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
    <ThemeProvider theme={theme}>
      <div className="app">
      <GlobalStyle />      
      <ToastContainer />
      <NavBar user={user?.name} toggleTheme={toggleTheme}/>      
      <main className="container">
      <ErrorBoundary>
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
        </ErrorBoundary>
      </main>       
      </div>
      </ThemeProvider>
        
  )
}

export default App
