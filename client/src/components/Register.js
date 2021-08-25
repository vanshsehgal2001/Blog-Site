import { connect } from "react-redux";
import React, { useContext, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      console.log("Please fill up the details");
      props.setAlert("Please fill up the details", "danger");
    } else if (password.length < 6) {
      console.log("Password must be at least 6 characters long");
      props.setAlert("Password must be at least 6 characters long", "danger");
    } else if (password !== confirmPassword) {
      console.log("Passwords don't match");
      props.setAlert("Passwords don't match", "danger");
    } else {
      console.log("User registered successfully");
      console.log(user);
      props.setAlert("User Registered successfully", "success");
      props.register({
        name,
        email,
        password,
      });
    }
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
        <i className="fas fa-user-plus mr-2" />
        Register
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h4
            htmlFor="exampleInputPassword1"
            style={{ fontFamily: "Libre Franklin" }}
          >
            <i className="fas fa-signature mr-2" />
            Name
          </h4>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={name}
            onChange={onChange}
            name="name"
          />
        </div>
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
            value={email}
            onChange={onChange}
            name="email"
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
            value={password}
            onChange={onChange}
            name="password"
          />
        </div>
        <div className="form-group">
          <h4
            htmlFor="exampleInputPassword1"
            style={{ fontFamily: "Libre Franklin" }}
          >
            <i className="fas fa-key mr-2" />
            Confirm Password
          </h4>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={confirmPassword}
            onChange={onChange}
            name="confirmPassword"
          />
        </div>
        <h6 style={{ textAlign: "center" }}>
          <i className="fas fa-arrow-circle-right mr-2" />
          Already registered??{" "}
          <Link to="/login" style={{ color: "black", fontWeight: "1000" }}>
            Login
          </Link>
        </h6>
        <button type="submit" className="btn btn-dark btn-block mt-4">
          Register
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

export default connect(mapStateToProps, { setAlert, register })(Register);
