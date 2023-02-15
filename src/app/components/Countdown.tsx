import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { getGame } from "../../api/db/read";
import { Game } from "../../api/db/utils";
import { PlayerContext } from "../contexts/playerContext";

const Countdown = () => {
  const [countdown, setCountdown] = useState(20);
  const [game, setGame] = useState<Game | null>(null);
  const [isIntervalRunning, setIsIntervalRunning] = useState<boolean>(false);
  const { player } = useContext(PlayerContext);

  useEffect(() => {
    getGame(setGame);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0 && game?.playerTurn === 1 && game?.isGamePause === false) {
        setCountdown(countdown - 1);
      }
      if (game) {
        if (countdown === 0) {
          const newGame = {
            ...game,
            playerTurn: game?.playerTurn === 1 ? 2 : 1
          };
          setGame(newGame);
          
        }
      }
    }, 1000);
    // if (player.playerNumber !== game?.playerTurn) {
      return () => clearInterval(interval);
    // }
  }, [countdown, game]);

  return (
    <div>
      {countdown > 0 ? (
        <>
          <p className="cooldown__text">Temps restant :</p>
          <div className="cooldown__time">{countdown}</div>
        </>
      ) : (
        <>
          <p className="cooldown__text">C'est au tour de</p>
          <p className="cooldown__text">l'adversaire</p>
        </>
      )}
    </div>
  );
};

export default Countdown;
