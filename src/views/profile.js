import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Helmet } from "react-helmet";

import Header from "../components/header";
import Tab from "../components/tab";

import "./profile.css";

const Profile = (props) => {
  const contract = props.contract;
  const idex = useLocation().pathname.split("/")[2];
  const address = idex.toString();
  const [profile, setProfile] = useState("");
  const [nfts, setNfts] = useState("");
  const [myprofile, setMyprofile] = useState("");
  const [Followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState("");
  const [mypost, setMypost] = useState("");
  const loadMyNFTs = async () => {
    // Get users nft ids
    console.log("addty", address);
    setLoading(true);

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
    const folowing = await contract.getfollwingCount(address);
    const follow = await contract.getfollwerCount(address);
    const f = parseInt(follow);

    // set following and followers
    setFollowers(f);
    setFollowing(parseInt(folowing));
    setMyprofile(pro);
  };
  const getProfile = async (nfts) => {
    const id = await contract.Profiles(address);
    const profile = nfts.find((i) => i.id.toString() === id.toString());
    setProfile(profile);
  };
  useEffect(() => {
    if (!nfts) {
      loadMyNFTs();
      loadMyprofile();
    }
  });
  const getmypost = (allpost, address) => {
    console.log(address);
    let mypost = [];
    for (let i = 0; i < allpost.length; i++) {
      console.log("thor:", allpost[i].author.address);
      if (allpost[i].author.address == address) {
        console.log(true);
        let post = {
          id: allpost[i].id,
          content: allpost[i].content,
          video: allpost[i].video,
          tipAmount: allpost[i].tipAmount,
          author: allpost[i].author,
          monitization: allpost[i].monitization,
          owner: true,
        };
        mypost.push(post);
        console.log(mypost);
      }
    }
    return mypost;
  };
  const loadPosts = async () => {
    // Get all posts
    let mypost = [];
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

        const nftId = await contract.Profiles(i.author);
        // get uri url of nft profile
        const uri = await contract.tokenURI(nftId);
        // fetch nft profile metadata
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
          author,
          monitization: i.monitization,
        };
        return post;
      })
    );
    posts = posts.sort((a, b) => b.tipAmount - a.tipAmount);
    // Sort posts from most tipped to least tipped.
    setPosts(getmypost(posts, address));

    setLoading(false);
  };
  useEffect(() => {
    if (!posts) {
      loadPosts();
    }
  });

  return (
    <div className="profile-container">
      <Helmet>
        <title>Profile -</title>
        <meta property="og:title" content="Profile - Insidious Kind Oryx" />
      </Helmet>
      <Header
        Idex="IDEX"
        address={address}
        User_name={!profile ? "" : profile.username}
        rootClassName="header-root-class-name"
      ></Header>
      <div className="profile-container1">
        <div className="profile-container2">
          <img alt="image" src={profile.avatar} className="profile-image" />
          <span className="profile-text">{profile.username}</span>
        </div>
        <div className="profile-container3">
          <span className="profile-text1">Supporting {following}</span>
          <span className="profile-text2">Supporter: {Followers}</span>
          <span className="profile-text3">post {posts.length}</span>
        </div>
        {myprofile.user == address ? (
          <Link to="/setting" className="profile-navlink">
            Setting
          </Link>
        ) : null}
      </div>
      <Tab
        posts={posts}
        address={address}
        nfts={nfts}
        contract={contract}
        rootClassName="tab-root-class-name"
      ></Tab>
    </div>
  );
};

export default Profile;
