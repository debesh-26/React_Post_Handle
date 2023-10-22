import React, { useContext, useRef, useState } from "react";
import "./share.css";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ClearIcon from "@mui/icons-material/Clear";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axiosInstance.post("/upload", data);
      } catch (e) {
        console.log(e);
      }
    }
    try {
      await axiosInstance.post("/posts", newPost);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + `person/${user.profilePicture}`
                : PF + "person/noAvtar.png"
            }
            alt=""
          />
          <input
            placeholder={"Say something " + user.username}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <ClearIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PhotoLibraryIcon className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <div className="shareOption">
              <LabelIcon className="shareIcon2" />
              <span className="shareOptionText">Photo/Video</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon className="shareIcon3" />
              <span className="shareOptionText">Photo/Video</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon className="shareIcon4" />
              <span className="shareOptionText">Photo/Video</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
