export default function shuffleArrays<T>(array1: T[], array2: T[]): [T[], T[]] {
  // on crée deux copies des tableaux pour ne pas modifier les tableaux d'origine
  const copy1 = [...array1];
  const copy2 = [...array2];

  // on itère sur les éléments de chaque tableau et on échange leur position de façon aléatoire
  for (let i = 0; i < copy1.length; i++) {
    const j = Math.floor(Math.random() * copy1.length); // on choisit un index aléatoire dans le premier tableau
    const temp = copy1[i];
    copy1[i] = copy1[j];
    copy1[j] = temp;
  }

  for (let i = 0; i < copy2.length; i++) {
    const j = Math.floor(Math.random() * copy2.length); // on choisit un index aléatoire dans le deuxième tableau
    const temp = copy2[i];
    copy2[i] = copy2[j];
    copy2[j] = temp;
  }

  return [copy1, copy2];
}
