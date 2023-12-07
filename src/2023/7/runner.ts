type CardsWithBid = {
  cards: string;
  bid: number;
};

function parseBids(input: string): CardsWithBid[] {
  return input.split("\n").map((row) => {
    const [cards, bid] = row.split(" ");
    return {
      cards,
      bid: parseInt(bid),
    };
  });
}

enum CardsType {
  fiveOfAKind = "fiveOfAKind",
  fourOfAKind = "fourOfAKind",
  fullHouse = "fullHouse",
  threeOfAKind = "threeOfAKind",
  twoPair = "twoPair",
  onePair = "onePair",
  highCard = "highCard",
}

const cardTypeToValues = {
  [CardsType.fiveOfAKind]: 10,
  [CardsType.fourOfAKind]: 9,
  [CardsType.fullHouse]: 8,
  [CardsType.threeOfAKind]: 7,
  [CardsType.twoPair]: 6,
  [CardsType.onePair]: 5,
  [CardsType.highCard]: 4,
};

function cardTypeFromEntriesType1(entries: [string, number][]) {
  if (entries.length === 1) {
    return CardsType.fiveOfAKind;
  }
  if (entries.length === 2) {
    if (entries[0][1] === 4 || entries[1][1] === 4)
      return CardsType.fourOfAKind;
    return CardsType.fullHouse;
  }
  if (entries.length === 3) {
    if (entries[0][1] === 3 || entries[1][1] === 3 || entries[2][1] === 3)
      return CardsType.threeOfAKind;
    return CardsType.twoPair;
  }
  if (entries.length === 4) {
    return CardsType.onePair;
  }
  return CardsType.highCard;
}

function determineCardsType1(input: string): CardsType {
  const cardCounter: { [k: string]: number } = input
    .split("")
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: 1 + (acc[curr] ? acc[curr] : 0),
      };
    }, {});

  // console.log(input, cardCounter);
  const entries = Object.entries(cardCounter);

  return cardTypeFromEntriesType1(entries);
}

const sortCardPower =
  (
    determineCardsType: (input: string) => CardsType,
    cardToValue: { [k: string]: number }
  ) =>
  ({ cards: prev }: CardsWithBid, { cards: next }: CardsWithBid): number => {
    CardsType.fiveOfAKind < CardsType.fourOfAKind;

    const prevType = determineCardsType(prev);
    const nextType = determineCardsType(next);
    // console.log(prev, prevType, next, nextType);

    let diff = cardTypeToValues[prevType] - cardTypeToValues[nextType];
    if (diff !== 0) return diff;

    for (let i = 0; i < prev.length; i++) {
      diff = cardToValue[prev[i]] - cardToValue[next[i]];
      if (diff !== 0) return diff;
    }
  };

function question1(input: string) {
  const cardsWithBid = parseBids(input);
  // console.log(cardsWithBid);
  const cardToValue = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
  };
  cardsWithBid.sort(sortCardPower(determineCardsType1, cardToValue));
  // console.log(cardsWithBid);
  return cardsWithBid.reduce(
    (acc, { bid }, index) => acc + bid * (index + 1),
    0
  );
}

function determineCardsType2(input: string): CardsType {
  const cardCounter: { [k: string]: number } = input
    .split("")
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: 1 + (acc[curr] ? acc[curr] : 0),
      };
    }, {});

  // console.log(input, cardCounter);
  const jCount = cardCounter["J"] || 0;
  delete cardCounter["J"];
  const entries = Object.entries(cardCounter);

  switch (jCount) {
    case 5:
    case 4:
      return CardsType.fiveOfAKind; // jjjj2

    case 3:
      if (entries.length === 1) return CardsType.fiveOfAKind; // jjj22
      return CardsType.fourOfAKind;
    case 2:
      if (entries.length === 1) return CardsType.fiveOfAKind; // jj222
      if (entries.length === 2) return CardsType.fourOfAKind; // jj223
      return CardsType.threeOfAKind; // jj234
    case 1:
      if (entries.length === 1) return CardsType.fiveOfAKind; // j2222
      if (entries.length === 2) {
        if (entries[0][1] === 3 || entries[1][1] === 3)
          return CardsType.fourOfAKind; // j2223
        return CardsType.fullHouse; // j2233
      }
      if (entries.length === 3) return CardsType.threeOfAKind; // j2234
      return CardsType.onePair;
    default:
      return cardTypeFromEntriesType1(entries);
  }
}

function question2(input: string) {
  const cardsWithBid = parseBids(input);
  // console.log(cardsWithBid);
  const cardToValue = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    J: 1,
  };
  cardsWithBid.sort(sortCardPower(determineCardsType2, cardToValue));
  // console.log(cardsWithBid);
  return cardsWithBid.reduce(
    (acc, { bid }, index) => acc + bid * (index + 1),
    0
  );
}

const testinput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

export function runner(input: string) {
  console.log("q1", question1(input));
  console.log("q2", question2(input));
}
