import React from 'react'
import './friend.css'

const Friend = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <ul className="leftbarFriendList">
          <li className="leftbarFriend">
            <img
             src={PF+user.profilePicture}
              alt=""
              className="leftbarFriendImg"
            />
            <span className="leftbarFriendName">{user.username}</span>
          </li>
        </ul>
  )
}

export default Friend