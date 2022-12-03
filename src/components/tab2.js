import React from "react";

import Nftcard from "./nftcard";
import "./tab2.css";

const Tab2 = ({ nfts }) => {
  return (
    <div className="tab2-tab2">
      {nfts.map((nft, key) => {
        return <Nftcard nft={nft} key={key} />;
      })}
    </div>
  );
};

export default Tab2;
