function question1(input: string) {
  return input.split("\n").reduce((acc, curr) => {
    const first = curr.split("").find((a) => !isNaN(parseInt(a))) || "";
    const last = curr.split("").findLast((a) => !isNaN(parseInt(a))) || "";
    const result = parseInt(`${first}${last}`);
    return acc + result;
  }, 0);
}

function question2(input: string) {
  const dictionary = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    "1": 1,
  };

  return input.split("\n").reduce((acc, curr) => {
    const first = curr.match(
      /(one|two|three|four|five|six|seven|eight|nine|[1-9]).*/
    )[1];
    const last = curr.match(
      /.*(one|two|three|four|five|six|seven|eight|nine|[1-9])/
    )[1];
    const result = parseInt(`${dictionary[first]}${dictionary[last]}`);
    // console.log(curr, result);
    return acc + result;
  }, 0);
}

// Put code here
export function runner(input: string) {
  console.log("q1", question1(input));
  console.log("q2", question2(input));
}
