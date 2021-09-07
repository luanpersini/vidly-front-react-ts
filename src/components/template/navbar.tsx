import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Switch from 'react-switch'
import styled, { ThemeContext } from 'styled-components'

interface Props {
  user: string
  toggleTheme(): void
}

export const NavContainer = styled.div`
  height: 60px;
  padding: 0 30px;
  margin-bottom: 30px;
  background: #242729;
  color: #fff;
  display: flex;
  align-items: center;
  line-height: inherit;

  .left-items {
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
  }
  .right-items {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    float: right;
  }
  
  a {
    font-size: 14px;
    text-decoration: none;
    line-height: inherit;
    color: #dedede;
    :hover,
    :focus {
      opacity: 0.8;
    }
    padding: 8px 16px;    
  }
  a.navbrand {
    margin-right: 15px;
    font-size: 20px;
    color: #0cc;
    padding: 2px 0;

    :hover,
    :focus {
      text-decoration: none;
      opacity: 1;
    }
  }
`

const NavBar: React.FC<Props> = ({ user, toggleTheme }: Props) => {
  // const NavBar = ({ user, toggleTheme }: Props) => {
  const { colors, title } = useContext(ThemeContext)

  return (
    <NavContainer>
      <div className="left-items">
        <Link className="navbrand" to="/">
          Vidly
        </Link>
        <NavLink className="nav-item nav-link" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-item nav-link" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
        </NavLink>
        {!user && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/profile">
              {user.split(' ').slice(0, 1).join(' ')}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </div>
      <div className="right-items">
        <Switch
          onChange={toggleTheme}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          offColor={colors.shade0}
          onColor={colors.shade0}
        />
      </div>
    </NavContainer>
  )
}

export default NavBar
