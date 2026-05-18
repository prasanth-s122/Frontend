import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          useState Example
        </h1>

        {/* Name Input */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
          />

          <p className="mt-2 text-green-600 font-medium">
            {name}
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
          />

          <p className="mt-2 text-purple-600 font-medium">
            {email === "" ? "Enter Email" : email}
          </p>
        </div>

        {/* Counter */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold mb-5">
            Count : {count}
          </h2>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCount(count + 1)}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Increment
            </button>

            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Decrement
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;