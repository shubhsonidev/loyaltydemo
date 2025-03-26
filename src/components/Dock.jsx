import { FaHome } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Dock() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="dock"
      style={{ zIndex: "1", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
      <div
        onClick={() => navigate("/home")}
        className={`cursor-pointer ${location.pathname === "/home" ? "dock-active" : ""}`}>
        <FaHome size={25} />
        <span className="dock-label">Home</span>
      </div>

      <div
        onClick={() => navigate("/details")}
        className={`cursor-pointer ${location.pathname === "/details" ? "dock-active" : ""}`}>
        <TbListDetails size={25} />
        <span className="dock-label">Details</span>
      </div>
    </div>
  );
}

export default Dock;
