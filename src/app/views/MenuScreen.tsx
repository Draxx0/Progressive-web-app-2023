import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/gameContext";

const MenuScreen = ({
  username,
  setUsername,
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { game, setGame } = useContext(GameContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<string>("");

  const handleSubmit = () => {
    const gamePlayer = game?.players.find((player) => player.playerNumber); 
    setUsername(credentials);
  };

  return (
    <>
      <div className="userName">
        <img
          src="./assets/images/userName-input.png"
          alt="userName"
          className="userName__image"
        />
        <input
          type="text"
          placeholder="Enter username"
          onBlur={(e) => setCredentials(e.target.value)}
          className="userName__input"
        />
      </div>
      <div className="roche">
        <img
          src="./assets/images/button-ok.png"
          alt="roche"
          className="roche__image"
          onClick={handleSubmit}
        />
      </div>
      <div className="feuille">
        <img
          src="./assets/images/feuilleu.png"
          alt="feuille"
          className="feuille__image"
        />
      </div>
    </>
  );
};

export default MenuScreen;
