import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const ProfileItem = ({ profile }) => {
  return (
    // <div>
    <div
      style={{ backgroundColor: "#70e1f5", border: "2px solid black" }}
      className="profile myStyle"
    >
      <img
        src="https://www.flaticon.com/svg/static/icons/svg/21/21104.svg"
        alt=""
        className="round-img"
        // style={{ borderRadius: "50%" }}
      />
      <div>
        <h2
          style={{
            fontWeight: "700",
            fontSize: "30px",
            // fontFamily: "Architects Daughter",
            fontFamily: "Langar",
          }}
        >
          {" "}
          {profile.user.name}{" "}
        </h2>
        <p></p>
        <p className="my-1">
          {profile.location && (
            <span
              style={{
                fontWeight: "700",
                fontSize: "30px",
                fontFamily: "Architects Daughter",
              }}
            >
              Lives in {profile.location}{" "}
            </span>
          )}
        </p>
        <Link
          to={`/profile/${profile.user._id}`}
          className="btn btn-light btn-outline-danger"
        >
          View Profile
        </Link>
      </div>
      <ul>
        <h5
          style={{
            // fontFamily: "Architects Daughter",
            fontFamily: "Nerko One",

            fontWeight: "700",
            fontSize: "30px",
          }}
        >
          Top Skills
        </h5>
        {profile.skills.slice(0, 4).map((skill, index) => {
          return (
            <li
              key={index}
              className="text-primary"
              style={{ listStyle: "none", color: "black", fontSize: 20 }}
            >
              <i
                className="fa fa-check"
                style={{ color: "purple", marginRight: 10 }}
              />{" "}
              <span
                style={{
                  color: "wheat",
                  fontWeight: "bold",
                  fontFamily: "Cabin",
                }}
              >
                {skill}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileItem;
