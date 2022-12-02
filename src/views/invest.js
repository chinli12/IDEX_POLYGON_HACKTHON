import React from 'react'
import { ethers } from 'ethers'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from '../components/header'
import './invest.css'

const Invest = ({
  xusdtcontract,
  usdtcontract,
  xusdtaddres,
  address,

  account,
}) => {
  const [amount, setAmount] = useState('')

  const estimateGasFee = async () => {
    try {
      const res = await axios.get('https://gasstation-mainnet.matic.network/v2')
      return ethers.utils.parseUnits(
        String(parseInt(res.data?.fast?.maxFee || '0', 10)),
        'gwei'
      )
    } catch (e) {
      console.error(e)
      return 0
    }
  }

  const deposit = async (amount) => {
    try {
      console.log('add', xusdtcontract.address)
      console.log('add2', usdtcontract)
      const convertedAmount = ethers.utils.parseUnits(amount, 'mwei')

      const approvalGasEstimate = await estimateGasFee()
      const approved = await usdtcontract.approve(
        xusdtaddres.xusdt.address,
        convertedAmount,
        {
          from: address,
          gasPrice: approvalGasEstimate,
        }
      )
      if (approved) {
        const depositGasEstimate = await estimateGasFee()
        const deposited = await xusdtcontract.deposit(convertedAmount, {
          from: address,
          gasPrice: depositGasEstimate,
        })

        if (deposited) {
          setAmount('')
          savingsBalance(xusdtcontract.address)
          return true
          console
        }
      }
      return false.log('yes')
    } catch (e) {
      console.error(e)
      return null
    }
  }

  const withdraw = async (amount, address) => {
    try {
      const sharePrice = await xusdtcontract.getPricePerFullShare()
      const withdrawAmountInShares = (amount * 10 ** 24) / sharePrice

      const withdrawGasEstimate = await estimateGasFee()
      const w = await xusdtcontract.withdraw(
        parseInt(String(withdrawAmountInShares), 10),
        {
          from: address,
          gasPrice: withdrawGasEstimate,
        }
      )
      savingsBalance(address)
      console.log('pol')

      console.log(w)
      if (w) {
        return true
      }
      return false
    } catch (e) {
      console.error(e)
      return false
    }
  }
  const walletBalance = async (address) => {
    try {
      const usdtBalance = await usdtcontract.balanceOf(address)
      return ethers.utils.formatUnits(usdtBalance, 'mwei')
    } catch (e) {
      console.error(e)
      return 0
    }
  }
  const savingsBalance = async (address) => {
    try {
      const share = await xusdtcontract.balanceOf(address)
      const sharePrice = await xusdtcontract.getPricePerFullShare()

      return (share * sharePrice) / 10 ** 24
    } catch (e) {
      console.error({ e })
      return 0
    }
  }
  useEffect(() => {
    savingsBalance(address)
    walletBalance(address)
  }, [])

  if (!account) {
    return <Redirect to="/" />
  }

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
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="invest-container1">
              <button
                onClick={() => deposit(amount)}
                className="invest-button button"
              >
                Deposit
              </button>
              <button className="invest-button1 button">Save</button>
            </div>
          </div>
          <div className="invest-wrapperwithdraw">
            <span className="invest-text5">Withdraw</span>
            <input
              type="number"
              placeholder="Enter Amount"
              className="invest-textinput1 input"
              onChange={(e) => setAmount(e.target.value)}
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
