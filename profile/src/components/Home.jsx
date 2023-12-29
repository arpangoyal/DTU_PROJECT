import React from "react";
import homebg from "../assets/dtu3.png"
import Carousal from "./Carousal";
const Home = () => {
  return (
    <div>
      <div className="p-4 mt-2 h-screen flex justify-center items-center text-center font-mono"
        style={{
          backgroundImage: `url(${homebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      >
          <p className="sm:text-sm md:text-xl lg:text-3xl text-white font-bold">
           amarnath ab bhi nhi dikh raha kya????<br/>
           ans- na bhai 
          </p>
      </div>
      <div className="w-4/5">
        <Carousal/>

      </div>
    </div>
  );
};

export default Home;