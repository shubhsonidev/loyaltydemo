import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function List() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnloading, setbtnloading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [redeemPoints, setRedeemPoints] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");

    fetch(
      "https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=fetchLoyalty&token=" +
        token
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setEntries(data.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleRedeemClick = (entry) => {
    setSelectedEntry(entry);
    setRedeemPoints("");
    document.getElementById("redeem_modal").showModal();
  };

  const handleRedeem = () => {
    setbtnloading(true);
    if (!redeemPoints || redeemPoints <= 0) {
      toast.warning("Please enter a valid number of points.");
      return;
    }

    let token = localStorage.getItem("token");
    fetch(
      `https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=redeemPoints&number=${selectedEntry.number}&points=${redeemPoints}&token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          toast.success("Points redeemed successfully!");
          document.getElementById("redeem_modal").close();
          setLoading(true);
          let token = localStorage.getItem("token");

          fetch(
            "https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=fetchLoyalty&token=" +
              token
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {
                setEntries(data.data);
              }
            })
            .catch((error) => console.error("Error fetching data:", error))
            .finally(() => setLoading(false));
        } else {
          toast.error(data.message);
          document.getElementById("redeem_modal").close();
        }
      })
      .catch((error) => console.error("Error redeeming points:", error));
    setbtnloading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Loyalty Entries</h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div
          className="overflow-x-auto"
          style={{ maxHeight: "80vh" }}>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Number</th>
                <th>Total Available Points</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{entry.name}</td>
                  <td>{entry.number}</td>
                  <td>{entry.totalPoints}</td>
                  <td>
                    <button
                      onClick={() => handleRedeemClick(entry)}
                      className="btn btn-sm btn-primary">
                      Redeem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Redeem Points Modal */}
      <dialog
        id="redeem_modal"
        className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Redeem Points for {selectedEntry?.name}</h3>
          <p className="py-2">Enter the number of points to redeem:</p>
          <input
            type="number"
            value={redeemPoints}
            onChange={(e) => setRedeemPoints(e.target.value)}
            className="input input-bordered w-full mb-4"
            placeholder="Enter points"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            {btnloading ? (
              <button
                onClick={handleRedeem}
                className="btn btn-primary">
                Redeem
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
    </div>
  );
}

export default List;
