import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./post.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDeletePost = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { userId: currentUser._id },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast("you can delete only your post");
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + `person/${user.profilePicture}`
                    : PF + "person/noAvtar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {<DeleteIcon onClick={handleDeletePost} />}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {post?.desc || "Please write something and upload"}
          </span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}heart.png`}
              alt=""
              onClick={likeHandler}
              className="postemoji"
            />
            <img
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
              className="postemoji"
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <CommentIcon className="postCommentIcon" />
            <span className="postCommentText">{user.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
