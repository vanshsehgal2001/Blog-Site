import { connect } from "react-redux";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { setAlert } from "../actions/alert";
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const history = useHistory();
  const onClick = () => {
    props.logout();
    // props.history.push("/login");
    history.push("/login");
    props.setAlert("Logged out", "success");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link
          style={{ fontFamily: "Architects Daughter", fontSize: "40px" }}
          className="navbar-brand"
          to="/"
        >
          Blogger
        </Link>

        {props.auth.isAuthenticated ? (
          <Fragment>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ml-3">
                <Link
                  style={{
                    fontFamily: "Architects Daughter",
                    fontSize: "30px",
                  }}
                  className="nav-link"
                  to="/myposts"
                >
                  My Posts
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ml-3">
                <Link
                  style={{
                    fontFamily: "Architects Daughter",
                    fontSize: "30px",
                  }}
                  className="nav-link"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </Fragment>
        ) : (
          <Fragment>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ml-3">
                <Link
                  style={{
                    fontFamily: "Architects Daughter",
                    fontSize: "30px",
                  }}
                  className="nav-link"
                  to="/allposts"
                >
                  All Posts
                </Link>
              </li>
            </ul>
          </Fragment>
        )}
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ml-3">
            <Link
              style={{
                fontFamily: "Architects Daughter",
                fontSize: "30px",
              }}
              className="nav-link"
              to="/bloggers"
            >
              Bloggers
            </Link>
          </li>
        </ul>

        <div
          // className="collapse navbar-collapse"
          style={{ display: "flex", justifyContent: "space-between" }}
          id="navbarSupportedContent"
        >
          <ul
            className="navbar-nav"
            style={{
              marginTop: 0,
              marginBottom: 0,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {props.auth.isAuthenticated ? (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={{
                      fontFamily: "Architects Daughter",
                      fontSize: "30px",
                    }}
                    className="nav-link"
                    to="/login"
                    onClick={onClick}
                  >
                    <i
                      className="fas fa-sign-out-alt mr-2"
                      style={{ fontSize: "20px" }}
                    />
                    Logout
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={{
                      fontFamily: "Architects Daughter",
                      fontSize: "30px",
                    }}
                    className="nav-link"
                    to="/login"
                  >
                    <i
                      className="fas fa-sign-in-alt mr-2"
                      style={{ fontSize: "20px" }}
                    />
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={{
                      fontFamily: "Architects Daughter",
                      fontSize: "30px",
                    }}
                    className="nav-link"
                    to="/register"
                  >
                    <i
                      className="fas fa-user-plus mr-2"
                      style={{ fontSize: "20px" }}
                    />
                    Register
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { logout, setAlert })(Navbar);
