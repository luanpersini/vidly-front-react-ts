import React from 'react';
import { Link, NavLink } from "react-router-dom";

export function Customers () {

    async function handleLogin(event) {
    event.preventDefault();
        
    // const customers = await getCustomers();
    // console.log('token next');
    // console.log(customers );    
  
  }

  return (
    <div id="page-auth">
      <aside>
       
        <h1>LuBank</h1>
        <p>O banco digital que te entende.</p>
        <p className="warning">*Site simulando App Bancário para portfólio. Esta não é uma instituição bancária real.</p>
      </aside>
      <main>   
      <div></div><Link to="/">Go to the home page!</Link>     
      <div><NavLink className="nav-item nav-link" to="/movies">Movies
          </NavLink></div>
      
        <div className="main-content">
        <h2>Acesse sua conta</h2>
       
          
            <input 
              type="text"
              name= "email"
              placeholder="email"   
              onChange={handleLogin}                               
            />            
            
             
        </div>
      </main>
    </div>
  )
}