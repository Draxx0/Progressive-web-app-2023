import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { getRules } from "../../api/db/read";
import {  Rules } from "../../api/db/utils";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";

const Countdown = () => {
  const [rules, setRules] = useState<any>({});
  useEffect(() => {
    getRules(setRules);
  }, []);

  useEffect(() => {
    setCountdown(rules.delayToPlay);
  }, [rules]);

  const [countdown, setCountdown] = useState<number | null>(null);
  const { player } = useContext(PlayerContext);
  const { game } = useContext(GameContext);

  useEffect(() => {
   if(countdown) {
    const interval = setInterval(() => {
      if (
        game &&
        game.isGamePause === false &&
        game.playerTurn === player.playerNumber
      ) {
        if (countdown && countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          setCountdown(rules.delayToPlay);
          updateGame({ ...game, playerTurn: game?.playerTurn === 1 ? 2 : 1 });
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
   }
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
