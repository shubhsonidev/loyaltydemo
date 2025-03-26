import { Outlet } from "react-router-dom";
import DashNav from "../components/DashNav";

function AdminLayout() {
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="bg-base-200 ">
      <DashNav></DashNav>
      <Outlet></Outlet>
    </div>
  );
}

export default AdminLayout;
