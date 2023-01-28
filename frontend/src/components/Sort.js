import { BsFillGridFill, BsList } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
// import { store } from "../store";
import { setGridView, setListView } from "../features/filter/filter";

const Sort = () => {
  const { gridView } = useSelector((store) => store.filter);
  const dispatch = useDispatch();

  return (
    <div className="sortContainer">
      <div className="buttonContainer">
        <button
          className={gridView ? "active" : null}
          onClick={() => dispatch(setGridView())}
        >
          <BsFillGridFill />
        </button>
        <button
          className={!gridView ? "active" : null}
          onClick={() => dispatch(setListView())}
        >
          <BsList />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Sort;
