import { useRef, useState } from "react";

const Tasks = () => {
  /* ================= TASK 1 ================= */
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(nameRef.current.value);
  };

  /* ================= TASK 2 ================= */
  const clearRef = useRef();

  const handleClear = () => {
    clearRef.current.value = "";
    clearRef.current.focus();
  };

  /* ================= TASK 3 ================= */
  const [count, setCount] = useState(0);
  const previousValue = useRef(0);

  const handleIncrement = () => {
    previousValue.current = count;
    setCount(count + 1);
  };

 
  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          useRef Tasks
        </h1>

        {/* ================= TASK 1 ================= */}

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            1. Get Input Value
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={nameRef}
              placeholder="Enter Name"
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>

        {/* ================= TASK 2 ================= */}

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            2. Clear Input
          </h2>

          <input
            type="text"
            ref={clearRef}
            placeholder="Type Something"
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handleClear}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            Clear Input
          </button>
        </div>

        {/* ================= TASK 3 ================= */}

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            3. Previous Value Tracker
          </h2>

          <h3 className="text-xl font-semibold mb-2">
            Current Value : {count}
          </h3>

          <h3 className="text-xl font-semibold mb-4">
            Previous Value : {previousValue.current}
          </h3>

          <button
            onClick={handleIncrement}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Increment
          </button>
        </div>

        {/* ================= TASK 4 ================= */}

        

      </div>
    </div>
  );
};

export default Tasks;