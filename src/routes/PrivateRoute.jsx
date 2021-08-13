import React from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import { AuthService } from "@/services";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          {...rest}
          render={(props) =>
            AuthService.isAuthenticated() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default PrivateRoute;
