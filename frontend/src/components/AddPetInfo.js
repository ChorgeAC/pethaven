import { useSelector, useDispatch } from "react-redux";
import {
  handleEventChange,
  loadPetInfo,
  resetPetInfo,
} from "../features/pet/petAdd";
import { config } from "../App";
import { useEffect } from "react";
import { UploadImages } from "./index";

const AddPetInfo = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.petAdd);
  const { pet } = useSelector((store) => store.pet);
  let id = window.location.pathname.split("/")[2];

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

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch(handleEventChange({ name: name, value: value }));
  };

  const validate = () => {
    if (!formData.breeds) {
      return false;
    }
    if (!formData.age) {
      return false;
    }
    if (!formData.sex) {
      return false;
    }
    if (!formData.price) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let authToken = window.localStorage.getItem("token");
        const response = await fetch(`${config.endpoint}/v1/pet/create`, {
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
        alert("Pet saved successfully...");
      } catch (error) {}
    }
  };

  const updatePetinfo = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let authToken = window.localStorage.getItem("token");
        const response = await fetch(`${config.endpoint}/v1/pet/update`, {
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
        console.log(data);
      } catch (error) {}
    }
  };

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
          min={0}
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
      <button
        type="submit"
        className="btn btn-primary"
        onClick={formData._id ? updatePetinfo : handleSubmit}
      >
        Submit
      </button>
      {formData._id && <UploadImages id={formData._id} />}
    </div>
  );
};

export default AddPetInfo;
