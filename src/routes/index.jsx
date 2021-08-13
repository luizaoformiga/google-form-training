import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import {
  Home,
  EditForm,
  Login,
  UserView,
  RadioCheck
} from "@/pages";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />

        <PrivateRoute path="/form/:formId" component={EditForm} />
        <Route exact path="/s/:formId" component={UserView} />
        <Route exact path="/fuck" component={RadioCheck} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

// function Login(){
//     let history = useHistory();
//     let location = useLocation();

//     let { from } = location.state || { from: { pathname: "/" } };
//     let login = () => {
//         auth.authenticate(() => {
//           history.replace(from);
//         });
//       };

//     return (
//         <div>
//             <p>Login form goes here</p>
//             <button onClick={login}>Login</button>
//         </div>
//     );
// }
