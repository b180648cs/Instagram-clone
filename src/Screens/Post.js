import React from "react";
import "../style/Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="Aditya" />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl}></img>

      <h4>
        <strong>{caption}</strong>
      </h4>
    </div>
  );
}

export default Post;
