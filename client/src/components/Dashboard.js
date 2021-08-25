import React, { Fragment, useEffect } from "react";
import setToken from "../utils/setToken";
import store from "../store";
import { loadUser } from "../actions/auth";
import { connect } from "react-redux";
import { getMyProfile } from "../actions/profile";
import { Link } from "react-router-dom";
import Experience from "./Experience";
import Education from "./Education";
import LatestPosts from "./LatestPosts";
import "../App.css";
import profile from "../reducers/profile";

if (localStorage.token) {
  setToken(localStorage.token);
}

const Dashboard = (props) => {
  useEffect(() => {
    props.getMyProfile();
  }, [props.getMyProfile]);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return !props.profile.loading && props.profile.profile === null ? (
    <Fragment>
      <div className="container" style={{ textAlign: "center" }}>
        Loading
      </div>
    </Fragment>
  ) : (
    <div style={{ marginLeft: "30px" }}>
      <h1
        style={{
          marginLeft: "10px",
          marginTop: "10px",
          // fontFamily: "Titillium Web",
          fontFamily: "Architects Daughter",

          // textAlign: "center",
          marginBottom: "30px",
          fontWeight: "1000",
          fontSize: "45px",
        }}
      >
        <span style={{ color: "black" }}>Welcome</span>{" "}
        {props.auth.user && (
          <Fragment>
            <span
              style={{
                marginBottom: "6px",
                fontWeight: "1000",
                // fontFamily: "Nerko One",
                fontFamily: "Architects Daughter",
                // padding: "3px",
                color: "black",
                fontSize: "45px",
                // backgroundColor: "rgba(0,255,0,0.4)",
                // opacity: 0.5,
              }}
              className="badge badge-warning"
            >
              {props.auth.user.name}
              {/* Vansh */}
            </span>
          </Fragment>
        )}
      </h1>

      {props.profile.profile !== null ? (
        <Fragment>
          <div
            class="container"
            style={{
              margin: 0,
              // display: "flex",
              // justifyContent: "space-evenly",
            }}
          >
            <div class="grid-container">
              <div style={{ marginRight: "20px" }} className="grid-item">
                <Link
                  // style={{
                  //   marginRight: "10px",
                  // }}
                  to={`/profile/${props.profile.profile.user._id}`}
                >
                  <button
                    type="button"
                    class="btn btn-outline-light btn-danger"
                  >
                    <span
                      style={{
                        fontWeight: "1000",
                        fontFamily: "Nerko One",
                        fontSize: "20px",
                      }}
                    >
                      View Profile
                    </span>
                  </button>
                </Link>
              </div>
              <div style={{ marginRight: "20px" }} className="grid-item">
                <Link
                  // style={{
                  //   marginRight: "10px",
                  // }}
                  to="/addexperience"
                >
                  <button
                    type="button"
                    class="btn btn-outline-light btn-danger"
                  >
                    <span
                      style={{
                        fontWeight: "1000",
                        fontFamily: "Nerko One",
                        fontSize: "20px",
                      }}
                    >
                      Add Experience
                    </span>
                  </button>
                </Link>
              </div>
              <div style={{ marginRight: "20px" }} className="grid-item">
                <Link
                  // style={{
                  //   marginRight: "10px",
                  // }}
                  to="/addeducation"
                >
                  <button
                    type="button"
                    class="btn btn-outline-light btn-danger"
                  >
                    <span
                      style={{
                        fontWeight: "1000",
                        fontFamily: "Nerko One",
                        fontSize: "20px",
                      }}
                    >
                      Add Education
                    </span>
                  </button>
                </Link>
              </div>
              <div style={{ marginRight: "20px" }} className="grid-item">
                <Link
                  // style={{
                  //   marginRight: "10px",
                  // }}
                  to="/"
                >
                  <button
                    type="button"
                    class="btn btn-outline-light btn-danger"
                  >
                    <span
                      style={{
                        fontWeight: "1000",
                        fontFamily: "Nerko One",
                        fontSize: "20px",
                      }}
                    >
                      Delete Account
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <h3
            style={{
              fontWeight: "bold",
              fontFamily: "Architects Daughter",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "30px",
            }}
            className="badge badge-info"
          >
            Experience Section
          </h3>
          {props.profile.profile.experience.length > 0 ? (
            <table class="table">
              <thead style={{ textAlign: "center" }}>
                <tr
                  style={{
                    fontFamily: "Nunito",
                    color: "black",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  <th scope="col"> Working as </th>
                  <th scope="col"> Company </th>
                  <th scope="col"> Location </th>
                  <th scope="col"> From </th>
                  <th scope="col"> To </th>
                  <th scope="col"> Currently going on </th>
                  {/* <th scope="col"></th> */}
                </tr>
              </thead>
              {props.profile.profile.experience.map((exp) => {
                return <Experience key={exp._id} experience={exp} />;
              })}
            </table>
          ) : (
            <Fragment>
              <h3>No experience found!!!</h3>
            </Fragment>
          )}
          <h3
            style={{
              fontWeight: "bold",
              fontFamily: "Architects Daughter",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "30px",
            }}
            className="badge badge-info"
          >
            Education Section
          </h3>
          {props.profile.profile.education.length > 0 ? (
            <table class="table">
              <thead>
                <tr
                  style={{
                    fontFamily: "Nunito",
                    color: "black",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  <th scope="col"> School/College </th>
                  <th scope="col"> Degree </th>
                  <th scope="col"> Field Of Study </th>
                  <th scope="col"> From </th>
                  <th scope="col"> To </th>
                  <th scope="col"> Currently going on </th>
                </tr>
              </thead>
              {props.profile.profile.education.map((edu) => {
                return <Education key={edu._id} education={edu} />;
              })}
            </table>
          ) : (
            <Fragment>
              <h3>No education found!!!</h3>
            </Fragment>
          )}
          {/* <LatestPosts /> */}
        </Fragment>
      ) : (
        <Fragment>
          <h3
            style={{
              marginLeft: "30px",
              marginTop: "10px",
              fontFamily: "Titillium Web",
            }}
          >
            Don't have a profile???{" "}
            <Link style={{ color: "green" }} to="/createprofile">
              Create one
            </Link>
          </h3>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getMyProfile })(Dashboard);
