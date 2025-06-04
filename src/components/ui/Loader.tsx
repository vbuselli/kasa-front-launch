import React from "react";

const Loader = () => {
  return (
    <div className="col-span-full flex justify-center items-center py-12">
      <span className="loader border-4 border-t-4 border-green-400 border-t-transparent rounded-full w-12 h-12 animate-spin"></span>
    </div>
  );
};

export default Loader;
