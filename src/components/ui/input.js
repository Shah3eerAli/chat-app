import React from "react";

const Input = ({ type, name, placeholder, register }) => {
  return (
    <input
      className="rounded-md appearance-none border-none bg-[#111b21]  px-6 py-2 text-center text-inherit placeholder-slate-600 shadow-lg outline-none backdrop-blur-md"
      type={type || "text"}
      {...register(name)}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
