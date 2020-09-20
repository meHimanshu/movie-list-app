import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = props => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated) {
    return (
      <>
        <Route {...props} />{" "}
      </>
    );
  }
  return <Redirect to="/" />;
};

export default PrivateRoute;
