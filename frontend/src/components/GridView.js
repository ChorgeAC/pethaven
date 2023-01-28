import Pet from "./Pet";
const GridView = ({ pets }) => {
  return (
    <main>
      <div className="GridViewPets-container">
        {pets.map((item) => {
          return <Pet key={item._id} {...item} />;
        })}
      </div>
    </main>
  );
};

export default GridView;
