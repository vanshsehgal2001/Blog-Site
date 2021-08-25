import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../actions/profile";

const Education = ({
  education: { school, from, degree, to, fieldOfStudy, current, _id },
  deleteEducation,
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
        <th scope="row"> {school} </th>
        <td> {degree} </td>
        <td> {fieldOfStudy} </td>
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
            onClick={() => deleteEducation(_id)}
            className="btn btn-danger"
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </tr>
    </tbody>
  );
};

export default connect(null, { deleteEducation })(Education);
