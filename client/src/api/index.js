import { async } from "@firebase/util";
import axios from "axios";

const baseURL = "http://localhost:5000";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// fetch all users
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/getAllUsers`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// fetch all artists
export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/artists/getAll`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// fetch all songs
export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/songs/getAll`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// fetch all albums
export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/albums/getAll`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// update role of the user
export const updateUserRole = async (id, role) => {
  try {
    const res = await axios.put(`${baseURL}/api/users/updateRole/${id}`, {
      data: { role: role },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// delete user
export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/users/deleteUser/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

// save new song
export const saveNewSong = async (data) => {
  try {
    const res = axios.post(`${baseURL}/api/songs/save`, { ...data });
    return (await res).data.savedSong;
  } catch (err) {
    return null;
  }
};

// save new Artist

export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseURL}/api/artists/save`, { ...data });
    return (await res).data.savedArtist;
  } catch (err) {
    return null;
  }
};

// save new Album
export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseURL}/api/albums/save`, { ...data });
    return (await res).data.savedAlbum;
  } catch (err) {
    return null;
  }
};

// delete Song
export const deleteSong = async (id) => {
  try {
    const res = axios.delete(`${baseURL}/api/songs/delete/${id}`);
    return res;
  } catch (err) {
    return null;
  }
};

// delete Artist
export const deleteArtist = async (id) => {
  try {
    const res = axios.delete(`${baseURL}/api/artists/delete/${id}`);
    return res;
  } catch (err) {
    return null;
  }
};

// delete Album
export const deleteAlbum = async (id) => {
  try {
    const res = axios.delete(`${baseURL}/api/albums/delete/${id}`);
    return res;
  } catch (err) {
    return null;
  }
};
