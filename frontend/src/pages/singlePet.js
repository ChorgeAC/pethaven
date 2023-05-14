import React from "react";
import { SinglePetInfo, Navbar, Sidebar } from "../components/index";

const SinglePet = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SinglePetInfo />
    </div>
  );
};

export default SinglePet;
