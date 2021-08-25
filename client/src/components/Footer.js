import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        opacity: "0.6",
        marginTop: "40px",
        fontFamily: "Titillium Web",
      }}
    >
      <footer class="page-footer font-small blue pt-4 mb-0">
        <div class="container-fluid text-center text-md-left">
          <div class="row">
            <div
              style={{
                color: "white",
                fontSize: "40px",
                textAlign: "center",
                marginTop: "30px",
              }}
              class="col-md-6 mt-md-0 mt-3"
            >
              <h5 class="text-uppercase">Blogger</h5>
              <p>See the latest blogs by bloggers...</p>
            </div>

            <hr class="clearfix w-100 d-md-none pb-3" />

            <div class="col-md-3 mb-md-0">
              <h5
                style={{ color: "white", textAlign: "center" }}
                class="text-uppercase"
              >
                Links
              </h5>

              <ul style={{ textAlign: "center" }} class="list-unstyled">
                <li>
                  <a href="#!">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    {" "}
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    {" "}
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    {" "}
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-md-3 mb-md-0">
              <h5
                style={{ color: "white", textAlign: "center" }}
                class="text-uppercase"
              >
                Links
              </h5>

              <ul style={{ textAlign: "center" }} class="list-unstyled">
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="#!">All Posts</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{ color: "white" }}
          class="footer-copyright text-center py-3"
        >
          © 2020 Copyright:
          <a href="https://google.com/"> Blogger.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
