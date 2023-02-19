export default function shuffleArrays<T>(array1: T[], array2: T[]): [T[], T[]] {
  const copy1 = [...array1];
  const copy2 = [...array2];

  for (let i = 0; i < copy1.length; i++) {
    const j = Math.floor(Math.random() * copy1.length);
    const temp = copy1[i];
    copy1[i] = copy1[j];
    copy1[j] = temp;
  }

  for (let i = 0; i < copy2.length; i++) {
    const j = Math.floor(Math.random() * copy2.length);
    const temp = copy2[i];
    copy2[i] = copy2[j];
    copy2[j] = temp;
  }

  return [copy1, copy2];
}
