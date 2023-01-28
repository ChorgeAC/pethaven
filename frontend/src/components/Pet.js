import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Pet = ({ _id, age, sex, breeds, images, price }) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="imageConatiner">
        <img src={images[0]} alt={age} />
        <Link to={`/pets/${_id}`} className="link">
          <FaSearch />
        </Link>
      </div>
      <footer className="petFooter">
        <h5>{age} year</h5>
        <p>
          <span>{breeds} </span>
          {sex}
        </p>
      </footer>
    </div>
  );
};

export default Pet;
