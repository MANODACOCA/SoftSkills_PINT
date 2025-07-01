import { useState } from "react";
import { FaHeart } from "react-icons/fa";

function Comment({ avatar, name, time, text, likes }) {
  const [liked, setLiked] = useState(false);
  const handleLike = () => setLiked(!liked);

  return (
    <div className="comment d-flex gap-3 mb-3">
      <img src={avatar} alt={`${name} avatar`} className="comment-avatar" />
      <div className="comment-body flex-grow-1">
        <div className="comment-header d-flex align-items-center gap-2">
          <strong>{name}</strong>
          <small className="text-muted">{time}</small>
        </div>
        <p className="comment-text">{text}</p>
        <button
          onClick={handleLike}
          className={`btn btn-sm btn-outline-danger comment-like-btn ${liked ? "liked" : ""}`}
        >
          <FaHeart className="me-1" />
          {likes + (liked ? 1 : 0)}
        </button>
      </div>
    </div>
  );
}
