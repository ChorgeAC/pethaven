import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { config } from "../App";

const rowsPerPage = 10;

const PetTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  // const [selectedRow, setSelectedRow] = useState(null);
  // const [selectedCol, setSelectedCol] = useState(null);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // const handleCellClick = (rowIndex, colIndex) => {
  //   setSelectedRow(rowIndex);
  //   setSelectedCol(colIndex);
  // };

  // const handleFillIn = (value) => {
  //   // update the data with the new value
  //   const updatedData = [...data];
  //   updatedData[selectedRow][selectedCol] = value;
  //   // reset the selection
  //   setSelectedRow(null);
  //   setSelectedCol(null);
  // };

  const handlePetRemove = async (id) => {
    try {
      let authToken = window.localStorage.getItem("token");
      const response = await fetch(`${config.endpoint}/v1/pet/delete`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      alert(data);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="petTableContainer">
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
            .map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>
                  <td>{row.breeds}</td>
                  <td>{row.age}</td>
                  <td>{row.sex}</td>
                  <td>{row.price} ₹</td>
                  <td className="actionContainer">
                    <button
                      className="deleteBtn"
                      onClick={() => handlePetRemove(row._id)}
                    >
                      <BiTrash />
                    </button>
                    <Link to={`/petInfo/${row._id}`}>
                      <button
                        className="editBtn"
                        style={{ marginLeft: "1rem" }}
                      >
                        <FiEdit />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => setCurrentPage(index)}>
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PetTable;
