import React from "react";

const About = () => {
  return (
    <div
      style={{ textAlign: "center", marginTop: "10px" }}
      className="container"
    >
      <h1 style={{ fontFamily: "Nunito", fontSize: "70px" }}>About</h1>
      <hr />
      <h2 style={{ fontFamily: "Texturina", lineHeight: "60px" }}>
        Website made for bloggers.
        <br />
        Bloggers can create their profile and then add posts and can like and
        comment on the post.
        <br />
        Secure site with Authentication....
      </h2>
    </div>
  );
};

export default About;
