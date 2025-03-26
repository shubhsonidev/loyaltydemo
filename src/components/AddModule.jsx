import { useState } from "react";
import { toast } from "react-toastify";

function AddModule() {
  const [newRequest, setNewRequest] = useState({
    name: "",
    number: "",
    amount: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [name, setname] = useState(localStorage.getItem("name"));
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPoints = () => {
    if (!newRequest.name || !newRequest.number || !newRequest.amount) {
      toast.warning("All fields are required.");
      return;
    }

    if (!/^\d{10}$/.test(newRequest.number)) {
      toast.warning("Invalid phone number! Must be 10 digits.");
      return;
    }

    if (isNaN(newRequest.amount) || parseInt(newRequest.amount) <= 0) {
      toast.warning("Points must be a valid number greater than 0.");
      return;
    }

    if (!token) {
      toast.error("Authentication token missing. Please login again.");
      return;
    }

    let url = `https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=addRequest&token=${token}&name=${newRequest.name}&number=${newRequest.number}&amount=${newRequest.amount}&by=${user}&status=pending`;

    setBtnLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Points added successfully!");
          setNewRequest({ name: "", number: "", amount: "" });
        } else {
          toast.error(data.message || "Something went wrong.");
          setNewRequest({ name: "", number: "", amount: "" });
        }
      })
      .catch((error) => console.error("Error adding points:", error))
      .finally(() => setBtnLoading(false));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">Hii {name}</h2>
      <h2 className="text-lg font-semibold text-center mb-4">Add Points</h2>

      <input
        disabled={btnLoading}
        type="text"
        name="name"
        placeholder="Name"
        value={newRequest.name}
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />

      <input
        disabled={btnLoading}
        type="number"
        name="number"
        placeholder="Phone Number"
        value={newRequest.number}
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
        pattern="[0-9]*"
        inputMode="numeric"
      />

      <input
        disabled={btnLoading}
        type="number"
        name="amount"
        placeholder="Amount"
        value={newRequest.amount}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />

      <button
        onClick={handleAddPoints}
        className="btn btn-primary w-full"
        disabled={btnLoading}>
        {btnLoading ? "Adding..." : "Add Points"}
      </button>
    </div>
  );
}

export default AddModule;
