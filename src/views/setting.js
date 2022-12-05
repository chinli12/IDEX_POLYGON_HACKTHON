import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import images from "../image/images (2).png";
import "./setting.css";
import Header from "../components/header";
const ipfsClient = require("ipfs-http-client");
const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const Setting = ({ contract, address, name, account }) => {
  const [profile, setProfile] = useState("");
  const [nfts, setNfts] = useState("");
  const [nftsupt, setNftsupt] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [nftprice, setNftprice] = useState("");
  const [monitize, setMonitize] = useState(false);

  const client = ipfsClient.create({
    host: "ipfs.infura.io:5001",
    port: 5001,
    protocol: "https",

    headers: {
      authorization: authorization,
    },
  });

  const loadMyNFTs = async () => {
    // Get users nft ids
    const ismonitize = await contract.ismontizeprofile(address);
    setMonitize(ismonitize);
    const results = await contract.getMyNfts(address);
    // Fetch metadata of each nft and add that to nft object.
    let nfts = await Promise.all(
      results.map(async (i) => {
        // get uri url of nft
        const uri = await contract.tokenURI(i);
        // fetch nft metadata
        const response = await fetch(uri);
        const metadata = await response.json();
        return {
          id: i,
          username: metadata.username,
          avatar: metadata.avatar,
        };
      })
    );
    setNfts(nfts);
    getProfile(nfts);
  };

  const loadNFTs = async () => {
    // Get users nft ids
    const results = await contract.getsupportnft();
    console.log("this resul:", { results });
    const response = await fetch(results);
    // Fetch metadata of each nft and add that to nft object.

    setNftsupt(response.picture);
    setNftprice(response.price);
    console.log(response.avatar);
  };
  const getProfile = async (nfts) => {
    const address = await contract.signer.getAddress();

    const id = await contract.Profiles(address);
    const profile = nfts.find((i) => i.id.toString() === id.toString());
    setProfile(profile);
    setLoading(false);
  };
  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);

        setAvatar(`https://polygonchinli.infura-ipfs.io/ipfs/${result.path}`);
        console.log(result);

        console.log("this a:", avatar);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const uploadToIPFS2 = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(typeof file);
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);

        setPicture(result.path);
        console.log(result.path);

        console.log("this a:", picture);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };
  const mintProfile = async (event) => {
    event.preventDefault();
    if (!avatar || !username) return;
    try {
      const result = await client.add(JSON.stringify({ avatar, username }));
      setLoading(true);
      await (
        await contract.mint(
          `https://polygonchinli.infura-ipfs.io/ipfs/${result.path}`
        )
      ).wait();
      loadMyNFTs();

      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const montProfile = async (event) => {
    event.preventDefault();
    if (!picture || !price) return;
    try {
      setLoading(true);

      console.log(price);
      console.log(picture);

      await (
        await contract.monitizeprofile(
          price,
          `https://polygonchinli.infura-ipfs.io/ipfs/${picture}`
        )
      ).wait();
      loadNFTs();
      setLoading(false);
      console.log(txt);
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const switchProfile = async (nft) => {
    setLoading(true);
    await (await contract.setprofile(nft.id)).wait();
    getProfile(nfts);
  };
  useEffect(() => {
    if (!nfts) {
      loadMyNFTs();
      loadNFTs();
    }
  });
  if (!account) {
    return <Redirect to="/" />;
  }
  if (loading)
    return (
      <div className="container">
        <h4>Transaction goin</h4>
        <div className="wrapper">
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <div className="loader">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="setting-container">
      <Helmet>
        <title>Setting - IDEX</title>
        <meta property="og:title" content="Setting - Insidious Kind Oryx" />
      </Helmet>
      <Header
        Idex={name}
        User_name={!profile ? "" : profile.username}
        rootClassName="header-root-class-name"
      ></Header>
      {!profile ? (
        <div className="setting-container1">
          <span className="setting-text">You dont have any profile </span>
        </div>
      ) : (
        <div className="setting-container2">
          <img alt="image" src={profile.avatar} className="setting-image" />
          <div className="setting-container3">
            <div className="setting-container4">
              <span className="setting-text1">{profile.username}</span>
            </div>
          </div>
        </div>
      )}

      <form
        enctype="multipart/form-data"
        onSubmit={mintProfile}
        className="setting-form"
      >
        <div className="setting-container5">
          <span className="setting-text2">Profile Image</span>
          <input
            type="file"
            className="setting-textinput input"
            onChange={uploadToIPFS}
          />

          <input
            type="text"
            name="Username"
            placeholder="Username"
            className="setting-textinput1 input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="setting-button button">Setprofile</button>
        </div>
      </form>
      <h2 className="setting-text3">Monitize your profile to earn </h2>
      {!monitize ? (
        <div className="setting-container1">
          <span className="setting-text">enable monitize </span>
        </div>
      ) : (
        <div className="setting-container2">
          <img alt="image" src={nftsupt} className="setting-image" />
          <div className="setting-container3">
            <div className="setting-container4">
              <span className="setting-text1">{nftprice} USD</span>
            </div>
          </div>
        </div>
      )}

      <form
        enctype="multipart/form-data"
        className="setting-form1"
        onSubmit={montProfile}
      >
        <div className="setting-container6">
          <span className="setting-text4">NFT IMAGE</span>
          <input
            type="file"
            id="f02"
            className="setting-textinput2 input"
            onChange={uploadToIPFS2}
          />
          <span className="setting-text5">Price</span>
          <input
            type="number"
            name="Price"
            placeholder="Price in Usd"
            className="setting-textinput3 input"
            onChange={(e) => setPrice(e.target.value)}
          />
          <button className="setting-button1 button">Monitize</button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
