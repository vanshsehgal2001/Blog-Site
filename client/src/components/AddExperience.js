import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addExperience } from "../actions/profile";
import { useHistory } from "react-router-dom";
import { setAlert } from "../actions/alert";

const AddExperience = ({ addExperience, setAlert }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const history = useHistory();

  const [currentReq, setCurrentReq] = useState(false);

  const { title, company, location, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData);
    console.log(formData);
    setAlert("Experience successfully added", "success");
    history.push("/dashboard");
  };

  return (
    <Fragment>
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
          Add Experience
        </h1>
        <p style={{ fontFamily: "Libre Franklin" }} className="lead">
          <i className="fas fa-university"></i> Add any prior experiences
        </p>
        <h6>* = required field</h6>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-building mr-2" />
              Company
            </h4>
            <input
              type="text"
              placeholder="* Company"
              name="company"
              required
              value={company}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-book-open mr-2" />
              Title
            </h4>
            <input
              type="text"
              placeholder="* Title"
              name="title"
              required
              value={title}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-location-arrow mr-2" />
              Location
            </h4>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-calender-alt mr-2" />
              From
            </h4>
            <input
              type="date"
              name="from"
              value={from}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  setCurrentReq(!currentReq);
                }}
              />{" "}
              Currently going on
            </p>
          </div>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-calender-alt mr-2" />
              To
            </h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={(e) => onChange(e)}
              disabled={currentReq ? "disabled" : ""}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-file-word mr-2" />
              Description
            </h4>
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Description"
              value={description}
              onChange={(e) => onChange(e)}
              className="form-control"
            ></textarea>
          </div>
          <input
            type="submit"
            value="Add"
            className="btn btn-danger btn-outline-light my-1 mr-2"
          />
          <Link
            className="btn btn-light btn-outline-dark  my-1"
            to="/dashboard"
          >
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { setAlert, addExperience })(AddExperience);
