import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          {/* <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button p-0">
              <HiMenuAlt2 size={30} />
            </label>
          </div> */}
        </div>
        <div className="navbar-center">
          <div className="avatar">
            <div className="w-12 rounded">
              <img src="https://raw.githubusercontent.com/shubhsonidev/content/main/themobilecare.png" />
            </div>
          </div>
          <div className="font-semibold  text-xl ms-2">The Mobile Care</div>
        </div>
        <div className="navbar-end"></div>
      </div>
      <div
        className="drawer"
        style={{ zIndex: "2" }}>
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
            <div className="drawer-content"></div>
            <div
              className=" flex justify-end"
              style={{ width: "100%" }}>
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost drawer-buttonp p-0">
                <IoMdClose size={30} />
              </label>
            </div>

            <li>
              <div className="flex justify-between">
                <a>Sidebar Item 1</a>
              </div>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
