import React from "react";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import images from "../image/images (2).png";

import "./sharebox.css";
const ipfsClient = require("ipfs-http-client");
const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const Sharebox = (props) => {
  const contract = props.contract;
  const loadPosts = props.loadPosts;
  const address = props.address;
  const [post, setPost] = useState("");
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const client = ipfsClient.create({
    host: "ipfs.infura.io:5001",
    port: 5001,
    protocol: "https",

    headers: {
      authorization: authorization,
    },
  });

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        setLoading(true);
        const result = await client.add(file);

        console.log(loading);
        setVideo(`https://polygonchinli.infura-ipfs.io/ipfs/${result.path}`);

        setLoading(false);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };
  const uploadPost = async (event) => {
    event.preventDefault();
    if (!video || !post) return;
    try {
      const result = await client.add(JSON.stringify({ video, post }));
      setLoading(true);

      let hash = result.path;
      await (await contract.craetepost(hash, address)).wait();
      setPost("");
      setVideo(null);
      setLoading(false);
      loadPosts();

      console.log(hash);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`sharebox-container ${props.rootClassName} `}>
      <form className="sharebox-form">
        <div className="sharebox-textwrapper">
          <img
            alt={props.image_alt}
            src={props.avater}
            className="sharebox-image"
          />
          <textarea
            placeholder={props.textarea_placeholder}
            className="sharebox-textarea textarea"
            onChange={(e) => setPost(e.target.value)}
            type="reset"
          ></textarea>
        </div>
        <div className="sharebox-footerwrapper">
          <input
            type="file"
            placeholder="Add profile picture"
            onChange={uploadToIPFS}
          />

          {loading ? (
            <button className="sharebox-button button" disabled={true}>
              loading...
            </button>
          ) : (
            <button className="sharebox-button button" onClick={uploadPost}>
              Share
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

Sharebox.defaultProps = {
  image_alt: "image",
  textarea_placeholder: "Share your idea",
  rootClassName: "",
  image_src:
    "https://images.unsplash.com/photo-1668934804959-2cc138045bfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw5MTMyMXwwfDF8YWxsfDE1fHx8fHx8Mnx8MTY2OTA4NjAyOA&ixlib=rb-4.0.3&q=80&w=200",
  button: "Share",
  textinput_placeholder: "placeholder",
};

Sharebox.propTypes = {
  image_alt: PropTypes.string,
  textarea_placeholder: PropTypes.string,
  rootClassName: PropTypes.string,
  image_src: PropTypes.string,
  button: PropTypes.string,
  textinput_placeholder: PropTypes.string,
};

export default Sharebox;
