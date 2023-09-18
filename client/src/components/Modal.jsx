import React from "react";
import ReactDOM from "react-dom";

import { useStateValue } from "../context/StateProvider";
const Backdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 bg-zinc-800 opacity-90"></div>
  );
};

const Overlay = ({ user, setModalFalse }) => {
  return (
    <>
      <div className="fixed inset-1/4 inset-x-1/3 w-2/5 z-50 truncate bg-slate-100 rounded-md ">
        <header className=" p-4 text-center">
          <img
            src={user?.data.imageURL}
            alt="user-image"
            className="m-auto mb-4  w-24 h-24 rounded-full"
          />
          <div className="flex align-center justify-center">
            <h2 className="text-4xl text-purple-400">{user?.data.name}</h2>
            <span className="text-sm text-orange-500 font-semibold">
              {user?.data.role}
            </span>
          </div>
        </header>
        <div className="p-2 text-center">
          <p>{user?.data.email}</p>
        </div>
        <div className="flex align-center justify-center p-2 ">
          <button
            className="m-auto py-2 px-6 text-base bg-red-600 text-white font-semibold rounded-lg"
            onClick={setModalFalse}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
};

function Modal({ setModalFalse }) {
  const [{ user }, dispatch] = useStateValue();
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop></Backdrop>,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <Overlay user={user} setModalFalse={setModalFalse}></Overlay>,
        document.getElementById("overlay")
      )}
    </>
  );
}

export default Modal;
