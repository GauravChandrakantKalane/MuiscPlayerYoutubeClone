import React, { useEffect } from "react";
import { getAllAlbums } from "../api/index";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { SongCard } from "./DashboardSongs";

function DashboardAlbums() {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) =>
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.data,
        })
      );
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full my-4 py-16 border border-gray-300 rounded-md">
        {/* songs container */}
        <AlbumContainer data={allAlbums}></AlbumContainer>
      </div>
    </div>
  );
}

export const AlbumContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, i) => {
          return (
            <SongCard
              key={song._id}
              data={song}
              index={i}
              type="album"
            ></SongCard>
          );
        })}
    </div>
  );
};

export default DashboardAlbums;
