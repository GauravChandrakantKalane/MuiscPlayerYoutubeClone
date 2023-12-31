import React, { useEffect } from "react";
// import { Col, Container } from "react-bootstrap";
import Video from "../../components/video/Video";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "../../components/skeletons/SkeletonVideo";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  const fetchData = () => {
    if (activeCategory === "All") dispatch(getPopularVideos());
    else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    // <Container>
    <div className="flex flex-col gap-2 ">
      <CategoriesBar />

      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        height={650}
        className="row"
      >
        <div className="flex  gap-3 flex-wrap">
          {!loading
            ? videos.map((video) => (
                // <Col lg={3} md={4}>
                <div className="">
                  <Video video={video} key={video.id} />
                </div>
                // </Col>
              ))
            : [...Array(20)].map(() => (
                // <Col lg={3} md={4}>
                <div className="">
                  <SkeletonVideo />
                </div>
                // </Col>
              ))}
        </div>
      </InfiniteScroll>
    </div>
    // </Container>
  );
};

export default HomeScreen;
