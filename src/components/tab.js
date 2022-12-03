import React from "react";
import TAB1 from "./tab1";
import TAB2 from "./tab2";
import { useState } from "react";
import PropTypes from "prop-types";

import "./tab.css";

const Tab = (props) => {
  const posts = props.posts;
  const [index, setIndex] = useState(0);

  return (
    <div className={`tab-container ${props.rootClassName} `}>
      <div className="tab-container1">
        <button
          className="tab-button button1 button active"
          onClick={() => setIndex(0)}
        >
          {props.button}
        </button>
        <button
          className="tab-button1 button1 button active"
          onClick={() => setIndex(1)}
        >
          {props.button1}
        </button>
      </div>
      <div className="tab-container2">
        {index == 0 ? <TAB1 posts={posts} /> : <TAB2 />}
      </div>
    </div>
  );
};

Tab.defaultProps = {
  rootClassName: "",
  button: "Post",
  button1: "NFT",
};

Tab.propTypes = {
  rootClassName: PropTypes.string,
  button: PropTypes.string,
  button1: PropTypes.string,
};

export default Tab;
