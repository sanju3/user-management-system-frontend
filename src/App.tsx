import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Confirm from "./components/Confirm";
import User from "./components/User";
import React from "react";
import Forgot from "./components/Forgot";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route
          exact
          path="/confirm/:username/:random"
          component={Confirm}
        ></Route>
        <Route exact path="/forgot" component={Forgot} />

        <ProtectedRoute exact path="/user" component={User}></ProtectedRoute>
        <Route path="*" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
