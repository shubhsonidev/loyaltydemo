import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
function History({ approved, redeemed }) {
  const [filter, setFilter] = useState("approved");

  return (
    <div style={{ height: "100%" }}>
      <ul className="list bg-base-100 rounded-box shadow-md h-full">
        <div className="flex items-center justify-center">
          <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">Points History</li>
        </div>
        <div className="flex items-center justify-center mb-3">
          <div className="tabs tabs-box">
            <input
              onClick={() => {
                setFilter("approved");
              }}
              style={{ width: "40vw" }}
              type="radio"
              name="my_tabs_1"
              className="tab"
              aria-label="Earned"
              defaultChecked
            />
            <input
              onClick={() => {
                setFilter("redeemed");
              }}
              style={{ width: "40vw" }}
              type="radio"
              name="my_tabs_1"
              className="tab"
              aria-label="Redeemed"
            />
          </div>
        </div>
        {filter == "approved" ? (
          approved.length > 0 ? (
            approved.map((e, index) => (
              <li
                key={index}
                className="list-row">
                <div className="flex items-center justify-center">
                  <FaArrowDown
                    size={26}
                    className="text-success"
                  />
                </div>
                <div className="flex items-center">
                  <div className="text-2xl text-success font-semibold">{e.points}</div>
                </div>
                <div className="text-lg opacity-50 font-medium">{e.date}</div>
              </li>
            ))
          ) : (
            <></>
          )
        ) : redeemed.length > 0 ? (
          redeemed.map((e, index) => (
            <li
              key={index}
              className="list-row">
              <div className="flex items-center justify-center">
                <FaArrowUp
                  size={26}
                  className="text-error"
                />
              </div>
              <div className="flex items-center">
                <div className="text-2xl text-error font-semibold">{e.points}</div>
              </div>
              <div className="text-lg opacity-50 font-medium">{e.date}</div>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default History;
