type Game = {
  isGameActive: boolean;
  isGamePause: boolean;
  isSameCard: boolean;
  isTotemCatch: string;
  numberOfPlayer: number;
  playerTurn: number;
  players: IPlayer[];
  winner: string;
};

const gameDefault: Game = {
  numberOfPlayer: 0,
  isSameCard: false,
  isGamePause: false,
  isTotemCatch: "",
  players: [
    {
      playerName: "",
      cardsNumber: 0,
      cardShape: "",
      card: "",
      discardCards: [],
      playerNumber: 1,
      isReservedSlot: false,
    },

    {
      playerName: "",
      cardsNumber: 0,
      cardShape: "",
      card: "",
      discardCards: [],
      playerNumber: 2,
      isReservedSlot: false,
    },
  ],
  playerTurn: 1,
  isGameActive: false,
  winner: "",
};

type Games = Game[];

type Card = {
  id: string;
  cardShape: string;
  cardColor: string;
  cardNumber: number;
  cardOwner: string;
  cardName: string;
};

type Cards = Card[];

type Rule = {
  delayToPlay: number;
  maxPlayers: number;
  turnCooldown: number;
};

type Rules = Rule[]

type IPlayer = {
  card: string;
  cardShape: string;
  cardsNumber: number;
  discardCards: string[];
  playerNumber: number;
  isReservedSlot: boolean;
  playerName: string;
};

const playerDefault = {
  card: "",
  cardsNumber: 0,
  cardShape: "",
  discardCards: [],
  playerNumber: 0,
  isReservedSlot: false,
  playerName: "",
};

export type { Game, Games, Card, Cards, Rule, Rules, IPlayer };
export { playerDefault, gameDefault };
