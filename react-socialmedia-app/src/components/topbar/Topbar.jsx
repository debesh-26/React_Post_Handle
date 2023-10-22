import "./topbar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Link, useNavigate } from "react-router-dom";
import BasicMenu from "../Basicmenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config";

const Topbar = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [friendsList, setFriendsList] = useState();
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(`/users?username=${searchTerm}`);
        setFriendsList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [searchTerm]);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="logo">Social Media</div>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchRoundedIcon className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={handleSearch}
            onKeyDown={(event) => {
              console.log(friendsList?.username);
              if (event.key === "Enter") {
                if (friendsList?.username)
                  navigate(`/profile/${friendsList?.username}`);
                else {
                  toast("Username Not Found");
                }
              }
            }}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span
            className="topbarLink"
            onClick={() => {
              navigate("/");
            }}
          >
            Homepage
          </span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonRoundedIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatBubbleRoundedIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsRoundedIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        {/* <Link to={`/profile/${user.username}`}> */}
        <BasicMenu />
        {/* <img
            src={
              user.profilePicture
                ? PF + `person/${user.profilePicture}`
                : PF + "person/noAvtar.png"
            }
            alt=""
            className="topbarImg"
          /> */}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Topbar;
