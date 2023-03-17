import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="contact">
                Contact
              </Link>
            </li>
          </ul>
          <p className="text-center text-muted">&copy; 2022 Meteor JS, Inc</p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
