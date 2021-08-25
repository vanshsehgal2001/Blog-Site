import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.login({
      email,
      password,
    });
    if (props.isAuthenticated) {
      props.setAlert("Login Successfull", "success");
    }
    console.log(user);
    // props.history.push("/dashboard");
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div
      className="container"
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
        width: "70vh",
        fontWeight: "bold",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Texturina",
          fontWeight: "1000",
          marginBottom: "30px",
        }}
      >
        <i className="fas fa-sign-in-alt mr-2" />
        Login
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h4
            style={{ fontFamily: "Libre Franklin" }}
            htmlFor="exampleInputEmail1"
          >
            <i className="fas fa-envelope mr-2" />
            Email address
          </h4>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={onChange}
          />
          <h6 id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </h6>
        </div>
        <div className="form-group">
          <h4
            htmlFor="exampleInputPassword1"
            style={{ fontFamily: "Libre Franklin" }}
          >
            <i className="fas fa-key mr-2" />
            Password
          </h4>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <h6 style={{ textAlign: "center" }}>
          <i className="fas fa-arrow-circle-right mr-2" />
          Not registered??{" "}
          <Link to="/register" style={{ color: "black", fontWeight: "1000" }}>
            Register
          </Link>
        </h6>
        <button type="submit" className="btn btn-dark btn-block mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { setAlert, login })(Login);
