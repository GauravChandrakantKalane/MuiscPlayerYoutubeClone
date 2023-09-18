import React, { useEffect, useState } from "react";
import "./_video.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Video = ({ video, channelScreen }) => {
  const navigate = useNavigate();
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [_videoId]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`, { replace: true });
  };

  return (
    <div
      className="w-64 h-auto flex gap-3 flex-col cursor-pointer"
      onClick={handleVideoClick}
    >
      <div className="relative ">
        {/* <img src={medium.url} alt='' /> */}
        <LazyLoadImage className="h-40 w-72" src={medium.url} effect="blur" />
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {_duration}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          {!channelScreen && (
            <LazyLoadImage
              className="h-9 w-9 rounded-full"
              src={channelIcon?.url}
              effect="blur"
            />
          )}
        </div>
        <div>
          <h3 className="line-clamp-2">
            <a href="#" className="line-clamp-2">
              {title}
            </a>
          </h3>
        </div>
      </div>
      <div className="text-sm">
        <div className="flex justify-around">
          <span className=" flex items-center justify-center gap-2">
            <AiFillEye /> {numeral(views).format("0.a")} Views.
          </span>
          <span> {moment(publishedAt).fromNow()} </span>
        </div>
      </div>
    </div>
  );
};

export default Video;
