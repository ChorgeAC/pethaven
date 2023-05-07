import React from "react";
import { Navbar, Sidebar, PetTable } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Admin = () => {
  const { filteredPets } = useSelector((store) => store.filter);
  return (
    <div>
      <Navbar />
      <Link to={`/petInfo`} style={{ textDecoration: "none" }}>
        <div className="btn" style={{ marginLeft: "1rem" }}>
          Add Pet
        </div>
      </Link>
      <Sidebar />
      <PetTable data={filteredPets} />
    </div>
  );
};

export default Admin;
