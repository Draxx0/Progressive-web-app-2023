import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { reserveGameSlot } from "../../api/db/post";
import { getPlayers, getRules } from "../../api/db/read";
import { IPlayer, Rules } from "../../api/db/utils";
import { PlayerContext } from "../contexts/playerContext";

const PlayerScreen = () => {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [rules, setRules] = useState<Rules>([]);
  const { player, setPlayer } = useContext(PlayerContext);
  const [viewState, setViewState] = useState<{
    isFetching: boolean;
    playerIsAvailable: null | boolean;
  }>({
    isFetching: true,
    playerIsAvailable: null,
  });

  useEffect(() => {
    getPlayers(setPlayers);
    getRules(setRules);
  }, []);

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
        playerIsAvailable: playerIndex >= 0 ? true : false,
      });
      console.log(players);

      setPlayers(players);
      setPlayer(players[playerIndex]);

      reserveGameSlot(players);
    }
  }, [players]);

  // GET PLAYER SLOT
  useEffect(() => {
    if (
      players &&
      viewState.playerIsAvailable != null &&
      viewState.isFetching
    ) {
      setViewState({
        ...viewState,
        isFetching: false,
      });
    }
  }, [players]);

  return (
    <>
      {!viewState.isFetching ? (
        <>
          <h1>Player Screen</h1>
          <div>
            {viewState.playerIsAvailable ? (
              <p className="ready">Ready to play</p>
            ) : (
              <p>Salle d'attente</p>
            )}
          </div>
        </>
      ) : (
        <p>Une partie est déjà en cours</p>
      )}
    </>
  );
};

export default PlayerScreen;
