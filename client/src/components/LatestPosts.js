import React, { Fragment } from "react";

const LatestPosts = () => {
  return (
    <Fragment>
      <div className="container" style={{ marginTop: "30px" }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "1000",
            fontFamily: "Architects Daughter",
          }}
        >
          Latest Posts
        </h1>
        <div
          class="card"
          style={{ width: "18rem", backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <div class="card-body">
            <h5 class="card-title" style={{ textAlign: "center" }}>
              Card title
            </h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LatestPosts;
