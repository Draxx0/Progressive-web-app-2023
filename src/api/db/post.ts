import {
  collection,
  doc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../services/firebase.config";
import cards from "../../app/data/cards.json";
import { Cards, Game } from "./utils";

export const createGame = async (string: string) => {
  const newData = {
    pooc: string,
  };
  const docRef = doc(db, "games", "5k2hgrvQvt0sTtnOn5Qm");
  await setDoc(docRef, newData, { merge: true })
    .then(() => {
      console.log("Document successfully updated!");
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

export const updateCards = async (cards: Cards) => {
  const collectionRef = collection(db, "cards");
  // const documents = await getDocs(collectionRef);
  console.log(cards);

  const batch = writeBatch(db);

  cards.forEach((card) => {
    const docRef = doc(collectionRef, card.id);
    batch.update(docRef, card);
  });

  console.log(batch);
  await batch.commit().then(() => {
    console.log("Cards successfully updated!");
  });
};
