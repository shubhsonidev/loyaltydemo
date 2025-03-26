import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

function Details() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center p-6 bg-base-100 min-h-screen">
      {/* Store Info */}
      <p className="text-4xl font-bold text-primary">The Mobile Care</p>
      <p className="text-gray-600 text-center mt-2 w-4/5 md:w-1/2">
        Mobile Care is a leading mobile and accessories store, offering the latest gadgets and premium accessories.
      </p>
      {/* Store Timing Button */}
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary flex items-center gap-2 mt-4">
        <IoMdTime size={20} />
        View Store Timings
      </button>
      {/* Address */}
      <p className="text-gray-700 mt-4 font-medium">📍 Temporary Address: 123, Market Street, City, Country</p>
      {/* Social Media Icons */}
      <div className="flex gap-6 mt-6">
        <a
          href="#"
          className="text-blue-600 hover:text-blue-800 transition">
          <FaFacebook size={30} />
        </a>
        <a
          href="#"
          className="text-pink-500 hover:text-pink-700 transition">
          <FaInstagram size={30} />
        </a>
        <a
          href="#"
          className="text-blue-400 hover:text-blue-600 transition">
          <FaTwitter size={30} />
        </a>
      </div>
      {/* Store Timings Modal using DaisyUI */}
      {showModal && (
        <dialog
          open
          className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">Store Timings</h2>
            <p>
              📅 Monday - Saturday: <b>10 AM - 8 PM</b>
            </p>
            <p>
              ⛔ Sunday: <b>Closed</b>
            </p>
            <div className="modal-action">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-error">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Details;
