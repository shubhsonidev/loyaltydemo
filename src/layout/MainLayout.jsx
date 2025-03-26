import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Outlet></Outlet>
    </>
  );
}

export default MainLayout;
