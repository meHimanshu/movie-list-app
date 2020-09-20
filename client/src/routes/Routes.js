import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../scenes/Home";

// import { Room }from '../scenes/Room';
// import PrivateRoute from './PrivateRoute';

function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={Home} />

        {/* <PrivateRoute exact path="/edit" component = {() => <Edit /> } /> */}
      </Switch>
  );
}

export default Routes;
