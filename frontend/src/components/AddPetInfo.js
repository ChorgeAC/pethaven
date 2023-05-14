import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  handleEventChange,
  loadPetInfo,
  resetPetInfo,
  loadImagePage,
  loadingOn,
  lodingOff,
} from "../features/pet/petAdd";
import { config } from "../App";
import { useEffect } from "react";
import { UploadImages } from "./index";
import PetImages from "./PetImages";
import {
  successMessage,
  erroMessage,
  warningMessage,
  ToastContainer,
} from "../utils/notification";
import { getAllPets } from "../features/pet/petCart";
import { loadFilterPets, setAllPet } from "../features/filter/filter";

const AddPetInfo = () => {
  const dispatch = useDispatch();
  const { isLoading, formData, isImagePageOpen } = useSelector(
    (store) => store.petAdd
  );
  const { pet } = useSelector((store) => store.pet);
  let { id } = useParams();

  const loadPet = () => {
    const singlePet = pet.find((item) => item._id === id);
    if (singlePet) {
      dispatch(loadPetInfo(singlePet));
    } else {
      dispatch(resetPetInfo());
    }
  };

  useEffect(() => {
    loadPet();
  }, []);

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

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch(handleEventChange({ name: name, value: value }));
  };

  const validate = () => {
    if (!formData.breeds) {
      warningMessage("Select Breed");
      return false;
    }
    if (!formData.age) {
      warningMessage("Provide Age");
      return false;
    }
    if (!formData.sex) {
      warningMessage("Provide Gender");
      return false;
    }
    if (!formData.price) {
      warningMessage("Provide Price");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        dispatch(loadingOn());
        let authToken = window.localStorage.getItem("token");
        let url = `${config.endpoint}/v1/pet/create`;
        if (formData._id) {
          url = `${config.endpoint}/v1/pet/update`;
        }
        const response = await fetch(url, {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.code === 200) {
          successMessage(data.message);
          getallPet(`${config.endpoint}/v1/pet/get`);
          dispatch(lodingOff());
        } else {
          dispatch(lodingOff());
        }
      } catch (error) {
        dispatch(lodingOff());
      }
    }
  };

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (isImagePageOpen) {
    return (
      <div className="section-center updateImageContainer">
        <UploadImages id={id} />
        <PetImages images={formData.images} />
      </div>
    );
  }

  return (
    <div className="info-form">
      <div className="form-group">
        <label htmlFor="breeds">Breed :</label>
        <select
          name="breeds"
          value={formData.breeds}
          onChange={handleChange}
          className="form-control"
        >
          {" "}
          <option value=""></option>
          <option value="labrador">Labrador</option>
          <option value="husky">Husky</option>
          <option value="beagle">Beagle</option>
          <option value="golden_retriever">Golden retriever</option>
          <option value="german_shepherd">German shepherd</option>
          <option value="rottweiler">Rottweiler</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="age">Age :</label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          className="form-control"
          min={0}
          max={20}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sex">Gender :</label>
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          className="form-control"
        >
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="height">Height : </label>
        <input
          type="number"
          name="height"
          id="height"
          value={formData.height}
          onChange={handleChange}
          className="form-control"
          min={0}
          max={120}
        />
      </div>
      <div className="form-group">
        <label htmlFor="weight">Weight : </label>
        <input
          type="number"
          name="weight"
          id="weight"
          value={formData.weight}
          onChange={handleChange}
          className="form-control"
          min={2}
          max={45}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price : </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
          min={0}
        />
      </div>
      <div className="submitContainer">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
          <ToastContainer />
        </button>
        {formData._id && (
          <button className="btn" onClick={() => dispatch(loadImagePage())}>
            Upload Images
          </button>
        )}
      </div>
    </div>
  );
};

export default AddPetInfo;
