import React from "react";

const page = () => {
  return (
    <div className=" flex flex-col h-screen justify-center items-center gap-5">
      <div className="w-full max-w-xs ">
        <img
          src="/sakura.jpeg"
          alt="sakura"
          className="w-full h-full rounded-4xl"
        />
      </div>
      <h1 className="text-6xl text-purple-500 font-bold font-mono">
        The Sakura <span className="text-orange-400">Bites</span>
      </h1>
      <p className="text-3xl">Starting Soon...</p>
    </div>
  );
};

export default page;
