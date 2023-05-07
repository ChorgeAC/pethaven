import { useSelector, useDispatch } from "react-redux";
import { updateFilter } from "../features/filter/filter";
import { useState } from "react";

const Filter = () => {
  const dispatch = useDispatch();
  const { allPets } = useSelector((store) => store.filter);
  const [breederFilter, setBreederFilter] = useState([]);

  const handleEventChange = (e) => {
    let breed = e.target.id;
    if (breed !== "all" && e.target.checked) {
      let tempArr = [...breederFilter];
      if (!tempArr.includes(breed)) {
        tempArr = [...tempArr, breed];
      }
      setBreederFilter(tempArr);
      dispatch(updateFilter(tempArr));
    } else if (breed !== "all" && !e.target.checked) {
      let tempArr = [...breederFilter];
      if (tempArr.length === 1) {
        tempArr = allPets.map((item) => item.breeds);
        setBreederFilter([]);
        dispatch(updateFilter(tempArr));
      } else {
        if (tempArr.includes(breed)) {
          tempArr = tempArr.filter((item) => item !== breed);
        }
        setBreederFilter(tempArr);
        dispatch(updateFilter(tempArr));
      }
    } else if (breed === "all" && e.target.checked) {
      let tempArr = allPets.map((item) => item.breeds);
      setBreederFilter([]);
      dispatch(updateFilter(tempArr));
    }
  };

  return (
    <div className="section-center">
      <h3>Breeds</h3>
      <div className="breederContainer">
        <div>
          <input
            type="checkbox"
            id="all"
            checked={breederFilter.length === 0 ? true : false}
            onChange={(e) => handleEventChange(e)}
          ></input>
          <span style={{ marginLeft: "0.5rem" }}>all</span>
        </div>
        {[...new Set(allPets.map((item) => item.breeds))].map(
          (breeds, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={breeds}
                  checked={breederFilter.includes(breeds)}
                  onChange={(e) => handleEventChange(e)}
                ></input>
                <span style={{ marginLeft: "0.5rem" }}>{breeds}</span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Filter;
