type Game = {
  id: string;
  pooc: string;
};

type Games = Game[];

type Card = {
  id: string;
  cardShape: string;
  cardColor: string;
  cardNumber: number;
  cardOwner: string;
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
};

const playerDefault = {
  card: "",
  cardsNumber: 0,
  discardCards: 0,
  playerNumber: 0,
};

export type { Game, Games, Card, Cards, Rules, Rule, IPlayer };
export { playerDefault };
