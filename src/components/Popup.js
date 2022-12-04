import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./popup.css";

const AppComponent = (props) => {
  const [url, setUrl] = useState("");

  const modal = props.modal;
  const younft = props.younft;
  const toggleModal = props.toggleModal;
  const support = props.support;
  const nft = props.nft;
  const fetchurl = async () => {
    const result = await fetch(nft);
    const nftmy = result.json();
    let nfts = {
      avater: nftmy.picture,
    };
    setUrl(nfts);
  };
  useEffect(() => {
    fetchurl();
    console.log("this nf", url);
  }, []);

  return (
    <>
      {modal && (
        <div className="modal">
          <div className="modal-content">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="component-container">
              <span className="component-text">{props.Title}</span>
              <img
                alt={props.image_alt}
                src={nft}
                className="component-image"
              />
              <div className="component-container1">
                <button className="component-button button" onClick={support}>
                  {props.button}
                </button>
                <button
                  className="component-button1 button"
                  onClick={toggleModal}
                >
                  {props.button1}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AppComponent.defaultProps = {
  image_src:
    "https://images.unsplash.com/photo-1664575196044-195f135295df?ixid=Mnw5MTMyMXwxfDF8YWxsfDF8fHx8fHwyfHwxNjY5OTkzMzI1&ixlib=rb-4.0.3&w=1500",
  image_alt: "image",
  Title: "this is the NFT you get",
  button: "Support me",
  button1: "Close",
};

AppComponent.propTypes = {
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  Title: PropTypes.string,
  button: PropTypes.string,
  button1: PropTypes.string,
};

export default AppComponent;
