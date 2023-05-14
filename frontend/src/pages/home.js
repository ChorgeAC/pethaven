import {
  Navbar,
  FeaturedPet,
  Filter,
  Sort,
  Sidebar,
} from "../components/index";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
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
