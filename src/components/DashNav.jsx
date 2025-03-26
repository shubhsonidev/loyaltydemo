import { useEffect, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function DashNav() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    const checkToken = async () => {
      const user = localStorage.getItem("user");
      setUser(user);
    };

    checkToken();
  }, []);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button p-0">
              <MdOutlineMenu size={30} />
            </label>
          </div>
        </div>
        <div className="flex-1">
          <p className="ms-4 text-xl">Admin Panel</p>
        </div>
      </div>
      <div
        className="drawer"
        style={{ zIndex: "10" }}>
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <a
                onClick={() => {
                  navigate("/dashboard");
                }}>
                Dashboard
              </a>
            </li>
            {user == "head" && (
              <li>
                <a
                  onClick={() => {
                    navigate("/list");
                  }}>
                  User List
                </a>
              </li>
            )}
            {user == "head" && (
              <li>
                <a
                  onClick={() => {
                    navigate("/employee");
                  }}>
                  Employee Master
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashNav;
