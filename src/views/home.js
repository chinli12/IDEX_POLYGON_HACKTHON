import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ethers, bigNumberify } from "ethers";

import Header from "../components/header";
import Crypto from "../components/crypto";
import Cryptomobile from "../components/cryptomobile";
import Sharebox from "../components/sharebox";
import Postcard from "../components/postcard";
import Popup from "../components/Popup";
import "./home.css";
import images from "../image/images (3).png";
const Home = ({ contract, tokencontract, hasProfile, account, address }) => {
  const [profile, setProfile] = useState("");
  const [nfts, setNfts] = useState("");
  const [posts, setPosts] = useState("");
  const [monitize, setMonitize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Followers, setFollowers] = useState(0);
  const [myprofile, setMyprofile] = useState("");
  const [ispostmoni, setIspostmoni] = useState(false);
  const [conversion, setConversion] = useState("");
  const [promoni, setPromoni] = useState(false);
  const [modal, setModal] = useState(false);
  const [postadree, setPostadree] = useState("");
  const [younft, setYounft] = useState("");

  const loadMyNFTs = async () => {
    // Get users nft ids

    console.log("you", younft);
    setLoading(true);
    const ismonitize = await contract.ismontizeprofile(address);
    setMonitize(ismonitize);
    console.log("monitzpro", monitize);
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
  const loadMyprofile = async () => {
    // Get users nft ids

    const pro = await contract.Profiled(address);
    const follow = await contract.getfollwerCount(address);
    const f = parseInt(follow);

    // Fetch metadata of each nft and add that to nft object.
    setFollowers(f);
    setMyprofile(pro);
  };
  const getProfile = async (nfts) => {
    const id = await contract.Profiles(address);
    const profile = nfts.find((i) => i.id.toString() === id.toString());
    setProfile(profile);
    setLoading(false);
  };
  useEffect(() => {
    if (!nfts) {
      loadMyNFTs();
      loadMyprofile();
    }
  });
  const loadPosts = async () => {
    // Get all posts
    let results = await contract.getAllPosts();
    // Fetch metadata of each post and add that to post object.

    let posts = await Promise.all(
      results.map(async (i) => {
        // use hash to fetch the post's metadata stored on ipfs
        let response = await fetch(
          `https://polygonchinli.infura-ipfs.io/ipfs/${i.hash}`
        );

        const metadataPost = await response.json();

        //post monitization
        const ispostmoni = await contract.ispostmonitiz(i.id);
        setIspostmoni(ispostmoni);
        //profile monitization
        const promoni = await contract.ismontizeprofile(i.author);
        setPromoni(promoni);
        // get authors nft profile
        // get conversion

        // fetch nft for post

        // fetch nft profile metadata
        const nftId = await contract.Profiles(i.author);
        // get uri url of nft profile
        const uri = await contract.tokenURI(nftId);

        response = await fetch(uri);
        const metadataProfile = await response.json();
        // define author object
        const author = {
          address: i.author,
          username: metadataProfile.username,
          avatar: metadataProfile.avatar,
          monitization: i.monitization,
          tokenURI: i.tokenURI,
        };
        // define post object
        let post = {
          id: i.id,
          content: metadataPost.post,
          video: metadataPost.video,
          tipAmount: i.tipamount,
          nft: i.nft,
          author,

          monitization: i.monitization,
        };
        return post;
      })
    );
    posts = posts.sort((a, b) => b.tipAmount - a.tipAmount);
    // Sort posts from most tipped to least tipped.
    setPosts(posts);
    setLoading(false);
  };
  useEffect(() => {
    if (!posts) {
      loadPosts();
    }
  });
  const support = async () => {
    const pro = await contract.Profiled(postadree);

    const price = pro.price;
    const pay = price.toString();
    console.log(pay);
    try {
      const suppo = await contract.follow(postadree, tokencontract.address, {
        value: ethers.utils.parseEther(pay),
      });
      suppo.wait();
      console.log(postadree);
    } catch (e) {
      console.log(e.massage);
      window.alert(e.data.message);
    }
  };
  const toggleModal = () => {
    setModal(!modal);
    console.log(postadree);
    console.log(younft);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const tip = async (post) => {
    // tip post owner
    console.log("tippin");
    await (
      await contract.tipownerpost(post.id, tokencontract.address, {
        value: ethers.utils.parseEther("0.1"),
      })
    ).wait();
    loadPosts();
  };
  if (!account) {
    return <Redirect to="/" />;
  }
  if (loading)
    return (
      <div className="container">
        <h4>Loading Please wait</h4>
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
    <div className="home-container">
      <Helmet>
        <title>Home - IDEX</title>
        <meta property="og:title" content="Home - Insidious Kind Oryx" />
      </Helmet>
      <Header
        Idex="IDEX"
        address={address}
        User_name={!profile ? "" : profile.username}
      ></Header>

      <div className="home-mainwrapper">
        <div className="home-wrapperleft">
          <Link to="/invest" className="home-navlink">
            <Crypto
              heading="Invest crypto"
              rootClassName="crypto-root-class-name"
              className="home-component1"
            ></Crypto>
          </Link>
          <Link to="/buy" className="home-navlink1">
            <Crypto
              heading="Buy/sell crypto"
              rootClassName="crypto-root-class-name"
              className="home-component2"
            ></Crypto>
          </Link>
        </div>
        <div className="home-wrappercenter">
          <div className="home-container1">
            <Link to="/buy">
              <Cryptomobile
                rootClassName="cryptomobile-root-class-name"
                className="home-component3"
              ></Cryptomobile>
            </Link>
            <Link to="/invest">
              <Cryptomobile
                heading="invest"
                rootClassName="cryptomobile-root-class-name"
                className="home-component4"
              ></Cryptomobile>
            </Link>
          </div>
          {profile ? (
            <Sharebox
              rootClassName="sharebox-root-class-name "
              avater={profile.avatar}
              contract={contract}
              loadPosts={loadPosts}
              address={address}
            ></Sharebox>
          ) : (
            <Link to="/setting" className="home-navlink4">
              you can not post click here to setup profile
            </Link>
          )}

          {posts.length > 0 ? (
            posts.map((post, key) => {
              return (
                <div idx={key}>
                  <Postcard
                    post={post}
                    key={key}
                    ispostmoni={ispostmoni}
                    promoni={promoni}
                    toggleModal={toggleModal}
                    setPostadree={setPostadree}
                    postadree={postadree}
                    address={address}
                    setYounft={setYounft}
                    contract={contract}
                    younft={younft}
                    tip={tip}
                    modal={modal}
                    support={support}
                    monitize={monitize}
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
        <div className="home-container1"></div>
        <div className="home-wrapperright">
          <div className="home-wrapperprofile">
            <div className="home-usercarrd">
              <img
                alt="image"
                src={!profile ? images : profile.avatar}
                className="home-image"
              />
              <span className="home-text">{""}</span>
            </div>
            <div className="home-profile-list">
              <span className="home-text1">Following</span>
              <span className="home-text2">Followers {Followers}</span>
              <span className="home-text3">post</span>
              <span className="home-text4">
                Idx ballance: {parseInt(myprofile.idx)}
              </span>
            </div>
            {profile ? (
              <Link to={`/profile/${address}`} className="home-navlink5 button">
                Profile
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
