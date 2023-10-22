import React from "react";
import "./leftbar.css";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import { Users } from "../../dummyData";
import Friend from "../friends/Friend";

const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <DynamicFeedRoundedIcon className="leftbarIcon" />
            <span className="leftbarListItemText">Feed</span>
          </li>
          <li className="leftbarListItem">
            <ChatBubbleRoundedIcon className="leftbarIcon" />
            <span className="leftbarListItemText">Chats</span>
          </li>
          <li className="leftbarListItem">
            <VideoLibraryRoundedIcon className="leftbarIcon" />
            <span className="leftbarListItemText">Videos</span>
          </li>
          <li className="leftbarListItem">
            <GroupAddRoundedIcon className="leftbarIcon" />
            <span className="leftbarListItemText">Groups</span>
          </li>
          <li className="leftbarListItem">
            <BookmarkRoundedIcon className="leftbarIcon" />
            <span className="leftbarListItemText">Bookmarks</span>
          </li>
          <li className="leftbarListItem">
            <HelpOutlineRoundedIcon className="leftbarIcon" />
            <span className="leftbarListItemText">Questions</span>
          </li>
          <li className="leftbarListItem">
            <WorkRoundedIcon className="leftbarIcon" />
            <span className="leftbarListItemText">Jobs</span>
          </li>
          <li className="leftbarListItem">
            <EventRoundedIcon className="leftbarIcon" />
            <span className="leftbarListItemText">Events</span>
          </li>
        </ul>
        <button className="leftbarButton">Show More</button>
        <hr className="leftbarHr" />
        {Users.map((u) => (
          <Friend key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
};

export default Leftbar;
