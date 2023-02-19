import { Cards } from "../../api/db/utils";

export default function splitArray(myArray: Cards) {
  const shuffledArray: any = myArray.sort(() => Math.random() - 0.5);

  const halfLength: number = shuffledArray.length / 2;
  const array1: Cards = shuffledArray.slice(0, halfLength);
  const array2: Cards = shuffledArray.slice(halfLength);

  if (array1.length > array2.length) {
    array1.pop();
  } else if (array2.length > array1.length) {
    array2.pop();
  }

  return [array1, array2];
}
