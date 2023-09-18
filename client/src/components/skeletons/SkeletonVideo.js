import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
const SkeletonVideo = () => {
  return (
    <div style={{ width: "100%", margin: "1rem 0" }}>
      <SkeletonTheme color="#343a40" highlightColor="#3c4147">
        <Skeleton height={180} />
        <div>
          <Skeleton
            style={{ margin: "0.5rem" }}
            circle
            height={40}
            width={40}
          />
          <Skeleton height={40} width="75%" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonVideo;
