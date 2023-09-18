import React from "react";
import moment from "moment";
import "./_comment.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
const Comment = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;

  //font-size: 0.9rem;
  //  border-bottom: 2px solid #353946;

  return (
    <div className="p-4 text-base border-b-2 border-b-[#353946] flex flex-col">
      <div className="overflow-hidden flex items-center mb-2">
        <img src={authorProfileImageUrl} alt="" className="mr-3 rounded-full" />
        <p className="mb-1 text-[#fff]">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
      </div>
      <div>
        <p className="mb-0">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
