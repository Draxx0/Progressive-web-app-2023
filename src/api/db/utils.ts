type Game = {
  isGameActive: boolean;
  isGamePause: boolean;
  isSameCard: boolean;
  isTotemCatch: boolean;
  numberOfPlayer: number;
  playerTurn: number;
  players: IPlayer[];
};

const gameDefault: Game = {
  numberOfPlayer: 0,
  isSameCard: false,
  isGamePause: false,
  isTotemCatch: false,
  players: [
    {
      playerName: "",
      cardsNumber: 30,
      card: "",
      discardCards: 0,
      playerNumber: 1,
      isReservedSlot: false,
    },

    {
      playerName: "",
      cardsNumber: 30,
      card: "",
      discardCards: 0,
      playerNumber: 2,
      isReservedSlot: false,
    },
  ],
  playerTurn: 1,
  isGameActive: false,
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
  maxPlayer: number;
  turnCooldown: number;
};

type Rules = Rule[];

type IPlayer = {
  card: string;
  cardsNumber: number;
  discardCards: number;
  playerNumber: number;
  isReservedSlot: boolean;
  playerName: string;
};

const playerDefault = {
  card: "",
  cardsNumber: 0,
  discardCards: 0,
  playerNumber: 0,
  isReservedSlot: false,
  playerName: "",
};

export type { Game, Games, Card, Cards, Rules, Rule, IPlayer };
export { playerDefault, gameDefault };
