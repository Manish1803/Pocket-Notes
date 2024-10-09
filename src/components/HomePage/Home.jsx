import "./Home.css";
import { BiSolidLock } from "react-icons/bi";
const Home = () => {
  return (
    <section className="home">
      <img src="./bgimage.png" alt="Home Screen Image" />
      <h1>Pocket Notes</h1>
      <p className="sub-text">
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone.
      </p>
      <p className="encrypted">
        <BiSolidLock size="1.5rem" />
        end-to-end encrypted
      </p>
    </section>
  );
};

export default Home;
