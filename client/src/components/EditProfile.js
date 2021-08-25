import { connect } from "react-redux";
import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { createUpdateProfile, getMyProfile } from "../actions/profile";
import { useHistory } from "react-router-dom";

const EditProfile = ({ profile, getMyProfile, createUpdateProfile }) => {
  const [formData, setFormData] = useState({
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  });

  const history = useHistory();

  const [links, setLinks] = useState(false);

  useEffect(() => {
    getMyProfile();

    setFormData({
      location:
        profile.loading || !profile.profile.location
          ? ""
          : profile.profile.location,
      skills:
        profile.loading || !profile.profile.skills
          ? ""
          : profile.profile.skills.join(","),
      githubusername:
        profile.loading || !profile.profile.githubusername
          ? ""
          : profile.profile.githubusername,
      bio: profile.loading || !profile.profile.bio ? "" : profile.profile.bio,
      twitter:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.twitter,
      youtube:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.youtube,
      instagram:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.instagram,
      linkedin:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.linkedin,
      facebook:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.facebook,
    });
  }, [profile.loading]);

  const {
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    instagram,
    youtube,
    linkedin,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createUpdateProfile(formData, true);
    console.log(formData);
    history.push("/viewprofile");
  };

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
        Edit Your Profile
      </h1>
      <p style={{ fontFamily: "Libre Franklin" }} className="lead">
        <i className="fa fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <h6>* = required field</h6>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <h4 style={{ fontFamily: "Libre Franklin" }}>
            <i className="fas fa-search-location mr-2" />
            Location
          </h4>
          <input
            type="text"
            placeholder="* Location"
            className="form-control"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <h6 style={{ fontFamily: "Space Grotesk" }} className="form-text">
            City $ state suggested (eg. Boston, MA,India)
          </h6>
        </div>
        <div className="form-group">
          <h4 style={{ fontFamily: "Libre Franklin" }}>
            <i className="fas fa-code-branch mr-2" />
            Skills
          </h4>
          <input
            type="text"
            placeholder="* Skills"
            className="form-control"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <h6 style={{ fontFamily: "Space Grotesk" }} className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </h6>
        </div>
        <div className="form-group">
          <h4 style={{ fontFamily: "Libre Franklin" }}>
            <i className="fab fa-github mr-2" />
            Github Username
          </h4>
          <input
            type="text"
            placeholder="Github Username"
            className="form-control"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <h6 style={{ fontFamily: "Space Grotesk" }} className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </h6>
        </div>
        <div className="form-group">
          <h4 style={{ fontFamily: "Libre Franklin" }}>
            <i className="fas fa-address-card mr-2" />
            Bio
          </h4>
          <textarea
            placeholder="A short bio of yourself"
            className="form-control"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <h6 style={{ fontFamily: "Space Grotesk" }} className="form-text">
            Tell us a little about yourself
          </h6>
        </div>

        <div className="my-2">
          <button
            onClick={() => setLinks(!links)}
            type="button"
            className="btn btn-danger"
            style={{ marginRight: "6px" }}
          >
            Edit Social Network Links
          </button>
          <span> Optional</span>
        </div>

        {links && (
          <Fragment>
            <div className="form-group social-input">
              <h4>
                <i className="fa fa-twitter mr-2"></i>
                Twitter
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <h4>
                <i className="fa fa-facebook mr-2"></i>
                Facebook
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <h4>
                <i className="fa fa-youtube mr-2"></i>
                Youtube
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <h4>
                <i className="fa fa-linkedin mr-2"></i>
                Linkedin
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <h4>
                <i className="fa fa-instagram mr-2"></i>
                Instagram
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input
          type="submit"
          value="Edit"
          className="btn btn-dark my-1 mb-3 btn-block"
        />
        <Link className="btn btn-light my-1 btn-block" to="/viewprofile">
          Go Back
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { createUpdateProfile, getMyProfile })(
  EditProfile
);
