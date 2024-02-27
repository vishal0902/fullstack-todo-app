import React from "react";

function Loader(){
  return (
    <div className="z-50 top-0 left-0 w-10 h-10 justify-center items-center">
      <div className="flex space-x-1 justify-center items-center bg-transparent dark:invert  ">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

export default Loader;
