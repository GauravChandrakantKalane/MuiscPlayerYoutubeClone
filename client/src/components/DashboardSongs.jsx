import React from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import {
  deleteAlbum,
  deleteArtist,
  deleteSong,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../api/index";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
import { storage } from "../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";

function DashboardSongs() {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) =>
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        })
      );
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink
          to={"/dashboard/newSong"}
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer"
        >
          <IoAdd></IoAdd>
        </NavLink>

        <input
          type="text"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } outline-none rounded-md bg-transparent duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          placeholder="Search here"
          value={songFilter}
          onChange={(e) => {
            setSongFilter(e.target.value);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
        />

        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer"></AiOutlineClear>
        </i>
      </div>

      <div className="relative w-full my-4 py-16 border border-gray-300 rounded-md">
        {/* the count  */}
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count :{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>

        {/* songs container */}
        <SongContainer data={allSongs}></SongContainer>
      </div>
    </div>
  );
}

//song container component
export const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, i) => {
          return (
            <SongCard
              key={song._id}
              data={song}
              index={i}
              type="song"
            ></SongCard>
          );
        })}
    </div>
  );
};

// song card component
export const SongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [
    { alertType, allArtists, allAlbums, allSongs, isSongPlaying, songIndex },
    dispatch,
  ] = useStateValue();
  // delete object function for the song card artist card and album card
  const deleteData = (data) => {
    // for song
    if (type === "song") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});
      deleteSong(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch(
              {
                type: actionType.SET_ALERT_TYPE,
                alertType: null,
              },
              3000
            );

            getAllSongs().then((data) => {
              dispatch({
                type: actionType.SET_ALL_SONGS,
                allSongs: data.data,
              });
            });
          });
        } else {
          dispatch(
            {
              type: actionType.SET_ALERT_TYPE,
              alertType: "danger",
            },
            4000
          );
        }
      });
    }
    // for album
    if (type === "album") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});
      deleteAlbum(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch(
              {
                type: actionType.SET_ALERT_TYPE,
                alertType: null,
              },
              3000
            );

            getAllAlbums().then((data) => {
              dispatch({
                type: actionType.SET_ALL_ALBUMS,
                allAlbums: data.data,
              });
            });
          });
        } else {
          dispatch(
            {
              type: actionType.SET_ALERT_TYPE,
              alertType: "danger",
            },
            4000
          );
        }
      });
    }

    // for artists
    if (type === "artist") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});
      deleteArtist(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch(
              {
                type: actionType.SET_ALERT_TYPE,
                alertType: null,
              },
              3000
            );

            getAllArtists().then((data) => {
              dispatch({
                type: actionType.SET_ALL_ARTISTS,
                allArtists: data.data,
              });
            });
          });
        } else {
          dispatch(
            {
              type: actionType.SET_ALERT_TYPE,
              alertType: "danger",
            },
            4000
          );
        }
      });
    }
  };

  const addToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };
  return (
    <motion.div
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
      onClick={type === "song" ? addToContext : undefined}
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          className="w-full h-full rounded-lg object-cover"
        ></motion.img>
      </div>

      <p className="text-base text-center text-headingColor font-semibold my-2">
        {data?.name.length > 25 ? `${data.name.slice(0, 25)}....` : data.name}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data?.artist.length > 25
              ? `${data.artist.slice(0, 25)}....`
              : data.artist}
          </span>
        )}
      </p>
      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
          onClick={() => setIsDelete(true)}
        >
          <IoTrash></IoTrash>
        </motion.i>
      </div>
      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Are You Sure you want to delete it?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => deleteData(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardSongs;
