import React from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import PropTypes from "prop-types";

import "./postcard.css";

const Postcard = (props) => {
  const post = props.post;
  const ispostmoni = props.ispostmoni;
  const promoni = props.promoni;
  const address = props.address;
  const toggleModal = props.toggleModal;
  const setPostadree = props.setPostadree;
  const postadree = props.postadree;

  const handleClick = (userId) => {
    const re = setPostadree(userId);
    console.log(postadree);
    console.log(address);
    toggleModal();
  };

  return (
    <div className={`postcard-container ${props.rootClassName} `}>
      <div className="postcard-topwrapper">
        <div className="postcard-container1">
          <Link to="/profile" className="postcard-navlink">
            <img
              alt={props.image_alt}
              src={post.author.avatar}
              className="postcard-image"
            />
          </Link>
          <Link
            to={`/profile/${post.author.address}`}
            className="postcard-navlink1"
          >
            {post.author.username}
          </Link>
          {promoni &&
          address.toLowerCase() === post.author.address.toLowerCase() ? null : (
            <span
              onClick={() => handleClick(post.author.address)}
              className="postcard-text"
            >
              {props.text1}
            </span>
          )}
        </div>
      </div>
      <div className="postcard-contentwrapper">
        <span className="postcard-text1">{post.content}</span>
        <video src={post.video} controls className="postcard-video"></video>
      </div>
      <div className="postcard-footerwrapper">
        {ispostmoni ? (
          <>
            <span className="postcard-text2">
              {" "}
              {ethers.utils.formatEther(post.tipAmount)} MATC
            </span>
            {address.toLowerCase() ===
            post.author.address.toLowerCase() ? null : (
              <div className="postcard-tipwrapper">
                <svg viewBox="0 0 1024 1024" className="postcard-icon">
                  <path
                    d="M480 64c-265.096 0-480 214.904-480 480 0 265.098 214.904 480 480 480 265.098 0 480-214.902 480-480 0-265.096-214.902-480-480-480zM480 928c-212.078 0-384-171.922-384-384s171.922-384 384-384c212.078 0 384 171.922 384 384s-171.922 384-384 384zM512 512v-128h128v-64h-128v-64h-64v64h-128v256h128v128h-128v64h128v64h64v-64h128.002l-0.002-256h-128zM448 512h-64v-128h64v128zM576.002 704h-64.002v-128h64.002v128z"
                    className=""
                  ></path>
                </svg>
                <span className="postcard-text3">{props.text4}</span>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

Postcard.defaultProps = {
  image_src:
    "https://images.unsplash.com/photo-1668934804959-2cc138045bfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw5MTMyMXwwfDF8YWxsfDE1fHx8fHx8Mnx8MTY2OTA4NjAyOA&ixlib=rb-4.0.3&q=80&w=200",
  video_src: "",
  rootClassName: "",
  text3: "0.I MATC ($0.67)",
  text2: "Lorem I",
  text4: "Tip",
  image_alt: "image",
  text: "James dow",
  text1: "Support me to get free NFT",
};

Postcard.propTypes = {
  image_src: PropTypes.string,
  video_src: PropTypes.string,
  rootClassName: PropTypes.string,
  text3: PropTypes.string,
  text2: PropTypes.string,
  text4: PropTypes.string,
  image_alt: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
};

export default Postcard;
