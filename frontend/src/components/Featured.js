import axios from "axios";
import { useEffect } from "react";
import { config } from "../App";
import { useSelector, useDispatch } from "react-redux";
import GridView from "./GridView";
import ListView from "./ListView";
import { loadFilterPets, setAllPet } from "../features/filter/filter";
import { getAllPets } from "../features/pet/petCart";

const FeaturedPet = () => {
  const dispatch = useDispatch();
  const { gridView, filteredPets } = useSelector((store) => store.filter);

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

  useEffect(() => {
    getallPet(`${config.endpoint}/v1/pet/get`);
    // eslint-disable-next-line
  }, []);

  if (filteredPets && filteredPets.length < 1) {
    return <div className="loading">loading...</div>;
  }

  if (gridView) {
    return <GridView pets={filteredPets} className="section-center" />;
  }
  return <ListView pets={filteredPets} />;
};

export default FeaturedPet;
