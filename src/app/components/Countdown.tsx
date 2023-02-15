import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";

const Countdown = () => {
  const defaultCountdown = 2;
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [isIntervalRunning, setIsIntervalRunning] = useState<boolean>(false);
  const { player } = useContext(PlayerContext);
  const { game } = useContext(GameContext);
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        game &&
        game.isGamePause === false &&
        game.playerTurn === player.playerNumber
      ) {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          console.log("CHANGE PLAYER TURN");
          setCountdown(defaultCountdown);
          updateGame({ ...game, playerTurn: game?.playerTurn === 1 ? 2 : 1 });
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    // if (player.playerNumber !== game?.playerTurn) {
    return () => clearInterval(interval);
    // }
  }, [countdown, game]);

  return (
    <div>
      {game?.playerTurn === player.playerNumber ? (
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
