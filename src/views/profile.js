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
        console.log(uri);
        const response = await fetch(uri);
        const metadata = await response.json();
        console.log(metadata);
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
    console.log(pro);
    console.log(f);
    console.log("mypro:", pro);
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
  const loadPosts = async () => {
    // Get all posts
    let results = await contract.getMypost();
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
        };
        // define post object
        let post = {
          id: i.id,
          content: metadataPost.post,
          video: metadataPost.video,
          tipAmount: i.tipamount,
          author,
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
          <span className="profile-text1">Following {following}</span>
          <span className="profile-text2">Followers: {Followers}</span>
          <span className="profile-text3">post 12</span>
        </div>
        {myprofile.user == address ? (
          <Link to="/setting" className="profile-navlink">
            Setting
          </Link>
        ) : null}
      </div>
      <Tab posts={posts} rootClassName="tab-root-class-name"></Tab>
    </div>
  );
};

export default Profile;
