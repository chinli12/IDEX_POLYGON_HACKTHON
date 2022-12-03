import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../components/header'
import './invest.css'

const Invest = (props) => {
  return (
    <div className="invest-container">
      <Helmet>
        <title>Invest - Insidious Kind Oryx</title>
        <meta property="og:title" content="Invest - Insidious Kind Oryx" />
      </Helmet>
      <Header
        Idex="IDEX"
        User_name="john dow"
        rootClassName="header-root-class-name3"
      ></Header>
      <div className="invest-mainwrapper">
        <div className="invest-topwrapper">
          <div className="invest-wrappersaved">
            <span className="invest-text">Saved Amount</span>
            <span className="invest-text1">45.09 USDT</span>
          </div>
          <div className="invest-wrapperavialable">
            <span className="invest-text2">Available for Saving</span>
            <span className="invest-text3">45.09 USDT</span>
          </div>
        </div>
        <div className="invest-wrappermain">
          <div className="invest-wrapperdeposit">
            <span className="invest-text4">Deposit</span>
            <input
              type="number"
              placeholder="Enter Amount"
              className="invest-textinput input"
            />
            <div className="invest-container1">
              <button className="invest-button button">Deposit</button>
              <button className="invest-button1 button">Save</button>
            </div>
          </div>
          <div className="invest-wrapperwithdraw">
            <span className="invest-text5">Withdraw</span>
            <input
              type="number"
              placeholder="Enter Amount"
              className="invest-textinput1 input"
            />
            <div className="invest-container2">
              <button className="invest-button2 button">Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invest
