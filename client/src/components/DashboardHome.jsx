import React from "react";
import { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  getAllUsers,
} from "../api/index";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { GiLoveSong } from "react-icons/gi";
import { GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { bgColors } from "../utils/styles";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_Colors = bgColors[parseInt(Math.random() * bgColors.length)];
  return (
    <div
      style={{ background: bg_Colors }}
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col justify-center"
    >
      {icon}
      <p className="text-xl text-textColor font-semibold ">{name}</p>
      <p className="text-xl text-textColor font-semibold ">{count}</p>
    </div>
  );
};

function DashboardHome() {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }

    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.data,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap ">
      <DashboardCard
        icon={<FaUsers className="text-3xl text-textColor"></FaUsers>}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      ></DashboardCard>
      <DashboardCard
        icon={<GiLoveSong className="text-3xl text-textColor"></GiLoveSong>}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs?.length : 0}
      ></DashboardCard>
      <DashboardCard
        icon={
          <RiUserStarFill className="text-3xl text-textColor"></RiUserStarFill>
        }
        name={"Artists"}
        count={allArtists?.length > 0 ? allArtists?.length : 0}
      ></DashboardCard>
      <DashboardCard
        icon={
          <GiMusicalNotes className="text-3xl text-textColor"></GiMusicalNotes>
        }
        name={"Albums"}
        count={allAlbums?.length > 0 ? allAlbums?.length : 0}
      ></DashboardCard>
    </div>
  );
}

export default DashboardHome;
