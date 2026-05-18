import { useState } from "react";

const ShowHide = () => {
  const [showText, setShowText] = useState(false);

  const handleToggle = () => {
    setShowText(!showText);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">

        <h1 className="text-3xl font-bold mb-5 text-blue-600">
          {showText ? "Hello 👋" : "Text Hidden"}
        </h1>

        <button
          onClick={handleToggle}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ${
            showText
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {showText ? "Hide Text" : "Show Text"}
        </button>

      </div>
    </div>
  );
};

export default ShowHide;