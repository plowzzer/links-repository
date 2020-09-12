import React, { TextareaHTMLAttributes } from "react";

// import { Container } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({
  className,
  label,
  name,
  ...rest
}) => {
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
      <textarea
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
        id={name}
        {...rest}
      />
    </div>
  );
};

export default Textarea;
