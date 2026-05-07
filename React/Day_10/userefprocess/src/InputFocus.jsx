import { useRef } from "react";

const InputFocus = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter something..."
        className="border p-2 rounded"
      />

      <button
        onClick={focusInput}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Focus Input
      </button>
    </div>
  );
}

export default InputFocus;