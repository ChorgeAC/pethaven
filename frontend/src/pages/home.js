import { Navbar, FeaturedPet, Filter, Sort } from "../components/";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mainPetContainer">
        <Filter />
        <div className="section-center">
          <Sort />
          <FeaturedPet />
        </div>
      </div>
    </>
  );
};

export default Home;
