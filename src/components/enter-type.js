import React from 'react'

import PropTypes from 'prop-types'

import './enter-type.css'

const EnterType = (props) => {
  return (
    <div className={`enter-type-enter-type ${props.rootClassName} `}>
      <span className="enter-type-text">{props.text}</span>
      <div className="enter-type-wrapperyoupay">
        <input
          type="text"
          required
          placeholder={props.textinput_placeholder}
          className="enter-type-textinput input"
        />
        <select className="enter-type-select">
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
      <span className="enter-type-text1">{props.text1}</span>
      <div className="enter-type-wrapperyourecieve">
        <input
          type="text"
          required
          placeholder={props.textinput_placeholder1}
          className="enter-type-textinput1 input"
        />
        <select className="enter-type-select1">
          <option value="BUSD" className="">
            BUSD
          </option>
          <option value="WNT" className="">
            WNT
          </option>
          <option value="USDC" className="">
            USDC
          </option>
          <option value="USDT" className="">
            USDT
          </option>
        </select>
      </div>
      <button className="enter-type-button button">{props.button}</button>
    </div>
  )
}

EnterType.defaultProps = {
  button: 'Countinue',
  rootClassName: '',
  text1: 'You recieve',
  textinput_placeholder: 'Enter amount',
  textinput_placeholder1: 'Cypto Amount',
  text: 'You pay',
}

EnterType.propTypes = {
  button: PropTypes.string,
  rootClassName: PropTypes.string,
  text1: PropTypes.string,
  textinput_placeholder: PropTypes.string,
  textinput_placeholder1: PropTypes.string,
  text: PropTypes.string,
}

export default EnterType
