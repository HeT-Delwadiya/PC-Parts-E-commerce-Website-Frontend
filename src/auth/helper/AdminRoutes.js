import React from "react";
import { isAuthenticated } from "./index";
import { Redirect, Route } from "react-router-dom";


function AdminRoute({ component:Component, ...rest }) {
     return (
       <Route
         {...rest}
         render={props =>
           isAuthenticated() && isAuthenticated().user.role===1 ? (
             <Component {...props} />
           ) : (
             <Redirect
               to={{
                 pathname: "/login",
                 state: { from: props.location }
               }}
             />
           )
         }
       />
     );
}

export default AdminRoute;