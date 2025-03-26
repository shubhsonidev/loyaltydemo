import { FaRegCreditCard } from "react-icons/fa";

const LoyaltyCard = ({ name, points, number }) => {
  return (
    <div className="relative w-96 h-48 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg text-white p-5 flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-md font-semibold">My Loyalty Points Card</h2>
        <div className="avatar opacity-75">
          <div className="w-12 rounded">
            <img
              src="https://raw.githubusercontent.com/shubhsonidev/content/main/themobilecare.png"
              alt="Tailwind-CSS-Avatar-component"
            />
          </div>
        </div>
        {/* <FaRegCreditCard className="text-2xl opacity-50" /> */}
      </div>

      <div className="flex flex-col">
        <p className="text-2xl font-bold ">{name}</p>
        <p className="text-sm font-bold opacity-75 ">{number}</p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-200">Points Earned</p>
        <p className="text-3xl font-semibold">{points}</p>
      </div>
    </div>
  );
};

export default LoyaltyCard;
