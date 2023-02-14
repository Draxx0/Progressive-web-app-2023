import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { fillPlayer, getRules } from "../../api/db/read";
import { Rules } from "../../api/db/utils";
import { PlayerContext } from "../contexts/playerContext";

const PlayerScreen = () => {
  const [rules, setRules] = useState<Rules>([]);
  const { player, setPlayer } = useContext(PlayerContext);
  let location = useLocation();
  const path = location.pathname;
  console.log("player context in remote view :", player);

  useEffect(() => {
    fillPlayer(setPlayer, path);
    getRules(setRules);
  }, []);

  useEffect(() => {
    if (rules) {
      console.log(rules);
    }
  }, [rules]);
  return (
    <>
      <h1>Player Screen</h1>
    </>
  );
};

export default PlayerScreen;
