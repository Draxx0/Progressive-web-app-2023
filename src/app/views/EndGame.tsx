import { GameContext } from "../contexts/gameContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const EndGame = () => {
  const { game } = useContext(GameContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!game?.winner) {
      navigate("/game");
    }
  }, [game?.winner]);
  return (
    <div
      className="endGame"
      style={{
        backgroundImage: `url('./assets/images/end-game-back.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="endTexte">
        <img
          src="./assets/images/back-text-end-game.png"
          alt="end-game"
          className="endTexte__image"
        />
        <h1>La partie est fini</h1>
        <p>Merci d'avoir jouer</p>
        <p>Et bravo à {game?.winner}</p>
      </div>
    </div>
  );
};

export default EndGame;
