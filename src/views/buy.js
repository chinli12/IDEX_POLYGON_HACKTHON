import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Header from "../components/header";
import EnterType from "../components/enter-type";
import SelectBank from "../components/select-bank";
import ComfirmOder from "../components/comfirm-oder";
import OderView from "../components/oder-view";
import "./buy.css";

const Buy = (props) => {
  const [next, setNet] = useState(0);
  const nextpage = (index) => {
    setNet(index);
  };
  const back = (index) => {
    if (index == 1) {
      setNet(0);
    }
    if (index == 2) {
      setNet(1);
    }
    if (index == 3) {
      setNet(2);
    }
    setNet(0);
  };
  return (
    <div className="buy-container">
      <Helmet>
        <title>Buy - IDEX</title>
        <meta property="og:title" content="Buy - Insidious Kind Oryx" />
      </Helmet>
      <Header
        Idex="IDEX"
        User_name="John dow"
        rootClassName="header-root-class-name2"
      ></Header>
      <div onClick={() => back(next)} className="buy-container1">
        <span className="buy-text">BACK</span>
      </div>
      <div className="buy-wrapper">
        {next == 0 ? (
          <EnterType
            nextpage={nextpage}
            rootClassName="enter-type-root-class-name"
          />
        ) : null}

        {next == 1 ? (
          <SelectBank
            nextpage={nextpage}
            rootClassName="select-bank-root-class-name"
          />
        ) : null}
        {next == 2 ? (
          <ComfirmOder
            nextpage={nextpage}
            rootClassName="comfirm-oder-root-class-name"
          />
        ) : null}
        {next == 3 ? <OderView nextpage={nextpage} /> : null}
      </div>
    </div>
  );
};

export default Buy;
