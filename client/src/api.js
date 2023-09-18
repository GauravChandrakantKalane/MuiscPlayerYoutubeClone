import axios from "axios";
console.log(process.env.REACT_APP_YT_API_KEY);
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyA1MgorQ0dP3MzbdMofQzfdSPMXulmB1KY",
  },
});

export default request;

//1 AIzaSyAuvyncvRKftd6soyU6zIvBmZ7kEiOsgPw
//2 AIzaSyBNSSFw2l8-PfNpmA8aRV1lKuGChMxMHgY
//3 AIzaSyA1MgorQ0dP3MzbdMofQzfdSPMXulmB1KY
