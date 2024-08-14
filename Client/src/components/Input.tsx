import React from "react";

interface Input {
  placeholder: string;
  src: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({ placeholder, src, value, handleChange }: Input) => {
  return (
    <div className="w-fit  h-fit bg-gray-500 rounded-full flex justify-between items-center">
      {" "}
      <input
        type="text"
        placeholder={placeholder}
        className="bg-inherit w-[85%] text-gray-400 placeholder:text-gray-400 rounded-l-full py-2 px-4 font-semibold outline-none border-none"
        value={value}
        onChange={handleChange}
        required
      />
      <button type="button" className="  hover:brightness-75">
        <img src={src} className="mr-4 " alt="image" width={24} height={24} />
      </button>
    </div>
  );
};

export default Input;
