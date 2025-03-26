import { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { toast } from "react-toastify";
import AddModule from "../components/AddModule";
function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnloading, setbtnloading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState("");
  const [usesr, setUser] = useState("");

  const handleActionClick = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    document.getElementById("confirm_modal").showModal();
  };

  const handleConfirmAction = () => {
    let token = localStorage.getItem("token");
    fetch(
      `https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=updateRequest&requestId=${selectedRequest.requestId}&status=${actionType}&token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        document.getElementById("confirm_modal").close();
        setLoading(true);
        let token = localStorage.getItem("token");

        fetch(
          "https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=getRequests&token=" +
            token
        ) // Replace with your API endpoint
          .then((response) => response.json())
          .then((data) => {
            setRequests(data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      })
      .catch((error) => console.error("Error updating request:", error));
    setbtnloading(false);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    setUser(user);
    if (user == "head") {
      fetch(
        "https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=getRequests&token=" +
          token
      ) // Replace with your API endpoint
        .then((response) => response.json())
        .then((data) => {
          setRequests(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return usesr == "head" ? (
    <div className="p-4">
      <div className="tabs tabs-lift">
        <label className="tab text-primary hover:text-primary">
          <input
            type="radio"
            name="my_tabs_4"
            defaultChecked
          />
          <MdOutlinePendingActions className="me-3" /> Pending Requests
        </label>
        <div
          className="tab-content bg-base-100 border-base-300 p-6 overflow-x-auto"
          style={{ maxHeight: "80vh", height: "80vh" }}>
          <ul className="list bg-base-100 rounded-box shadow-md">
            {requests.filter((req) => req.status === "pending").length === 0 ? (
              <li className="p-4 text-center">No pending requests</li>
            ) : (
              requests
                .filter((req) => req.status === "pending")
                .map((req) => (
                  <>
                    <li
                      key={`p${req.requestId}`}
                      className="list-row p-2 border-b">
                      <div className="text-4xl font-medium opacity-30 tabular-nums w-30 ">
                        {req.points}
                        <span className="text-sm">pts</span>
                      </div>
                      <div className="list-col-grow">
                        <div>{req.name}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{req.number}</div>
                      </div>

                      <div className="list-col-grow flex items-center ">
                        <div className="opacity-60">{req.date}</div>
                      </div>
                      <div className="list-col-grow flex items-center ">
                        <div className="opacity-60 text-2xl"> ₹{req.amount}</div>
                      </div>
                      {/* <div className="text-lg text-success flex items-center justify-center">Approved</div> */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleActionClick(req, "approved")}
                          className="btn btn-success btn-sm"
                          style={{ color: "gray" }}>
                          Approve
                        </button>
                        <button
                          onClick={() => handleActionClick(req, "rejected")}
                          className="btn btn-error btn-sm"
                          style={{ color: "gray" }}>
                          Reject
                        </button>
                      </div>
                    </li>

                    {/* Confirmation Modal */}
                    <dialog
                      id="confirm_modal"
                      className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Action</h3>
                        <p className="py-2">
                          Are you sure you want to{" "}
                          <span className="font-semibold">{actionType == "approved" ? "approve" : "reject"}</span> this
                          request?
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Cancel</button>
                          </form>
                          {btnloading ? (
                            <button
                              onClick={handleConfirmAction}
                              className={`btn btn-${actionType === "approved" ? "success" : "error"}`}
                              style={{ color: "white" }}>
                              Confirm
                            </button>
                          ) : (
                            <button
                              className="btn"
                              disabled>
                              <span className="loading loading-spinner"></span>
                              loading
                            </button>
                          )}
                        </div>
                      </div>
                    </dialog>
                  </>
                ))
            )}
          </ul>
        </div>

        <label className="tab text-success hover:text-success">
          <input
            type="radio"
            name="my_tabs_4"
          />
          <FaThumbsUp className="me-3" /> Approved Requests
        </label>
        <div
          className="tab-content bg-base-100 border-base-300 p-6 overflow-x-auto"
          style={{ maxHeight: "80vh", height: "80vh" }}>
          <ul className="list bg-base-100 rounded-box shadow-md">
            {requests.filter((req) => req.status === "approved").length === 0 ? (
              <li className="p-4 text-center">No approved requests</li>
            ) : (
              requests
                .filter((req) => req.status === "approved")
                .map((req) => (
                  <li
                    key={`a${req.requestId}`}
                    className="list-row p-2 border-b">
                    <div className="text-4xl font-medium opacity-30 tabular-nums w-30">
                      {req.points}
                      <span className="text-sm">pts</span>
                    </div>
                    <div className="list-col-grow">
                      <div>{req.name}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">{req.number}</div>
                    </div>

                    <div className="list-col-grow flex items-center ">
                      <div className="opacity-60">{req.date}</div>
                    </div>
                    <div className="list-col-grow flex items-center  ">
                      <div className="opacity-60 text-2xl"> ₹{req.amount}</div>
                    </div>

                    <div className="text-lg text-success flex items-center justify-center">Approved</div>
                  </li>
                ))
            )}
          </ul>
        </div>

        <label className="tab text-error hover:text-error">
          <input
            type="radio"
            name="my_tabs_4"
          />
          <FaThumbsDown className="me-3" /> Rejected Requests
        </label>
        <div
          className="tab-content bg-base-100 border-base-300 p-6 overflow-x-auto"
          style={{ maxHeight: "80vh", height: "80vh" }}>
          <ul className="list bg-base-100 rounded-box shadow-md">
            {requests.filter((req) => req.status === "rejected").length === 0 ? (
              <li className="p-4 text-center">No rejected requests</li>
            ) : (
              requests
                .filter((req) => req.status === "rejected")
                .map((req) => (
                  <li
                    key={`r${req.requestId}`}
                    className="list-row p-2 border-b">
                    <div className="text-4xl font-medium opacity-30 tabular-nums w-30">
                      {req.points}
                      <span className="text-sm">pts</span>
                    </div>
                    <div className="list-col-grow">
                      <div>{req.name}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">{req.number}</div>
                    </div>
                    <div className="list-col-grow flex items-center ">
                      <div className="opacity-60">{req.date}</div>
                    </div>
                    <div className="list-col-grow flex items-center ">
                      <div className="opacity-60 text-2xl"> ₹{req.amount}</div>
                    </div>

                    <div className="text-lg text-error flex items-center justify-center">Rejected</div>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <AddModule></AddModule>
  );
}

export default Dashboard;
