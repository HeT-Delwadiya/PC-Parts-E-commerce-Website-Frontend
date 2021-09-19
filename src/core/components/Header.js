import React from "react";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated, logout} from "../../auth/helper/index"

const currentTab = (history, path) => {
     if (history.location.pathname === path)
          return {color: "#6351ce",backgroundColor:"#ffffff",borderRadius:"25px",fontWeight:"700"};
     else
          return {color: "#ffffff"}
}

function Header(props) {

     return (
          <div>
               
               <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#6351ce"}}>

               
               <a className="navbar-brand text-white ms-4" href="#">PC Parts Shop</a>

               
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
               aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
               </button>

               
               <div className="collapse navbar-collapse ms-5" id="basicExampleNav">
                    <ul className="navbar-nav mr-auto">
                         <li className="nav-item active me-3">
                              <Link style={currentTab(props.history,"/")} className="nav-link" to="/">Home</Link>
                         </li>
                         {isAuthenticated() && isAuthenticated().user.role===0 && (
                              <li className="nav-item me-3">
                                   <Link style={currentTab(props.history,"/user/dashboard")} className={props.userRoute ? "nav-link active-menu-style" : "nav-link" } to="/user/dashboard">Dashboard</Link>
                              </li>
                         )}
                         {isAuthenticated() && isAuthenticated().user.role===1 && (
                              <li className="nav-item me-3">
                                   <Link style={currentTab(props.history,"/admin/dashboard")} className={props.adminRoute ? "nav-link active-menu-style" : "nav-link" } to="/admin/dashboard">Admin Dashboard</Link>
                              </li>
                         )}
                         {!isAuthenticated() && (
                              <React.Fragment>
                                   <li className="nav-item me-3">
                                        <Link style={currentTab(props.history,"/register")} className="nav-link" to="/register">Register</Link>
                                   </li>
                                   <li className="nav-item me-3">
                                        <Link style={currentTab(props.history,"/login")} className="nav-link" to="/login">Login</Link>
                                   </li>
                              </React.Fragment>
                         )}
                         <li className="nav-item active me-3">
                              <Link style={currentTab(props.history,"/cart")} className="nav-link" to="/cart">Cart</Link>
                         </li>
                         {isAuthenticated() && (
                              <li className="nav-item">
                                   <span style={currentTab(props.history,"/logout")} onClick={() => {
                                        logout( () => {
                                             props.history.push("/");
                                        });
                                   }} className="nav-link">Logout</span>
                              </li>
                         )}
                    </ul>
               </div>
               

               </nav>

               <div className="container">
                    <h1 className="mt-5 theme-color">{props.title}</h1>
               </div>

          </div>
     );
}

export default withRouter(Header);