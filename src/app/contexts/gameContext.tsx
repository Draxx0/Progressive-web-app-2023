import {
  createContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Game, gameDefault } from "../../api/db/utils";

type GameType = {
  game: Game;
  setGame: Dispatch<SetStateAction<Game>>;
};

const GameContext = createContext<GameType>({
  game: gameDefault,
  setGame: () => {},
});

type IProps = {
  children: ReactNode;
};

const GameContextProvider: FC<IProps> = ({ children }) => {
  const [game, setGame] = useState<Game>(gameDefault);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
