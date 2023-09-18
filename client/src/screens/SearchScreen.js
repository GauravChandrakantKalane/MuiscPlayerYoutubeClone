import React, { useEffect } from "react";
// import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../redux/actions/videos.action";
import VideoHorizontal from "../components/videoHorizontal/VideoHorizontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../_app.scss";
// import "../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
const SearchScreen = () => {
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  return (
    // <Container>
    <div className="flex  gap-3 flex-wrap">
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </div>
  );
  {
    /* </Container> */
  }
};

export default SearchScreen;
