import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import "./header.css";

const Header = (props) => {
  return (
    <header className={`header-header ${props.rootClassName} `}>
      <Link to="/home" className="header-navlink">
        {props.Idex}
      </Link>
      <Link to={`/profile/${props.address}`}>
        <span className="header-text">{props.User_name}</span>
      </Link>
    </header>
  );
};

Header.defaultProps = {
  Idex1: "https://example.com",
  rootClassName: "",
  User_name: "User_name",
  Idex: "Link",
};

Header.propTypes = {
  Idex1: PropTypes.string,
  rootClassName: PropTypes.string,
  User_name: PropTypes.string,
  Idex: PropTypes.string,
};

export default Header;
