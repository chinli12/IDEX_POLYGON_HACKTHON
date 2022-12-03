import React from "react";

import PropTypes from "prop-types";

import "./nftcard.css";

const Nftcard = (props) => {
  const nft = props.nft;
  return (
    <div className="nftcard-nftcard">
      <img alt={nft.avatar} src={nft.avatar} className="nftcard-image" />
      <div className="nftcard-mainwrapper">
        <span className="nftcard-text">{props.text}</span>
      </div>
    </div>
  );
};

Nftcard.defaultProps = {
  image_alt: "image",
  image_src:
    "https://images.unsplash.com/photo-1669148495619-35a2c811d43b?ixid=Mnw5MTMyMXwwfDF8YWxsfDEzfHx8fHx8Mnx8MTY2OTIwNjY5Nw&ixlib=rb-4.0.3&w=1500",
  text: "Setprofile",
};

Nftcard.propTypes = {
  image_alt: PropTypes.string,
  image_src: PropTypes.string,
  text: PropTypes.string,
};

export default Nftcard;
