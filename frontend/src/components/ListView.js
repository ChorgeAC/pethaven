import { Link } from "react-router-dom";

const ListView = ({ pets }) => {
  return (
    <div className="listViewPets-container">
      {pets.map((item) => {
        const { _id, age, sex, breeds, images } = item;
        return (
          <article key={_id}>
            <img src={images[0]} alt="pic" className="rounded" />
            <div>
              <h2 className="text-xl">{breeds}</h2>
              <h4 className="text-base">
                {age} year <span>{sex}</span>
              </h4>
              <p className="mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                quam blanditiis dolores? Voluptatibus atque fuga placeat,
                voluptatum, distinctio doloremque ipsam necessitatibus doloribus
                voluptates voluptas repellendus et laborum mollitia ea maiores!
                Fuga itaque voluptates, dolorum natus quos minima expedita
                maxime ex.
              </p>
              <Link to={`/pet/${_id}`} className="btn">
                Details
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ListView;
