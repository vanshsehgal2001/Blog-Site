import { connect } from "react-redux";
import React, { Fragment, useEffect } from "react";
import setToken from "../utils/setToken";
import { Link } from "react-router-dom";
import { getUserProfile } from "../actions/profile";
import { loadUser } from "../actions/auth";
import store from "../store";

const ViewProfile = (props) => {
  useEffect(() => {
    props.getUserProfile(props.profile.profile.user._id);
  }, [props.getUserProfile]);

  // console.log(props.profile.profile.user.name);

  return !props.profile.loading && props.profile.profile === null ? (
    <Fragment>
      <div className="container" style={{ textAlign: "center" }}>
        Loading
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div
        style={{ fontSize: "50px", fontWeight: "bold", textAlign: "center" }}
      >
        {props.profile.profile.user.name}'s Profile
      </div>
      <div className="container" style={{ margin: 0, width: "30%" }}>
        {props.auth.user._id == props.profile.profile.user._id ? (
          <Fragment>
            <Link to="/editprofile">
              <div
                style={{
                  color: "black",
                  display: "flex",
                  fontSize: "25px",
                  fontweight: "bold",
                  fontsize: "100px",
                  margin: 0,
                  padding: 0,
                  width: "50px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Architects Daughter",
                  }}
                >
                  Edit
                </div>
                <div>
                  <i
                    style={{ color: "black", marginLeft: "10px" }}
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getUserProfile })(ViewProfile);
