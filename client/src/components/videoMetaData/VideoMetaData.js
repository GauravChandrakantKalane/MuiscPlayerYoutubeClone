import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import moment from "moment";
import numeral from "numeral";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";
import HelmetCustom from "../HelmetCustom";
const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const dispatch = useDispatch();

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  return (
    <div className="py-2 videoMetaData">
      <HelmetCustom title={title} description={description} />

      <div className="videoMetaData__top">
        <h5 className="cursor-pointer text-lg">{title}</h5>
        <div className="py-1 d-flex justify-content-between align-items-center">
          <span className="cursor-pointer ">
            {numeral(viewCount).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>

          <div className="flex gap-7 px-5">
            <span className="mr-3">
              <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="py-3 my-2 videoMetaData__channel border-t-[0.2px] border-t-zinc-500 border-b-[0.2px] border-b-zinc-500 d-flex justify-content-between align-items-center">
        <div className="flex items-center">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt=""
            className="mr-3 h-[50px] w-[50px] rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-base">{channelTitle}</span>
            <span>
              {" "}
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
          <button
            className={`p-2 m-2 border-0 btn  ${
              subscriptionStatus && "btn-gray"
            } ml-auto`}
          >
            {subscriptionStatus ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
