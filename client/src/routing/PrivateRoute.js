import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  auth: { isAuthenticated, loading },
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && loading ? (
          <Fragment>
            <Redirect to="/login" />
          </Fragment>
        ) : (
          <Fragment>
            <Component {...props} />
          </Fragment>
        )
      }
    ></Route>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
