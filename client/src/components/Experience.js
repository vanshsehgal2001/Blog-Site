import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteExperience } from "../actions/profile";

const Experience = ({
  experience: { company, from, location, to, title, current, _id },
  deleteExperience,
}) => {
  return (
    <tbody
      style={{
        fontFamily: "Texturina",
        fontWeight: "1000",
        fontSize: "20px",
        textAlign: "center",
      }}
    >
      <tr>
        {/* <th scope="row"> {title} </th> */}
        <td> {title} </td>
        <td> {company} </td>
        <td> {location} </td>
        <td>
          {" "}
          <Moment format="DD/MM/YYYY">{from}</Moment>{" "}
        </td>
        <td>
          {" "}
          {current === false ? (
            <Fragment>
              {" "}
              <Moment format="DD/MM/YYYY">{to}</Moment>{" "}
            </Fragment>
          ) : (
            <Fragment> --- </Fragment>
          )}{" "}
        </td>
        <td>
          {" "}
          {current === true ? (
            <Fragment> Yes </Fragment>
          ) : (
            <Fragment> --- </Fragment>
          )}{" "}
        </td>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "5px",
          }}
        >
          <button
            onClick={() => deleteExperience(_id)}
            className="btn btn-danger"
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </tr>
    </tbody>
  );
};

export default connect(null, { deleteExperience })(Experience);
