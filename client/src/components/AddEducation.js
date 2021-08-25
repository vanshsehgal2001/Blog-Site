import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEducation } from "../actions/profile";
import { useHistory } from "react-router-dom";
import { setAlert } from "../actions/alert";

const AddEducation = ({ addEducation, setAlert }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const history = useHistory();

  const [currentReq, setCurrentReq] = useState(false);

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData);
    console.log(formData);
    setAlert("Education successfully added!!", "success");
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
          Add Education
        </h1>
        <p style={{ fontFamily: "Libre Franklin" }} className="lead">
          <i className="fas fa-university"></i> Add any school/college u
          attended
        </p>
        <h6>* = required field</h6>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-graduation-cap mr-2" />
              School
            </h4>
            <input
              type="text"
              placeholder="* School"
              name="school"
              required
              value={school}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-stamp mr-2" />
              Degree
            </h4>
            <input
              type="text"
              placeholder="* Degree"
              name="degree"
              required
              value={degree}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4 style={{ fontFamily: "Libre Franklin" }}>
              <i className="fas fa-user-graduate mr-2" />
              Field Of Study
            </h4>
            <input
              type="text"
              placeholder="Field Of Study"
              name="fieldOfStudy"
              value={fieldOfStudy}
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

export default connect(null, { addEducation, setAlert })(AddEducation);
