import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuScreen = () => {
  const [username, setUsername] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try {
     
    } catch (error) {
      console.log(error);
    }
    // navigate(`/`);
  };

  return (
    <div className="menu-screen">
      <h1>Menu Screen</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="submit" value="play" />
      </form>
      <div className="image-feuille">
        <img src="./assets/images/feuilleu.png" alt="feuille" />
      </div>
    </div>
  );
};

export default MenuScreen;
