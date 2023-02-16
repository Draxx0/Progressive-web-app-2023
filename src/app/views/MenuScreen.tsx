import { useContext, useEffect, useState } from "react";
import { updateGame } from "../../api/db/post";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";

const MenuScreen = ({
  username,
  setUsername
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { game } = useContext(GameContext);
  const [credentials, setCredentials] = useState<string>("");
  const { player } = useContext(PlayerContext);

  const handleSubmit = () => {
    setUsername(credentials);
    if (game) {
      const newPlayers = game.players;
      newPlayers[player.playerNumber - 1].playerName = credentials;
      updateGame({ ...game, players: newPlayers });
    }
  };

  return (
    <>
      <div className="userName">
        <img src="./assets/images/userName-input.png" alt="userName" className="userName__image" />
        <input
          type="text"
          placeholder="Enter username"
          onChange={e => setCredentials(e.target.value)}
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
        <img src="./assets/images/feuilleu.png" alt="feuille" className="feuille__image" />
      </div>
    </>
  );
};

export default MenuScreen;
