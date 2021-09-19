import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";

const currentTab = (history, path) => {
     if (history.location.pathname === path)
          return {color: "#ffffff",backgroundColor:"#6351ce",borderRadius:"25px",fontWeight:"700"};
     else
          return {color: "#6351ce"}
}

function UserDashboardNav(props) {

     const {user} = isAuthenticated();
     
     return (
          <div className="card">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link style={currentTab(props.history,"/user/dashboard")} to="/user/dashboard" className="nav-link theme-color admin-option">
                    Dashboard
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link style={currentTab(props.history,`/user/${user._id}/orders`)} to={`/user/${user._id}/orders`} className="nav-link theme-color admin-option">
                    My Orders
                  </Link>
                </li>
                
              </ul>
            </div>
     );
}

export default withRouter(UserDashboardNav);