import "./topbar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Link, useNavigate } from "react-router-dom";
import BasicMenu from "../Basicmenu";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config";

const Topbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [friendsList, setFriendsList] = useState();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); 
  };

  const searchUser = async () => {
    if (!searchTerm.trim()) {
      toast("Please enter a valid username");
      return; 
    }
    try {
      const res = await axiosInstance.get(`/users?username=${searchTerm}`);
      setFriendsList(res.data);

      if (res.data?.username) {
        navigate(`/profile/${res.data.username}`);
      } else {
        toast("Username Not Found");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchUser(); 
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
        <BasicMenu />
      </div>
    </div>
  );
};

export default Topbar;
