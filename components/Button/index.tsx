import React from "react";

// import { Container } from './styles';

const Button: React.FC<{ name: string; onClick }> = ({ name, onClick }) => {
  return (
    <button
      className="
      bg-blue-500 
      hover:bg-blue-700 
      text-white 
      font-bold 
      py-2 
      px-4 
      rounded 
      focus:outline-none 
      focus:shadow-outline
    "
      type="button"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
