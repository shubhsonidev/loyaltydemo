import { Outlet } from "react-router-dom";
import Dock from "../components/Dock";
import Navbar from "../components/Navbar";

function UserLayout() {
  return (
    <div
      className="bg-base-200"
      style={{ width: "100vw", height: "100vh" }}>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Dock></Dock>
    </div>
  );
}

export default UserLayout;
