function question1(input: string) {
  return input.split("\n").reduce((acc, row) => {
    const [left, right] = row.split(":");
    const gameNumber = left.split(" ")[1];
    // max color number pairs basically
    const maxColorNumberPairs = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const turn of right.split(";")) {
      for (const pair of turn.split(",")) {
        const [, number, color] = pair.split(" ");
        maxColorNumberPairs[color] =
          maxColorNumberPairs[color] < parseInt(number)
            ? parseInt(number)
            : maxColorNumberPairs[color];
      }
    }
    if (
      maxColorNumberPairs.red <= 12 &&
      maxColorNumberPairs.green <= 13 &&
      maxColorNumberPairs.blue <= 14
    ) {
      return acc + parseInt(gameNumber);
    }
    return acc;
  }, 0);
}

function question2(input: string) {
  return input.split("\n").reduce((acc, row) => {
    const [, right] = row.split(":");
    // max color number pairs basically
    const maxColorNumberPairs = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const turn of right.split(";")) {
      for (const pair of turn.split(",")) {
        const [, number, color] = pair.split(" ");
        maxColorNumberPairs[color] =
          maxColorNumberPairs[color] < parseInt(number)
            ? parseInt(number)
            : maxColorNumberPairs[color];
      }
    }
    const power =
      maxColorNumberPairs.red *
      maxColorNumberPairs.green *
      maxColorNumberPairs.blue;
    return acc + power;
  }, 0);
}

// Put code here
export function runner(input: string) {
  console.log("q1", question1(input));
  console.log("q2", question2(input));
}
