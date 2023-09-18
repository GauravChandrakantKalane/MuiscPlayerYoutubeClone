import React, { useEffect, useState } from "react";
import "./_videoHorizontal.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (isVideo) get_video_details();
  }, [id, isVideo]);

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

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo
      ? navigate(`/watch/${id.videoId}`, { replace: true })
      : navigate(`/channel/${_channelId}`, { replace: true });
  };

  const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel";

  return (
    <div
      className="w-64 h-auto flex gap-3 flex-col cursor-pointer"
      onClick={handleClick}
    >
      {/* //TODO refractor grid */}
      {/* <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videoHorizontal__left"
      > */}
      <div className="relative ">
        {/* <img src={medium.url} alt='' /> */}
        <LazyLoadImage className="h-40 w-72" src={medium.url} effect="blur" />
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {_duration}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          {!isVideo && (
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

      {/* <LazyLoadImage src={medium.url} effect="blur" className="h-40 w-72" />
      {isVideo && (
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {_duration}
        </span>
      )}
      {/* </Col> */}
      {/* <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className="p-0 videoHorizontal__right"
      >
        <p className="mb-1 videoHorizontal__title">{title}</p>

        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {(searchScreen || subScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}

        <div className="my-1 videoHorizontal__channel d-flex align-items-center">
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {subScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )} */}
      {/* </Col>  */}
    </div>
  );
};

export default VideoHorizontal;
