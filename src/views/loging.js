import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./loging.css";

const Loging = ({ web3Handler, account }) => {
  if (account) {
    return <Redirect to="home" />;
  }
  return (
    <div className="loging-container">
      <Helmet>
        <title>IDEX</title>
        <meta
          property="og:title"
          content="the best place to share your ideas"
        />
      </Helmet>
      <div className="loging-mainwrapper">
        <div className="loging-leftwrapper">
          <h1 className="loging-text">IDEX</h1>
          <span className="loging-text1">
                  Share your idea and get a reward
          </span>
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDJ8fGlkZWF8ZW58MHx8fHwxNjY5NDU2NDIz&amp;ixlib=rb-4.0.3&amp;w=1500"
            className="loging-image"
          />
        </div>
        <div className="loging-rightwrapper">
          <button className="loging-button button" onClick={web3Handler}>
            Connect your wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loging;
