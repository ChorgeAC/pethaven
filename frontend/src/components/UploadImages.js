import { useState } from "react";
import { config } from "../App";

const UploadImages = ({ id }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const uploadImage = async (e) => {
    let Imagedata = new FormData();
    Imagedata.append("images", selectedImage);
    Imagedata.append("id", id);
    try {
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
      alert("Image save successfully...");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <h1>Upload and Display Image </h1>
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
      <div>
        <button className="btn" onClick={uploadImage}>
          upload image
        </button>
      </div>
    </div>
  );
};

export default UploadImages;
