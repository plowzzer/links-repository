import React, { InputHTMLAttributes } from "react";

// import { Container } from './styles';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ className, label, name, ...rest }) => {
  return (
    <div className={className}>
      <label
        className="
          block
          text-gray-700
          text-sm 
          font-bold 
          mb-2
        "
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="
          shadow 
          appearance-none 
          border 
          rounded 
          w-full 
          py-2 
          px-3 
          text-gray-700 
          leading-tight 
          focus:outline-none 
          focus:shadow-outline
        "
        type="text"
        id={name}
        {...rest}
      />
    </div>
  );
};

export default Input;
