import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
// import "./_categoriesBar.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "/_app.scss";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art ",
  "Guitar",
  "yogi bolta hai",
  "Coding",
  "Cricket",
  "Football",
  "kristy partridge",
  "triggered insaan",
  "Marvel",
  "Dc",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");

  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <div className="p-2 mt-2 text-sm flex overflow-x-scroll">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className="mr-4 p-2 rounded-full whitespace-nowrap border-2 border-[#b1bdb4] hover:bg-[#374a59] active:text-[#fff]
          active:bg-[#606060] active:border-[#4c4c4c] cursor-pointer"
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
