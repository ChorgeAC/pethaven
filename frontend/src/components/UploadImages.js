import { useState } from "react";
import { config } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { closeImagePage } from "../features/pet/petAdd";
import axios from "axios";
import { getAllPets } from "../features/pet/petCart";
import { loadFilterPets, setAllPet } from "../features/filter/filter";
import {
  successMessage,
  erroMessage,
  ToastContainer,
} from "../utils/notification";
import { loadingOn, lodingOff } from "../features/pet/petAdd";

const UploadImages = ({ id }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const { isLoading } = useSelector((store) => store.petAdd);

  const getallPet = async (url) => {
    try {
      const { data } = await axios.get(url);
      dispatch(getAllPets(data));
      dispatch(setAllPet(data));
      dispatch(loadFilterPets());
      return data;
    } catch (error) {
      console.log("error...");
    }
  };

  const uploadImage = async (e) => {
    let Imagedata = new FormData();
    Imagedata.append("images", selectedImage);
    Imagedata.append("id", id);
    try {
      dispatch(loadingOn());
      let authToken = window.localStorage.getItem("token");
      const response = await fetch(`${config.endpoint}/v1/pet/images`, {
        method: "POST",
        body: Imagedata,
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = await response.json();
      if (data.code === 200) {
        successMessage(data.message);
        getallPet(`${config.endpoint}/v1/pet/get`);
        dispatch(lodingOff());
      }
    } catch (error) {
      dispatch(lodingOff());
      console.log("error");
    }
  };

  if (isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <>
      <div>
        <h1>Upload Image</h1>
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button
              className="btn"
              style={{ backgroundColor: "red" }}
              onClick={() => setSelectedImage(null)}
            >
              Remove
            </button>
          </div>
        )}
        <br />
        <br />
        <input
          type="file"
          name="images"
          className="form-control"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
        <div className="submitContainer">
          <button className="btn" onClick={uploadImage}>
            upload image
            <ToastContainer />
          </button>
          <button className="btn" onClick={() => dispatch(closeImagePage())}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadImages;
