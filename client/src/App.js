import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login, Main, MusicPlayer } from "./components";
import About from "./components/About";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from "./api/index";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
//
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";

import WatchScreen from "./screens/watchScreen/WatchScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import "./_app.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";

//

//

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{ user, isSongPlaying }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login");
      }
    });
  }, []);

  const Layout = ({ children }) => {
    const [sidebar, toggleSidebar] = useState(false);

    const handleToggleSidebar = () => toggleSidebar((value) => !value);

    return (
      <>
        <div className=" max-h-auto overflow-hidden ">
          <div style={{ height: "7.5vh" }}>
            <Header handleToggleSidebar={handleToggleSidebar} />
          </div>
          <div className="flex ">
            <div className=" w-2/12 ">
              <Sidebar
                sidebar={sidebar}
                handleToggleSidebar={handleToggleSidebar}
              />
            </div>
            <div className="w-10/12">{children}</div>
            {/* {children} */}
          </div>
        </div>
      </>
    );
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {/* <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center "> */}
      <Routes>
        <Route
          path="/login"
          element={<Login setAuth={setAuth}></Login>}
        ></Route>
        <Route path="/main" element={<Main></Main>}></Route>
        <Route path="/about-us" element={<About></About>}></Route>
        <Route path="/*" element={<Home></Home>}></Route>
        <Route path="/dashboard/*" element={<Dashboard></Dashboard>}></Route>

        <Route
          path="/youtube"
          element={
            <Layout>
              <HomeScreen />
            </Layout>
          }
        ></Route>
        <Route
          path="/search/:query"
          element={
            <Layout>
              <SearchScreen />
            </Layout>
          }
        ></Route>
        <Route
          path="/watch/:id"
          element={
            <Layout>
              <WatchScreen />
            </Layout>
          }
        ></Route>
        <Route
          path="/feed/subscriptions"
          element={
            <Layout>
              <SubscriptionsScreen />
            </Layout>
          }
        ></Route>
        <Route
          path="/channel/:channelId"
          element={
            <Layout>
              <ChannelScreen />
            </Layout>
          }
        ></Route>
      </Routes>
      {isSongPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className={
            "flex items-center justify-center backdrop-blur-md drop-shadow-2xl bg-cardOverlay fixed min-w-[700px] h-26 inset-x-0 bottom-0"
          }
        >
          <MusicPlayer></MusicPlayer>
        </motion.div>
      )}
      {/* </div> */}
    </AnimatePresence>
  );
}

export default App;
