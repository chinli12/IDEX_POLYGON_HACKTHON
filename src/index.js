import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import './style.css'
import Buy from './views/buy'
import Invest from './views/invest'
import Setting from './views/setting'
import Home from './views/home'
import Loging from './views/loging'
import Profile from './views/profile'

import Idexabi from './contractsData/IdexFactory.json'
import IdexAddress from './contractsData/IdexFactory-address.json'
import Idextokenabi from './contractsData/IdextokenFactory.json'
import IdextokenAddress from './contractsData/IdextokenFactory-address.json'
import xabi from './contractsData/usdt-xauto.json'
import abi from './contractsData/erc20.json'
import xusdtaddres from './contractsData/xd.json'
import usdtaddress from './contractsData/xd.json'
const App = () => {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})
  const [tokencontract, setTokencontract] = useState({})
  const [hasProfile, setHasProfile] = useState(false)
  const [name, setName] = useState(null)
  const [address, setAddress] = useState('')
  const [signer, setSigner] = useState('')
  const [usdtcontract, setUsdtcontract] = useState({})
  const [xusdtcontract, setXusdtcontract] = useState({})
  let history = useHistory()
  const web3Handler = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    setAccount(accounts[0])

    // Setup event listeners for metamask
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
    window.ethereum.on('accountsChanged', async () => {
      setLoading(true)
      web3Handler()
    })
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    const signer = provider.getSigner()
    loadContract(signer)
    setSigner(signer)
    console.log('signer', signer)
  }
  const loadContract = async (signer) => {
    // Get deployed copy of IDEX contract
    const contract = new ethers.Contract(
      IdexAddress.address,
      Idexabi.abi,
      signer
    )
    setContract(contract)
    console.log('main', contract)

    const contract2 = new ethers.Contract(
      IdextokenAddress.address,
      Idextokenabi.abi,
      signer
    )
    setTokencontract(contract2)
    setLoading(false)

    const contract3 = new ethers.Contract(
      xusdtaddres.xusdt.address,
      xabi,
      signer
    )
    setXusdtcontract(contract3)

    console.log('xusd', contract3)

    const contract4 = new ethers.Contract(usdtaddress.usdt.address, abi, signer)
    setUsdtcontract(contract4)
    console.log('usd', usdtcontract)
    //let address = await contract.signer.getAddress();
    //setAddress(address);
    const name = await contract.name()
    setName(name)
    let address = await contract.signer.getAddress()
    setAddress(address)
    console.log(address)
    // Check if user owns an nft
    // and if they do set profile to true
    const balance = await contract.balanceOf(address)
    setHasProfile(() => balance > 0)
  }

  return (
    <Router>
      <div>
        <Route component={Buy} exact path="/buy" />
        <Route
          component={() => (
            <Invest
              usdtcontract={usdtcontract}
              xusdtcontract={xusdtcontract}
              xusdtaddres={xusdtaddres}
              address={address}
              account={account}
            />
          )}
          exact
          path="/invest"
        />
        <Route
          component={() => (
            <Setting
              contract={contract}
              hasProfile={hasProfile}
              account={account}
              name={name}
              address={address}
            />
          )}
          exact
          path="/setting"
        />
        <Route
          component={() => (
            <Home
              contract={contract}
              tokencontract={tokencontract}
              hasProfile={hasProfile}
              account={account}
              address={address}
            />
          )}
          exact
          path="/home"
        />
        <Route
          component={() => (
            <Loging web3Handler={web3Handler} account={account} />
          )}
          exact
          path="/"
        />
        <Route
          component={() => <Profile contract={contract} address2={address} />}
          exact
          path="/profile/:id"
        />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
