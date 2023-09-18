import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateValue } from "../../context/StateProvider";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/comments.action";
import Comment from "../comment/Comment";
import "./_comments.scss";
const Comments = ({ videoId, totalComments }) => {
  const dispatchs = useDispatch();
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    dispatchs(getCommentsOfVideoById(videoId));
  }, [videoId, dispatchs]);

  const comments = useSelector((state) => state.commentList.comments);
  // const { photoURL } = useSelector(state => state.auth?.user)

  const [text, setText] = useState("");

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;

    dispatchs(addComment(videoId, text));

    setText("");
  };

  // width: 50px;
  // height: 50px;
  // object-fit: contain;
  // background: transparent;
  // border: none;
  // border-bottom: 2px solid #353946;
  // color: #fff;
  // &:focus {
  //    outline: none;
  // }

  // background-color: #353946;
  //     color: #fff;
  //     letter-spacing: 0.5px;
  //     &:focus {
  //        border: none;
  //        outline: none;
  //     }

  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="my-2  d-flex w-100">
        <img
          src={user?.data.imageURL}
          alt="avatar"
          className="mr-3 w-[50px] h-[50px] object-contain rounded-full"
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1 focus:outline-none border-b-2 border-[##353946] text-[#fff] bg-transparent"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="ml-3 p-2 border-0 bg-[#353946] text-[#fff] tracking-wide focus:border-none focus:outline-none">
            Comment
          </button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
