import React from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectInteract } from "./store/slices/interactSlice";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Layout() {
  const navigate = useNavigate();
  const interact = useSelector(selectInteract);
  console.log(interact);
  return (
      <div className="w-full h-full overflow-hidden relative">
        <Navbar />
        <div className="flex h-full">
          {interact.sidebar && (
            <div className="h-full">
              <Sidebar />
            </div>
          )}
          <Outlet />
        </div>
    </div>
  );
}

export default Layout;
