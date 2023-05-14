import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, useParams } from "react-router-dom";
import { config } from "../App";
import { loadingOn, lodingOff } from "../features/pet/petAdd";
import { useSelector, useDispatch } from "react-redux";
import {
  successMessage,
  erroMessage,
  ToastContainer,
} from "../utils/notification";

const PetImages = ({ images }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  let isAdmin;
  if (token) {
    isAdmin = jwt_decode(token).isAdmin;
  }
  let { id } = useParams();
  const [main, setMain] = useState(images[0]);

  let subPath = useLocation().pathname.split("/")[1];

  useEffect(() => {
    setMain(images[0]);
  }, [images]);

  const removeImage = async (imageUrl) => {
    let authToken = window.localStorage.getItem("token");
    try {
      dispatch(loadingOn());
      const response = await fetch(`${config.endpoint}/v1/pet/remove/image`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ imageUrl, id }),
      });
      const data = await response.json();
      if (data.code === 200) {
        successMessage(data.message);
        dispatch(lodingOff());
      }
      if (data.code === 401) {
        erroMessage(data.message);
        dispatch(lodingOff());
      }
    } catch (error) {
      dispatch(lodingOff());
      console.log("error");
    }
  };

  if (images.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <img src={main} alt="" className="mainImage" />
      {isAdmin && subPath === "petInfo" && (
        <button
          className="deleteBtn"
          style={{ marginTop: "1rem" }}
          onClick={() => removeImage(main)}
        >
          Remove Image
          <ToastContainer />
        </button>
      )}
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              alt=""
              className={main === image ? "active" : null}
              onClick={() => setMain(images[index])}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PetImages;
