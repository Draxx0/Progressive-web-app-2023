import { log } from "console";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { reserveGameSlot } from "../../api/db/post";
import { getPlayers, getRules, getGame } from "../../api/db/read";
import { Game, IPlayer, Rules } from "../../api/db/utils";
import Countdown from "../components/Countdown";
import { PlayerContext } from "../contexts/playerContext";

const style: any = {
  filter: "brightness(0.5)"
};

const PlayerScreen = () => {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [rules, setRules] = useState<Rules>([]);
  const [game, setGame] = useState<Game | null>(null);
  const { player, setPlayer } = useContext(PlayerContext);
  const [viewState, setViewState] = useState<{
    isFetching: boolean;
    playerIsAvailable: null | boolean;
  }>({
    isFetching: false, // repasser à true pour que ça fonctionne
    playerIsAvailable: null
  });

  useEffect(() => {
    getGame(setGame);
    getPlayers(setPlayers);
    getRules(setRules);
  }, []);

  useEffect(() => {
    if (game) {
      console.log("game :", game);
    }
  }, [game]);

  useEffect(() => {
    if (players.length && viewState.playerIsAvailable === null) {
      const playerIndex = players.findIndex((player: IPlayer) => {
        return !player.isReservedSlot;
      });

      if (playerIndex >= 0) {
        players[playerIndex].isReservedSlot = true;
      }

      setViewState({
        ...viewState,
        playerIsAvailable: playerIndex >= 0 ? true : false
      });
      console.log(players);

      setPlayers(players);
      setPlayer(players[playerIndex]);

      reserveGameSlot(players);
    }
  }, [players]);

  // GET PLAYER SLOT
  useEffect(() => {
    if (players && viewState.playerIsAvailable != null && viewState.isFetching) {
      setViewState({
        ...viewState,
        isFetching: false
      });
    }
  }, [players]);

  const handleClick = () => {
    if (game) {
      const newGame = {
        ...game,
        isTotemCatch: true,
        isGamePause: true
      };
      setGame(newGame);
    }
  };

  return (
    <div
      className="playerScreen"
      style={{ backgroundImage: `url('./assets/images/remote-menu-bg.jpg')` }}>
      {!viewState.isFetching && (
        <>
          <h1>Player Screen</h1>
          <div>
            {viewState.playerIsAvailable ? (
              <>
                <div className="buttons">
                  <img src="./assets/icons/rules.png" alt="rules" />
                  <img src="./assets/icons/sound.png" alt="sound" />
                </div>

                <div className="cooldown">
                  <img src="./assets/images/Sign.png" alt="sign" />
                  <Countdown />
                </div>
                <div className="interactions">
                  <div className="grab-button">
                    <img src="./assets/images/grab.png" alt="grab" onClick={handleClick} />
                  </div>
                  <div className="card">
                    <img
                      src="./assets/images/back-card.png"
                      alt="card"
                      style={{ filter: player.playerNumber !== game?.playerTurn ? "brightness(0.5)" : "initial" }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <p>La salle est pleine</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerScreen;
