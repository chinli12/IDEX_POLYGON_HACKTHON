import React from 'react'

import PropTypes from 'prop-types'

import './crypto.css'

const Crypto = (props) => {
  return (
    <div className={`crypto-crypto ${props.rootClassName} `}>
      <svg viewBox="0 0 1024 1024" className="crypto-icon">
        <path
          d="M480 64c-265.096 0-480 214.904-480 480 0 265.098 214.904 480 480 480 265.098 0 480-214.902 480-480 0-265.096-214.902-480-480-480zM480 928c-212.078 0-384-171.922-384-384s171.922-384 384-384c212.078 0 384 171.922 384 384s-171.922 384-384 384zM512 512v-128h128v-64h-128v-64h-64v64h-128v256h128v128h-128v64h128v64h64v-64h128.002l-0.002-256h-128zM448 512h-64v-128h64v128zM576.002 704h-64.002v-128h64.002v128z"
          className=""
        ></path>
      </svg>
      <h3 className="crypto-text">{props.heading}</h3>
    </div>
  )
}

Crypto.defaultProps = {
  rootClassName: '',
  heading: 'Buy/sell crypto',
}

Crypto.propTypes = {
  rootClassName: PropTypes.string,
  heading: PropTypes.string,
}

export default Crypto
