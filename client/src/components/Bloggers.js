import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../actions/profile";
import ProfileItem from "./ProfileItem";
import "../App.css";

const Bloggers = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles, loading]);

  return (
    <div className="container">
      {loading ? (
        "loading"
      ) : (
        <Fragment>
          <h1
            style={{
              fontFamily: "Architects Daughter",
              fontSize: "50px",
              marginTop: "10px",
              marginLeft: 0,
            }}
          >
            Bloggers Area
          </h1>
          <hr />
          <h3 style={{ marginBottom: "20px" }}>
            Connect with bloggers all over the world!!!
          </h3>
          {profiles.map((profile) => {
            return (
              //   <div className="container">
              <div>
                <ProfileItem key={profile._id} profile={profile} />
              </div>
              //   </div>
            );
          })}
        </Fragment>
      )}
    </div>
  );
};

const UserStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getProfiles })(Bloggers);
