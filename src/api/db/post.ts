import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "../services/firebase.config";
import cards from "../../app/data/cards.json";
import { Cards, Game, gameDefault, Rules } from "./utils";

export const createGame = async () => {
  const newData = gameDefault;
  const docRef = doc(db, "games", "game");
  await setDoc(docRef, newData, { merge: true })
    .then(() => {
      console.log("Game successfully created!");
    })
    .catch((err) => console.log(err));
};

export const createCards = async () => {
  const batch = writeBatch(db);
  cards.forEach((card) => {
    const docRef = doc(collection(db, "cards"));
    batch.set(docRef, card);
  });
  await batch.commit().then(() => {
    console.log("Document successfully updated!");
  });
};

export const updateGame = async (game: Game) => {
  const docRef = doc(db, "games", "game");
  const newData = game;
  await setDoc(docRef, newData, { merge: true })
    .then(() => {
      console.log("Game successfully updated!");
    })
    .catch((err) => console.log(err));
};

export const updateRules = async (rules: Rules) => {
  const docRef = doc(db, "rules", "rules");
  const newData = rules;
  await setDoc(docRef, newData, { merge: true })
    .then(() => {
      console.log("Rules successfully updated!");
    })
    .catch((err) => console.log(err));
};

export const updateCards = async (cards: Cards) => {
  const collectionRef = collection(db, "cards");

  const batch = writeBatch(db);

  cards.forEach((card) => {
    const docRef = doc(collectionRef, card.id);
    batch.update(docRef, card);
  });

  await batch.commit().then(() => {
    console.log("Cards successfully updated!");
  });
};
