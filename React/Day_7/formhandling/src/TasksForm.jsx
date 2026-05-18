import { useState } from "react";

const TasksForm = () => {
  // Task 1
  const [name, setName] = useState("");

  // Task 2
  const [email, setEmail] = useState("");

  // Task 3
  const [password, setPassword] = useState("");

  // Task 4
  const [upperText, setUpperText] = useState("");

  // Task 5
  const [countText, setCountText] = useState("");

  // Task 6
  const [number, setNumber] = useState("");

  // Task 7
  const [reverseText, setReverseText] = useState("");

  // Task 8
  const [buttonInput, setButtonInput] = useState("");

  // Task 9
  const [typing, setTyping] = useState("");

  // Task 10
  const [displayText, setDisplayText] = useState("");
  const [result, setResult] = useState("");

  const handleDisplay = () => {
    setResult(displayText);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
          React useState Tasks
        </h1>

        {/* Task 1 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 1 - Live Name Display</h2>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <p className="mt-3 text-green-600 font-semibold">
            {name}
          </p>
        </div>

        {/* Task 2 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 2 - Email Validation</h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <p className="mt-3 text-blue-600 font-semibold">
            {email === "" ? "Enter Email" : email}
          </p>
        </div>

        {/* Task 3 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 3 - Password Strength</h2>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <p className="mt-3 font-semibold text-red-500">
            {password.length < 6 ? "Weak" : "Strong"}
          </p>
        </div>

        {/* Task 4 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 4 - Uppercase</h2>

          <input
            type="text"
            placeholder="Enter Text"
            value={upperText}
            onChange={(e) => setUpperText(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <p className="mt-3 font-semibold text-purple-600">
            {upperText.toUpperCase()}
          </p>
        </div>

        {/* Task 5 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 5 - Character Count</h2>

          <input
            type="text"
            placeholder="Enter Text"
            value={countText}
            onChange={(e) => setCountText(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <p className="mt-3 font-semibold text-orange-600">
            Character Count: {countText.length}
          </p>
        </div>

        {/* Task 6 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 6 - Even or Odd</h2>

          <input
            type="number"
            placeholder="Enter Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <p className="mt-3 font-semibold text-pink-600">
            {number === ""
              ? ""
              : number % 2 === 0
              ? "Even"
              : "Odd"}
          </p>
        </div>

        {/* Task 7 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 7 - Reverse Text</h2>

          <input
            type="text"
            placeholder="Enter Text"
            value={reverseText}
            onChange={(e) => setReverseText(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <p className="mt-3 font-semibold text-indigo-600">
            {reverseText.split("").reverse().join("")}
          </p>
        </div>

        {/* Task 8 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 8 - Disable Button</h2>

          <input
            type="text"
            placeholder="Enter Something"
            value={buttonInput}
            onChange={(e) => setButtonInput(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <button
            disabled={buttonInput === ""}
            className={`mt-4 px-6 py-3 rounded text-white font-semibold ${
              buttonInput === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Submit
          </button>
        </div>

        {/* Task 9 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">Task 9 - Typing Status</h2>

          <input
            type="text"
            placeholder="Start Typing"
            value={typing}
            onChange={(e) => setTyping(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <p className="mt-3 font-semibold text-teal-600">
            {typing === "" ? "No Input" : "Typing..."}
          </p>
        </div>

        {/* Task 10 */}
        <div className="mb-8">
          <h2 className="font-bold mb-2">
            Task 10 - Display on Button Click
          </h2>

          <input
            type="text"
            placeholder="Enter Text"
            value={displayText}
            onChange={(e) => setDisplayText(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <button
            onClick={handleDisplay}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-semibold"
          >
            Display
          </button>

          <p className="mt-3 font-semibold text-blue-700">
            {result}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TasksForm;