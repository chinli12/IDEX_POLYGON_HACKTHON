import React from 'react'

import PropTypes from 'prop-types'

import './comfirm-oder.css'

const ComfirmOder = (props) => {
  return (
    <div className={`comfirm-oder-comfirm-oder ${props.rootClassName} `}>
      <span className="comfirm-oder-text">{props.text}</span>
      <span className="comfirm-oder-text1">{props.text1}</span>
      <span className="comfirm-oder-text2">{props.text2}</span>
      <span className="comfirm-oder-text3">{props.text3}</span>
      <span className="comfirm-oder-text4">{props.text4}</span>
      <span className="comfirm-oder-text5">{props.text5}</span>
      <div className="comfirm-oder-wrapperadress"></div>
      <button className="comfirm-oder-button button">{props.button}</button>
    </div>
  )
}

ComfirmOder.defaultProps = {
  text2: 'You Recieve',
  text5: 'Recipient Address',
  text: 'When you Pay',
  text4: 'Best Rate 1 BSD = 780 NG',
  text3: '25.97 BUSD',
  text1: '20000 NG',
  button: 'Comfirm Oder',
  rootClassName: '',
}

ComfirmOder.propTypes = {
  text2: PropTypes.string,
  text5: PropTypes.string,
  text: PropTypes.string,
  text4: PropTypes.string,
  text3: PropTypes.string,
  text1: PropTypes.string,
  button: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default ComfirmOder
