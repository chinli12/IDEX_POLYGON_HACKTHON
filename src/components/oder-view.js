import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./oder-view.css";

const OderView = (props) => {
  const nextpage = props.nextpage;
  return (
    <div className="oder-view-oder-view">
      <div className="oder-view-container">
        <div className="oder-view-container01">
          <span className="oder-view-text">{props.text4}</span>
          <h1 className="oder-view-text01">{props.heading}</h1>
        </div>
        <div className="oder-view-container02">
          <span className="oder-view-text02">{props.text5}</span>
          <h1 className="oder-view-text03">{props.heading1}</h1>
        </div>
      </div>
      <div className="oder-view-container03">
        <span className="oder-view-text04">{props.text}</span>
      </div>
      <div className="oder-view-container04">
        <span className="oder-view-text05">{props.text1}</span>
        <div className="oder-view-container05">
          <span className="oder-view-text06">{props.text6}</span>
        </div>
        <div className="oder-view-container06">
          <div className="oder-view-container07">
            <span className="oder-view-text07">{props.text7}</span>
            <span className="oder-view-text08">{props.text8}</span>
            <span className="oder-view-text09">{props.text9}</span>
            <span className="oder-view-text10">{props.text10}</span>
          </div>
          <div className="oder-view-container08">
            <span className="oder-view-text11">{props.text11}</span>
            <span className="oder-view-text12">{props.text12}</span>
            <span className="oder-view-text13">{props.text13}</span>
            <span className="oder-view-text14">{props.text14}</span>
          </div>
        </div>
      </div>
      <div className="oder-view-container09">
        <span className="oder-view-text15">{props.text2}</span>
        <span className="oder-view-text16">{props.text3}</span>
      </div>
      <div className="oder-view-container10">
        <button onClick={() => nextpage(3)} className="oder-view-button button">
          {props.button}
        </button>
      </div>
    </div>
  );
};

OderView.defaultProps = {
  text13: "Reference",
  text9: "Account Number",
  text2: "Time remaining: 00:00",
  text12: "Ezechinyere Ogochukwu ",
  heading1: "20,000 NG",
  text7: "Bank",
  text8: "Fidelity",
  text10: "6318270866",
  text14: "XB_fed1bfe2d89a4a99a6f42bedf760f192",
  text5: "When you Pay",
  button: "I have made the transfer",
  text11: "Account Name",
  text: "1BUSD = 789NG",
  text1: "Send Money to the Merchant's Account details provided below.",
  heading: "20,000 NG",
  text6: "Bank",
  text4: "When you Pay",
  text3:
    "Please make a payment within 15:00 mins, otherwise, the order will be cancelled",
};

OderView.propTypes = {
  text13: PropTypes.string,
  text9: PropTypes.string,
  text2: PropTypes.string,
  text12: PropTypes.string,
  heading1: PropTypes.string,
  text7: PropTypes.string,
  text8: PropTypes.string,
  text10: PropTypes.string,
  text14: PropTypes.string,
  text5: PropTypes.string,
  button: PropTypes.string,
  text11: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  heading: PropTypes.string,
  text6: PropTypes.string,
  text4: PropTypes.string,
  text3: PropTypes.string,
};

export default OderView;
