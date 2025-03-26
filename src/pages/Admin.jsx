import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!user || !token) {
        // toast.error("session expired");
      } else {
        navigate("/dashboard");
      }

      setLoading(false);
    };

    checkToken();
  }, []);
  const API_URL =
    "https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=login";

  const handleLogin = async () => {
    if (!mobile || !password) {
      toast.error("Please enter both ID and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&loginId=${mobile}&pass=${password}`);
      const data = await response.json();

      if (data.data.status === "success") {
        localStorage.setItem("user", data.data.user);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("name", data.data.name);
        toast.success("Login successful!");
        navigate("/dashboard"); // Redirect to home page
      } else {
        toast.error(data.message || "Invalid login credentials.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setMobile("");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <div
      className="hero bg-base-200 min-h-screen flex items-center justify-center "
      style={{ width: "100vw" }}>
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl">
        <div className="text-center lg:text-left">
          <h3 className="text-5xl font-bold">Admin Panel</h3>
          <p className="py-6">Loyalty program by The Mobile Care, Bina</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
          <fieldset className="fieldset space-y-4">
            <label className="fieldset-label">ID</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter ID here"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <label className="fieldset-label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-neutral mt-4 w-full"
              onClick={handleLogin}
              disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Get Started"}
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default Admin;
