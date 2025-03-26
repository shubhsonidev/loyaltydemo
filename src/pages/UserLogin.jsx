import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const number = localStorage.getItem("number");
      const token = localStorage.getItem("token");

      if (!number || !token) {
        // toast.error("session expired");
      } else {
        navigate("/home");
      }

      setLoading(false);
    };

    checkToken();
  }, []);
  const API_URL =
    "https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=userLogin";

  const handleLogin = async () => {
    if (!mobile || !password) {
      toast.error("Please enter both mobile number and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&mobile=${mobile}&pass=${password}`);
      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("number", data.number);
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate("/home"); // Redirect to home page
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
          <div className="avatar ">
            <div className="w-32 rounded">
              <img
                src="https://raw.githubusercontent.com/shubhsonidev/content/main/themobilecare.png"
                alt="Logo"
              />
            </div>
          </div>
          {/* <p className="text-2xl font-bold mb-10">The Mobile Care,Bina</p> */}

          <h3 className="text-5xl font-bold">Get Started</h3>
          <p className="py-6">Loyalty program by The Mobile Care, Bina</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
          <fieldset className="fieldset space-y-4">
            <label className="fieldset-label">Mobile Number</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter Mobile Number"
              value={mobile}
              pattern="[0-9]*"
              onChange={(e) => setMobile(e.target.value)}
            />
            <label className="fieldset-label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter Last 5 Digits"
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

export default UserLogin;
