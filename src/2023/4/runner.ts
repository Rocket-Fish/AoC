function getWinCount(input: string) {
  const [winningNumbers, yourNumbers] = input.split("|");
  const yourWinCount = [...yourNumbers.matchAll(/\d+/g)].reduce(
    (acc: number, num) => {
      if (winningNumbers.includes(` ${num[0]} `)) {
        return acc + 1;
      }
      return acc;
    },
    0
  );
  return yourWinCount;
}

function questionOne(input: string) {
  const rows = input.split("\n");

  return rows.reduce((acc: number, row: string) => {
    const [, cardContents] = row.split(":");
    const yourWinCount = getWinCount(cardContents);

    if (yourWinCount > 0) {
      return acc + 2 ** (yourWinCount - 1);
    }
    return acc;
  }, 0);
}

function questionTwo(input: string) {
  const rows = input.split("\n");

  const cardNumberToCopies: { [k: number]: number } = {};

  return rows.reduce((acc: number, row: string) => {
    const [cardHeader, cardContents] = row.split(":");
    const [, cardNumberString] = cardHeader.split(/ +/);
    const cardNumber = parseInt(cardNumberString);
    const yourWinCount = getWinCount(cardContents);

    const currentCardCopies = cardNumberToCopies[cardNumber] || 0;
    for (let i = 1; i <= yourWinCount; i++) {
      const futureCardNumber = cardNumber + i;
      const existingCopies = cardNumberToCopies[futureCardNumber] || 0;
      cardNumberToCopies[futureCardNumber] =
        existingCopies + currentCardCopies + 1;
    }

    return acc + 1 + currentCardCopies;
  }, 0);
}

export function runner(input: string) {
  console.log("q1", questionOne(input));
  console.log("q2", questionTwo(input));
}
