
// Loader.tsx
import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative w-[50px] h-[50px]">
        <div className="absolute w-full h-full border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-[60px] text-primary text-base text-center">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
