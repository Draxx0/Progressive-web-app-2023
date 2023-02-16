import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { getRules } from "../../api/db/read";
import { Rules } from "../../api/db/utils";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";

const Countdown = () => {
  const [rules, setRules] = useState<any>({}); // type à changer voir rémi
  useEffect(() => {
    getRules(setRules);
  }, [rules]);

  let defaultCountdown = rules.delayToPlay;

  const [countdown, setCountdown] = useState(defaultCountdown);
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
          setCountdown(defaultCountdown);
          updateGame({ ...game, playerTurn: game?.playerTurn === 1 ? 2 : 1 });
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
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
          <p className="cooldown__text">
            C'est au tour <br /> de l'adversaire
          </p>
        </>
      )}
    </div>
  );
};

export default Countdown;
