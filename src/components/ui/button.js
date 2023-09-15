import React from "react";

const Button = ({ type, text }) => {
  return (
    <button
      type={type || "submit"}
      className="rounded-3xl bg-[#00a884] px-10 py-2 text-white outline-none  hover:bg-[#25695b]"
    >
      {text}
    </button>
  );
};

export default Button;
