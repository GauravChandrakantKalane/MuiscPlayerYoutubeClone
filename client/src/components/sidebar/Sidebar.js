import React from "react";
// import "./_sidebar.scss";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebase.config";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
// import { useNavigate } from "react-router-dom";
// import { app } from "../../config/firebase.config";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
// import { AiFillHome } from "react-icons/ai";
import { FaPager } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { logOut } from "../../redux/actions/auth.action";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const logOutHandler = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/login", { replace: true });
  };
  return (
    // className={sidebar ? "sidebar open" : "sidebar"}
    <div
      className=" bg-[#212121] pr-5 mt-2 overflow-auto pb-8 sidebar h-[600px]  "
      onClick={() => handleToggleSidebar(false)}
    >
      <ul className="flex flex-col border-b-2 border-gray-700">
        <Link to="/youtube">
          <li className=" flex items-center gap-5 pl-6 py-3 hover:bg-zinc-600 justify-start">
            <MdHome size={23} />
            <span className="text-sm tracking-wider ">Home</span>
          </li>
        </Link>
        <Link to="/feed/subscriptions">
          <li className=" flex item-center gap-5 pl-6 py-3 hover:bg-zinc-600 justify-start">
            <MdSubscriptions size={23} />
            <span className="text-sm tracking-wider">Subscriptions</span>
          </li>
        </Link>

        <li className=" flex item-center gap-5 pl-6 py-3 hover:bg-zinc-600 justify-start">
          <MdThumbUp size={23} />
          <span className="text-sm tracking-wider">Liked Video</span>
        </li>

        <li className=" flex item-center gap-5 pl-6 py-3 hover:bg-zinc-600 justify-start">
          <MdHistory size={23} />
          <span className="text-sm tracking-wider">History</span>
        </li>

        <li className=" flex item-center gap-5 pl-6 py-3 hover:bg-zinc-600 justify-start">
          <MdLibraryBooks size={23} />
          <span className="text-sm tracking-wider ">Library</span>
        </li>
        {/* <li>
            <MdSentimentDissatisfied size={23} />
            <span>I don't Know</span>
         </li> */}

        <hr />
        <Link to="/main">
          <li className=" flex item-center gap-5 pl-6 py-3 hover:bg-zinc-600 justify-start">
            {/* <MdSubscriptions size={23} /> */}
            <FaPager size={23}></FaPager>
            <span className="text-sm tracking-wider">Main Page</span>
          </li>
        </Link>

        <li
          className="  flex item-center gap-5 pl-6 py-3 hover:bg-zinc-600 justify-start"
          onClick={logOutHandler}
        >
          <MdExitToApp size={23} />
          <span className="text-sm tracking-wider ">Log Out</span>
        </li>

        <hr />
      </ul>
    </div>
  );
};

export default Sidebar;
