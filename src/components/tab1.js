import React from "react";

import PropTypes from "prop-types";

import Postcard from "./Postcardmi";
import "./tab1.css";

const Tab1 = (props) => {
  const posts = props.posts;
  return (
    <div className={`tab1-container ${props.rootClassName} `}>
      {posts.length > 0 ? (
        posts.map((post, key) => {
          return (
            <div key={key}>
              <Postcard
                post={post}
                key={key}
                ispostmoni={ispostmoni}
                promoni={promoni}
                toggleModal={toggleModal}
                setPostadree={setPostadree}
                postadree={postadree}
                address={address}
              />
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <main style={{ padding: "1rem 0" }}>
            <h2>No posts yet</h2>
          </main>
        </div>
      )}
    </div>
  );
};

Tab1.defaultProps = {
  rootClassName: "",
};

Tab1.propTypes = {
  rootClassName: PropTypes.string,
};

export default Tab1;
