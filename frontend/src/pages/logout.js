import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Import green tick icon from React Icons

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to redirect to the login page after 60 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 20000); // 20 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex justify-center flex-col bg-white px-6 pt-6 pb-4 rounded shadow text-center items-center">
        <h1 className="text-2xl font-bold mb-4">You have been logged out.</h1>
        <p className="text-gray-600 mb-2">
          You will be redirected to the login page in shortly, if not{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/login")}
          >
            click here.
          </button>
        </p>
        <AiOutlineCheckCircle className="text-green-500 text-6xl" />
      </div>
    </div>
  );
};

export default LogoutPage;
