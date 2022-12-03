import React from 'react'

import PropTypes from 'prop-types'

import './cryptomobile.css'

const Cryptomobile = (props) => {
  return (
    <div className={`cryptomobile-container ${props.rootClassName} `}>
      <svg viewBox="0 0 1024 1024" className="cryptomobile-icon">
        <path
          d="M480 64c-265.096 0-480 214.904-480 480 0 265.098 214.904 480 480 480 265.098 0 480-214.902 480-480 0-265.096-214.902-480-480-480zM480 928c-212.078 0-384-171.922-384-384s171.922-384 384-384c212.078 0 384 171.922 384 384s-171.922 384-384 384zM512 512v-128h128v-64h-128v-64h-64v64h-128v256h128v128h-128v64h128v64h64v-64h128.002l-0.002-256h-128zM448 512h-64v-128h64v128zM576.002 704h-64.002v-128h64.002v128z"
          className=""
        ></path>
      </svg>
      <h4 className="cryptomobile-text">{props.heading}</h4>
    </div>
  )
}

Cryptomobile.defaultProps = {
  heading: 'Buy/sell',
  rootClassName: '',
}

Cryptomobile.propTypes = {
  heading: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Cryptomobile
