import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
      className="container"
    >
      <h1 style={{ fontFamily: "Nerko One", fontSize: "70px" }}>
        Welcome to the Blogger.....
      </h1>
      <h3 style={{ fontFamily: "Nerko One", fontSize: "40px" }}>
        Go to About Page{"   "}
        <br />
        <Link to="/about">
          <button className="btn btn-dark mt-3 mb-3">
            <span style={{ fontFamily: "Nerko One", fontSize: "30px" }}>
              About
            </span>
          </button>
        </Link>
        <br />
        {props.auth.isAuthenticated === true ? null : (
          <Fragment>
            <div style={{ fontFamily: "Nerko One", fontSize: "30px" }}>
              <Link to="/login" style={{ color: "green" }}>
                Login
              </Link>{" "}
              to see your posts
            </div>
          </Fragment>
        )}
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Home);
