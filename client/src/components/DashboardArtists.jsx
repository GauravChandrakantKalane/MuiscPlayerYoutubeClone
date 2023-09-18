import React, { useEffect } from "react";
import { getAllArtists } from "../api/index";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { SongCard } from "./DashboardSongs";
function DashboardArtists() {
  const [{ allArtists }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) =>
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data,
        })
      );
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full my-4 py-16 border border-gray-300 rounded-md">
        {/* songs container */}
        <ArtistContainer data={allArtists}></ArtistContainer>
      </div>
    </div>
  );
}

export const ArtistContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, i) => {
          return (
            <SongCard
              key={song._id}
              data={song}
              index={i}
              type="artist"
            ></SongCard>
          );
        })}
    </div>
  );
};

export default DashboardArtists;
