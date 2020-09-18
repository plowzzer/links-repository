import React from "react";

// import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <div className="border border-gray-300 shadow rounded-md max-w-sm w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 p-4">
          <div className="bg-gray-400 h-20 w-full"></div>
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded"></div>
            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
