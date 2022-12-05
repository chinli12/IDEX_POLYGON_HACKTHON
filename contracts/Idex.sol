// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./PriceConverter.sol";
import "./IdexToken.sol";
error Unauthorized();
error mustownNft();
error youmonitezed();
error yocantfollowself();
error unfollowed();

error invalidpost();
error monitizationotenable();
error cantipyourownpost();
error addtipamount();
error youhavesupported();
error isnotmonitize();
error paymentfaild();

contract Idex is ERC721URIStorage {
    using PriceConverter for uint256;

    constructor() ERC721("IDEX", "Dex") {}

    uint256 tokenCount;
    uint256 postid;
    mapping(uint256 => Post) public Posts;
    mapping(address => uint256) public Profiles;
    mapping(address => Profile) public Profiled;
    mapping(uint256 => address) public PosTowner;
    mapping(uint256 => address) public SupportNftTowner;

    Post[] private allPosts;
    SupportNft[] private AllsupportNft;

    struct SupportNft {
        uint256 id;
        string TorkenUri;
        address payable owner;
    }

    struct Post {
        uint256 id;
        string hash;
        uint256 tipamount;
        address payable author;
        bool monitization;
        string nft;
    }
    struct Profile {
        uint256 id;
        address payable user;
        uint256[] followers;
        uint256[] following;
        string tokenURI;
        bool monitization;
        uint256 price;
        uint256 earning;
        uint256 idx;
    }
    event postcreated(
        uint256 id,
        string hash,
        uint256 tipamount,
        address payable author,
        bool monitization
    );
    event PostTiped(
        uint256 id,
        string hash,
        uint256 tipamount,
        address payable author
    );
    event followed(uint256 follower, uint256 following);

    function mint(string memory _tokenURI) external returns (uint256) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        Profile storage pr = Profiled[msg.sender];
        pr.id = tokenCount;
        pr.user = payable(msg.sender);

        setprofile(tokenCount);
        return (tokenCount);
    }

    function setprofile(uint256 _id) public {
        require(ownerOf(_id) == msg.sender, "must own nft to set profile");
        Profiles[msg.sender] = _id;
    }

    function follow(address _followingid, address _token) public payable {
        Profile storage pr = Profiled[_followingid];
        Profile storage fl = Profiled[msg.sender];
        uint256 price = pr.price * 1e8;
        //check if already followed
        bool _followed = isfollowed(_followingid);
        //check if is monitize
        bool _monitiz = ismontizeprofile(_followingid);
        if (msg.sender == _followingid) {
            revert yocantfollowself();
        }
        if (_followed == true) {
            revert youhavesupported();
        }

        if (_monitiz == true) {
            if (msg.value < price) {
                revert paymentfaild();
            }

            (bool sent, ) = _followingid.call{value: msg.value}("");
            if (!sent) {
                revert paymentfaild();
            }
            tokenCount++;
            pr.followers.push(fl.id);
            fl.following.push(pr.id);
            pr.earning += msg.value;
            Profiled[_followingid] = pr;

            _safeMint(msg.sender, tokenCount);
            _setTokenURI(tokenCount, pr.tokenURI);
            IdexToken idx = IdexToken(_token);
            idx.mint(msg.sender, 1 ether);
            fl.idx += price;

            SupportNft memory nft = SupportNft({
                id: tokenCount,
                TorkenUri: pr.tokenURI,
                owner: payable(msg.sender)
            });
            AllsupportNft.push(nft);
            SupportNftTowner[tokenCount] = msg.sender;
        } else {
            pr.followers.push(fl.id);
            fl.following.push(pr.id);
            Profiled[_followingid] = pr;
        }
    }

    /**function unfollow(address _followingid) public {
     Profile storage pr = Profiled[ _followingid];
     Profile storage fl =  Profiled[msg.sender];
     uint256 [] storage array = pr.followers;
     uint256 [] storage array2 = fl.following;
     // check if followed
     bool _followed = isfollowed( _followingid);
     if (_followed != true){
        revert unfollowed();
     }
     

      for(uint i = 0; i < array.length; i++){
          if(array[i]== fl.id){
              array.pop();
          }
      }
     for(uint i = 0; i < array2.length; i++){
          if(array2[i]== fl.id){
              array2.pop();
          }
      }
 }
****/
    function monitizeprofile(
        uint256 _price,
        string memory _TorkenUri
    ) external {
        Profile storage pr = Profiled[msg.sender];
        if (pr.monitization != false) {
            revert youmonitezed();
        }
        if (pr.user != msg.sender) {
            revert Unauthorized();
        }

        pr.monitization = true;
        pr.price = _price;
        pr.tokenURI = _TorkenUri;
        Profiled[msg.sender] = pr;
    }

    /**function unmonitizeprofile() public {
     
   Profile storage pr =  Profiled[msg.sender];
   if(pr.monitization != true){
       revert unmonitize();
   }
   pr.monitization = false;
   pr.price = 0;
   Profiled[msg.sender] = pr;
    
    
}
**/

    function monitizepost(uint256 _id) public {
        Post storage _Post = Posts[_id];
        _Post.monitization = true;
    }

    function craetepost(string memory _posthash, address id) external {
        Profile storage fl = Profiled[id];
        if (balanceOf(msg.sender) < 1) {
            revert mustownNft();
        }

        if (bytes(_posthash).length < 1) {
            revert mustownNft();
        }
        postid++;
        Post memory post = Post({
            id: postid,
            hash: _posthash,
            tipamount: 0,
            author: payable(msg.sender),
            monitization: false,
            nft: fl.tokenURI
            //id: allItems.length,
            //nameOfItem: _name,
            //typeofItem: _type,
            //value: _value
        });
        Posts[postid] = Post(
            postid,
            _posthash,
            0,
            payable(msg.sender),
            false,
            fl.tokenURI
        );
        allPosts.push(post);
        PosTowner[postid] = msg.sender;

        emit postcreated(postid, _posthash, 0, payable(msg.sender), false);
    }

    function tipownerpost(uint256 _id, address _token) external payable {
        if (_id < 0 && _id <= postid) {
            revert invalidpost();
        }

        bool _monitiz = ispostmonitiz(_id);
        if (_monitiz != true) {
            revert monitizationotenable();
        }

        if (_monitiz) {
            Post memory _Post = Posts[_id];
            if (_Post.author == msg.sender) {
                revert cantipyourownpost();
            }

            if (msg.value < 0) {
                revert addtipamount();
            }
            (bool sent, ) = _Post.author.call{value: msg.value}("");

            if (sent != true) {
                revert paymentfaild();
            }
            _Post.tipamount += msg.value;
            Posts[_id] = _Post;
            IdexToken idx = IdexToken(_token);
            idx.mint(msg.sender, 1 ether);
            Profile storage tp = Profiled[msg.sender];
            tp.idx += 1 ether;
            emit PostTiped(_id, _Post.hash, _Post.tipamount, _Post.author);
        }
    }

    /// view functions.........................

    function isfollowed(address _following) public view returns (bool) {
        Profile storage pr = Profiled[_following];
        Profile storage fl = Profiled[msg.sender];
        for (uint i = 0; i < pr.followers.length; i++) {
            if (pr.followers[i] == fl.id) {
                return true;
            }
        }

        return false;
    }

    function ispostmonitiz(uint256 _id) public view returns (bool) {
        Post storage _Post = Posts[_id];
        if (_Post.monitization == true) {
            return true;
        }
        return false;
    }

    function ismontizeprofile(address _profile) public view returns (bool) {
        Profile storage pr = Profiled[_profile];
        if (pr.monitization == true) {
            return true;
        }
        return false;
    }

    function getfollwerCount(
        address _profile
    ) public view returns (uint count) {
        Profile storage pr = Profiled[_profile];
        return pr.followers.length;
    }

    function getAllPosts() external view returns (Post[] memory _posts) {
        _posts = new Post[](postid);
        for (uint256 i = 0; i < _posts.length; i++) {
            _posts[i] = Posts[i + 1];
        }
    }

    // Fetches all of the users nfts
    function getMyNfts(
        address _add
    ) external view returns (uint256[] memory _ids) {
        _ids = new uint256[](balanceOf(_add));
        uint256 currentIndex;
        uint256 _tokenCount = tokenCount;
        for (uint256 i = 0; i < _tokenCount; i++) {
            if (ownerOf(i + 1) == _add) {
                _ids[currentIndex] = i + 1;
                currentIndex++;
            }
        }
    }

    function getsupportnft() public view returns (string memory nft) {
        Profile storage fl = Profiled[msg.sender];
        return fl.tokenURI;
    }

    function getconva(uint256 _idx) public view returns (uint) {
        uint256 amount;
        Post storage _Post = Posts[_idx];
        amount = _Post.tipamount;
        return amount.getConversionRate();
    }

    function getfollwingCount(
        address _profile
    ) public view returns (uint count) {
        Profile storage pr = Profiled[_profile];
        return pr.following.length;
    }
}
