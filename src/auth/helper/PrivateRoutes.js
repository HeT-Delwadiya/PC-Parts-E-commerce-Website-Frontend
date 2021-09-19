import React from "react";
import { isAuthenticated } from "./index";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component:Component, ...rest }) {
     return (
       <Route
         {...rest}
         render={props =>
           isAuthenticated() ? (
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

export default PrivateRoute;