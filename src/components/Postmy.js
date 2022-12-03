import React from "react";

import PropTypes from "prop-types";
import { useEffect } from "react";

import "./postmy.css";

const Postmy = (props) => {
  const post = props.post;
  const key = props.key;
  const contract = props.contract;

  const postmoni = async (id) => {
    let ismoni = false;
    ismoni = await contract.ispostmonitiz(id);
    if (ismoni) {
      console.log(ismoni);
    }
    const tx = await contract.monitizepost(id);
    tx.wait();
  };
  function che() {
    console.log(post.monitization);
  }
  useEffect(() => {
    che();
  });

  return (
    <div key={key} className="postmy-postmy">
      <div className="postmy-container">
        <img
          alt={props.image_alt}
          src={post.author.avatar}
          className="postmy-image"
        />
        <span className="postmy-text">{post.author.username}</span>
      </div>
      <video src={post.video} className="postmy-video" controls></video>
      <div className="postmy-container1">
        {post.monitization != true ? (
          <button onClick={() => postmoni(post.id)} className="button">
            {props.button}
          </button>
        ) : (
          <button
            className={`button btn2${
              post.monitization != true ? "moni" : null
            }`}
          >
            Monitized
          </button>
        )}
      </div>
    </div>
  );
};

Postmy.defaultProps = {
  video_src: "",
  image_src: "https://play.teleporthq.io/static/svg/default-img.svg",
  image_alt: "image",
  text: "Jounbus",
  button: "Monitize",
};

Postmy.propTypes = {
  video_src: PropTypes.string,
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  text: PropTypes.string,
  button: PropTypes.string,
};

export default Postmy;
