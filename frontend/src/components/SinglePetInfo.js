import { useSelector, useDispatch } from "react-redux";
import { loadPetInfo, resetPetInfo } from "../features/pet/petAdd";
import { useEffect } from "react";
import PetImages from "./PetImages";
import { useParams } from "react-router-dom";

const SinglePetInfo = () => {
  const dispatch = useDispatch();
  const { pet } = useSelector((store) => store.pet);
  const { formData } = useSelector((store) => store.petAdd);
  let { id } = useParams();

  const loadPet = (id) => {
    const singlePet = pet.find((item) => item._id === id);
    if (singlePet) {
      dispatch(loadPetInfo(singlePet));
    } else {
      dispatch(resetPetInfo());
    }
  };

  useEffect(() => {
    loadPet(id);
    // eslint-disable-next-line
  }, [id]);

  if (formData.images && formData.images.length < 1) {
    return <div className="loading"></div>;
  }

  return (
    <>
      <div className="section-center product-center">
        {<PetImages images={formData.images} />}
        <div className="dog-info">
          <h1 style={{ textTransform: "capitalize" }}>{formData.breeds}</h1>
          <p>Age : {formData.age} Year</p>
          <p>Gender : {formData.sex}</p>
          <p>Height : {formData.height} cm</p>
          <p>Weight : {formData.weight} Kg</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            labore, perferendis nihil veniam modi quam odio dolore tempore
            necessitatibus provident.
          </p>
          <h1>Price : {formData.price.toLocaleString()} ₹</h1>
        </div>
      </div>
    </>
  );
};

export default SinglePetInfo;
