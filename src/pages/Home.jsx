import { useEffect, useRef, useState } from "react";
import History from "../components/History";
import LoyaltyCard from "../components/LoyaltyCard";

function Home() {
  const [points, setPoints] = useState(null);
  const [number, setNumber] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvedRequest, setApprovedRequest] = useState([]);
  const [redeemed, setRedeemed] = useState([]);

  const hasFetchedData = useRef(false); // Prevents multiple API calls

  useEffect(() => {
    if (hasFetchedData.current) return; // Prevent re-fetching on route change
    const numberfe = localStorage.getItem("number");
    const token = localStorage.getItem("token");
    const fetchPoints = async () => {
      if (!numberfe || !token) {
        setError("Mobile number or token is missing.");
        setLoading(false);
        return;
      }

      setNumber(numberfe);
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycby0BiPaq5Jb_tcD_OsMjBO8M-HyCK6bEe1hsHha266oG4WS1VwW0rlZZ8N85ulnme1vLg/exec?apifor=fetchPoints&mobile=${numberfe}&token=${token}`
        );

        const data = await response.json();

        if (response.ok) {
          setPoints(data.totalPoints);
          setName(data.name);
          setApprovedRequest([...data.approvedRequests]);
          setRedeemed([...data.redeemedHistory]);
          hasFetchedData.current = true; // Mark data as fetched
        } else {
          setError(data.error || "Failed to fetch points.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">
      <LoyaltyCard
        number={number || "Unknown"}
        name={loading ? <span className="loading loading-spinner loading-xl"></span> : error ? "N/A" : name}
        points={loading ? <span className="loading loading-spinner loading-xl"></span> : error ? "N/A" : points}
      />

      <div
        className="mt-5 w-96"
        style={{ height: "59vh" }}>
        <History
          approved={loading ? [] : approvedRequest}
          redeemed={loading ? [] : redeemed}
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default Home;
