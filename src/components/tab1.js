import React from "react";

import Postmy from "./Postmy";
import "./tab1.css";

const Tab1 = (props) => {
  const posts = props.posts;
  const contract = props.contract;
  return (
    <div className="tabb-tabb">
      {posts.length > 0 ? (
        posts.map((post, key) => {
          return (
            <div key={key}>
              <Postmy post={post} contract={contract} key={key} />
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

export default Tab1;
