import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./select-bank.css";

const SelectBank = (props) => {
  const nextpage = props.nextpage;
  return (
    <div className={`select-bank-select-bank ${props.rootClassName} `}>
      <span className="select-bank-text">{props.text}</span>
      <div className="select-bank-wrapperselectpayment">
        <select className="select-bank-select">
          <option value="NGN" className="">
            NGN
          </option>
          <option value="KES" className="">
            KES
          </option>
          <option value="GHC" className="">
            GHC
          </option>
        </select>
      </div>
      <span className="select-bank-text1">{props.text1}</span>
      <div className="select-bank-wrapperselectbank">
        <select className="select-bank-select1">
          <option value="Access Bank" className="">
            Access Bank
          </option>
          <option value="WNT" className="">
            Zenith Bank
          </option>
          <option value="USDT" className="">
            Guranty Trust Bank
          </option>
          <option value="USDC" className="">
            Citibank
          </option>
          <option value="New Option" className="">
            Ecobank
          </option>
        </select>
      </div>
      <span className="select-bank-text2">{props.text2}</span>
      <div className="select-bank-wrapperaccountnumber">
        <input
          type="text"
          required
          placeholder={props.textinput_placeholder}
          className="select-bank-textinput input"
        />
      </div>
      <span className="select-bank-text3">{props.text3}</span>
      <div className="select-bank-wrapperacountname">
        <input
          type="text"
          required
          placeholder={props.textinput_placeholder1}
          className="select-bank-textinput1 input"
        />
      </div>
      <span className="select-bank-text4">{props.text4}</span>
      <div className="select-bank-wrapperwallet">
        <input
          type="text"
          required
          placeholder={props.textinput_placeholder2}
          className="select-bank-textinput2 input"
        />
      </div>
      <button onClick={() => nextpage(2)} className="select-bank-button button">
        {props.button}
      </button>
    </div>
  );
};

SelectBank.defaultProps = {
  text1: "Select Bank",
  text4: "Wallet Adreass",
  text2: "Account Number",
  button: "Countinue",
  text: "Select Payment",
  rootClassName: "",
  textinput_placeholder2: "Wallet Adreass",
  textinput_placeholder: "Account Number",
  textinput_placeholder1: "Account Name",
  text3: "Account Name",
};

SelectBank.propTypes = {
  text1: PropTypes.string,
  text4: PropTypes.string,
  text2: PropTypes.string,
  button: PropTypes.string,
  text: PropTypes.string,
  rootClassName: PropTypes.string,
  textinput_placeholder2: PropTypes.string,
  textinput_placeholder: PropTypes.string,
  textinput_placeholder1: PropTypes.string,
  text3: PropTypes.string,
};

export default SelectBank;
