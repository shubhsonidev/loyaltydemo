import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Employee() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnloading, setbtnloading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [redeemPoints, setRedeemPoints] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    pass: "",
    name: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    let token = localStorage.getItem("token");

    fetch(
      "https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=fetchEmployees&token=" +
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
  };

  const handleRedeemClick = (entry) => {
    setSelectedEntry(entry);
    setRedeemPoints("");
    document.getElementById("redeem_modal").showModal();
  };

  const handleRedeem = () => {
    setbtnloading(true);
    if (!redeemPoints || redeemPoints <= 0) {
      toast.warning("Please enter a valid number of points.");
      setbtnloading(false);
      return;
    }

    let token = localStorage.getItem("token");
    fetch(
      `https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=deductIncentive&token=${token}&uuid=${selectedEntry.uuid}&deductAmount=${redeemPoints}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Incentive deducted successfully!");
          document.getElementById("redeem_modal").close();
          fetchEmployees();
        } else {
          toast.error(data.message);
          document.getElementById("redeem_modal").close();
        }
      })
      .catch((error) => console.error("Error deducting incentive:", error))
      .finally(() => setbtnloading(false));
  };

  const handleAddEmployee = () => {
    if (!newEmployee.id || !newEmployee.pass || !newEmployee.name) {
      toast.warning("All fields are required.");
      return;
    }

    let token = localStorage.getItem("token");
    let url = `https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=createEmployee&token=${token}&id=${newEmployee.id}&pass=${newEmployee.pass}&name=${newEmployee.name}`;

    setbtnloading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Employee added successfully!");
          document.getElementById("add_employee_modal").close();
          fetchEmployees();
          setNewEmployee({ id: "", pass: "", name: "" });
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.error("Error adding employee:", error))
      .finally(() => setbtnloading(false));
  };

  return (
    <div className="p-4">
      {/* Header with Add Employee Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employee Master</h2>
        <button
          onClick={() => document.getElementById("add_employee_modal").showModal()}
          className="btn btn-sm btn-success"
          style={{ color: "white" }}>
          Add Employee
        </button>
      </div>

      {/* Employee Table */}
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
                <th>Id</th>
                <th>Pass</th>
                <th>Incentive</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{entry.name}</td>
                  <td>{entry.id}</td>
                  <td>{entry.pass}</td>
                  <td>{entry.incentive}</td>
                  <td>
                    <button
                      onClick={() => handleRedeemClick(entry)}
                      className="btn btn-sm btn-primary">
                      Deduct
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
            <button
              onClick={handleRedeem}
              className="btn btn-primary"
              disabled={btnloading}>
              {btnloading ? <span className="loading loading-spinner"></span> : "Redeem"}
            </button>
          </div>
        </div>
      </dialog>

      {/* Add Employee Modal */}
      <dialog
        id="add_employee_modal"
        className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Employee</h3>
          <p className="py-2">Enter employee details:</p>
          <input
            type="text"
            value={newEmployee.id}
            onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
            className="input input-bordered w-full mb-2"
            placeholder="Id"
          />
          <input
            type="password"
            value={newEmployee.pass}
            onChange={(e) => setNewEmployee({ ...newEmployee, pass: e.target.value })}
            className="input input-bordered w-full mb-2"
            placeholder="Password"
          />
          <input
            type="text"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="input input-bordered w-full mb-4"
            placeholder="Employee Name"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button
              onClick={handleAddEmployee}
              className="btn btn-success"
              disabled={btnloading}>
              {btnloading ? <span className="loading loading-spinner"></span> : "Add Employee"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Employee;
