import React from "react";
import { AddPetInfo, Navbar, Sidebar } from "../components/index";

const PetInfo = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AddPetInfo />
    </div>
  );
};

export default PetInfo;
