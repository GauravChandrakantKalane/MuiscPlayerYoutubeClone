import React, { useState } from "react";
// import "./_header.scss";
// import { useStateValue } from "../context/StateProvider";
import { useStateValue } from "../../context/StateProvider";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../_app.scss";
// import "../../_base.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BsCameraVideo, BsYoutube } from "react-icons/bs";
import { TiMicrophone } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${input}`, { replace: true });
  };
  //   const user = useSelector((state) => state.auth?.user);

  return (
    <div className="flex justify-between items-center px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50 ">
      <div className="flex gap-8 items-center text-2xl">
        <div>
          <GiHamburgerMenu
            className="header__menu"
            size={20}
            onClick={() => handleToggleSidebar()}
          />
        </div>
        <Link to="/youtube">
          <div className="flex gap-1 items-center justify-center">
            {/* <img
              src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
              alt=""
              className="text-3xl text-red-600"
            /> */}
            <BsYoutube className="text-3xl text-red-600"></BsYoutube>
            <span className="text-xl font-medium text-white">YouTube</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-5">
        <form onSubmit={handleSubmit}>
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
            <div className="flex gap-4 items-center pr-5">
              <div>
                <AiOutlineSearch className="text-xl"></AiOutlineSearch>
              </div>
              <input
                type="text"
                className="w-96 bg-zinc-900 focus:outline-none border-none"
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <AiOutlineClose className="text-xl cursor-pointer"></AiOutlineClose>
            </div>
            <button
              className="h-10 w-16 flex items-center justify-center bg-zinc-800"
              type="submit"
            >
              <AiOutlineSearch size={22} />
            </button>
          </div>
        </form>
        <div className="text-xl p-3 bg-zinc-900 rounded-full">
          <TiMicrophone></TiMicrophone>
        </div>
      </div>
      <div className="flex gap-5 items-center text-xl">
        <BsCameraVideo></BsCameraVideo>
        <div className="relative">
          <MdNotifications size={28} />
          {/* <MdApps size={28} /> */}
        </div>
        <img
          className="w-9 h-9 rounded-full"
          src={user?.data.imageURL}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Header;
