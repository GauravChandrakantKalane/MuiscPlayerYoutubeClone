import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSongs } from "../api/index";
import { actionType } from "../context/reducer";
// import { useStateValue } from "../../context/StateProvider";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { Logo } from "../assets/img/index";
import Modal from "./Modal";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";

function Main() {
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

  const [{ user, allSongs }, dispatch] = useStateValue();
  const [modal, setModal] = useState(false);

  const setModalFalse = () => {
    setModal(false);
  };
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);
  return (
    <div>
      {modal ? <Modal setModalFalse={setModalFalse}></Modal> : null}
      <div className="flex justify-between items-center  mr-4 cursor-pointer gap-2 relative ml-auto">
        <button
          className="py-5 px-8 font-semibold bg-red-500 text-slate-300 ml-2 rounded-lg hover:cursor-pointer"
          onClick={logOutHandler}
        >
          LogOut
        </button>
        <button onClick={() => setModal(true)}>
          <div className="flex justify-end items-center py-4 mr-4 cursor-pointer gap-2 relative">
            <img
              src={user?.data.imageURL}
              className="w-12 h-12 min-w-[44px] object-cover rounded-full "
              alt=""
              referrerPolicy="no-referrer"
            />
            <p className="text-white text-lg font-semibold">
              {user?.data.name}
            </p>
          </div>
        </button>
      </div>
      <div className="flex h-screen row justify-center items-center gap-x-12 ">
        <motion.div
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
          onClick={() => {
            navigate("/");
          }}
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://toppng.com/uploads/preview/15-music-notes-transpa-png-for-free-on-mbtskoudsalg-transparent-background-music-logo-11563333702cvrvtiehly.png"
              alt=""
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-2">
            Music Player
          </p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
          onClick={() => {
            navigate("/youtube");
          }}
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
              alt="youtube"
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-2">
            Youtube
          </p>
        </motion.div>
      </div>

      {/* <button onClick={() => navigate("/")}>Go To Music Player</button>
      <br></br>
      <button onClick={() => navigate("/youtube", { replace: true })}>
        Go To Youtube
      </button> */}
    </div>
  );
}

export default Main;
