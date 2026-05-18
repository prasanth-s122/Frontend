import { useState } from "react";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        
        <h1
          className={`text-3xl font-bold mb-5 ${
            isLoggedIn ? "text-green-600" : "text-red-600"
          }`}
        >
          {isLoggedIn ? "Welcome User" : "Please Login"}
        </h1>

        <button
          onClick={handleToggle}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ${
            isLoggedIn
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;