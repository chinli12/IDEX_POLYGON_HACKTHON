import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../components/header'
import EnterType from '../components/enter-type'
import SelectBank from '../components/select-bank'
import ComfirmOder from '../components/comfirm-oder'
import OderView from '../components/oder-view'
import './buy.css'

const Buy = (props) => {
  return (
    <div className="buy-container">
      <Helmet>
        <title>Buy - Insidious Kind Oryx</title>
        <meta property="og:title" content="Buy - Insidious Kind Oryx" />
      </Helmet>
      <Header
        Idex="IDEX"
        User_name="John dow"
        rootClassName="header-root-class-name2"
      ></Header>
      <div className="buy-wrapper">
        <EnterType rootClassName="enter-type-root-class-name"></EnterType>
        <SelectBank rootClassName="select-bank-root-class-name"></SelectBank>
        <ComfirmOder rootClassName="comfirm-oder-root-class-name"></ComfirmOder>
        <OderView></OderView>
      </div>
    </div>
  )
}

export default Buy
