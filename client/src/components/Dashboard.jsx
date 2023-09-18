import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Header from "./Header";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import {
  DashboardHome,
  DashboardSongs,
  DashboardUsers,
  DashboardArtists,
  DashboardAlbums,
  DashboardNewSong,
  Alert,
} from "./index";
import { useStateValue } from "../context/StateProvider";

function Dashboard() {
  const [{ alertType }, dispatch] = useStateValue();
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header></Header>
      <div className="w-[60%] my-2  p-4 flex items-center justify-evenly">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          <IoHome className="text-2xl text-textColor"></IoHome>
        </NavLink>
        <NavLink
          to={"/dashboard/user"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/songs"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Songs
        </NavLink>
        <NavLink
          to={"/dashboard/artist"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Artists
        </NavLink>
        <NavLink
          to={"/dashboard/albums"}
          className={({ isActive }) => {
            return isActive ? isActiveStyles : isNotActiveStyles;
          }}
        >
          Albums
        </NavLink>
      </div>

      <div className="my-4 w-full p-4 h-screen">
        <Routes>
          <Route path="/home" element={<DashboardHome></DashboardHome>}></Route>
          <Route
            path="/user"
            element={<DashboardUsers></DashboardUsers>}
          ></Route>
          <Route
            path="/songs"
            element={<DashboardSongs></DashboardSongs>}
          ></Route>
          <Route
            path="/artist"
            element={<DashboardArtists></DashboardArtists>}
          ></Route>
          <Route
            path="/albums"
            element={<DashboardAlbums></DashboardAlbums>}
          ></Route>
          <Route
            path="/newSong"
            element={<DashboardNewSong></DashboardNewSong>}
          ></Route>
        </Routes>
      </div>
      {alertType && <Alert type={alertType}></Alert>}
    </div>
  );
}

export default Dashboard;
