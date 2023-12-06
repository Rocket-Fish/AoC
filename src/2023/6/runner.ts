function parseTimeDistance(input: string) {
  const [times, distances] = input
    .split("\n")
    .map((r) => r.split(/: +/)[1])
    .map((r) => r.split(/ +/));

  return times.map((time, index) => [
    parseInt(time),
    parseInt(distances[index]),
  ]);
}

function solveQuadraticFormula(a: number, b: number, c: number) {
  const result = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  const result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  return [result, result2].sort((a, b) => a - b);
}

function solveContest([time, distance]: number[]) {
  const [smaller, larger] = solveQuadraticFormula(-1, time, -distance - 0.0001); // add -0.0001 margin here to beat the previous record not equal it
  console.log(smaller, larger);
  return Math.floor(larger) - Math.ceil(smaller) + 1;
}

function question1(input: string) {
  const contests = parseTimeDistance(input);

  const results = contests.map((contest) => solveContest(contest));

  return results.reduce((acc, curr) => acc * curr, 1);
}

function parseTimeDistance2(input: string) {
  const [times, distances] = input
    .split("\n")
    .map((r) => r.split(/: +/)[1])
    .map((r) => r.replaceAll(/ +/g, ""));

  console.log(times);
  console.log(distances);
  return [parseInt(times), parseInt(distances)];
}

function question2(input: string) {
  const contest = parseTimeDistance2(input);
  return solveContest(contest);
}

const testinput = `Time:      7  15   30
Distance:  9  40  200`;

export function runner(input: string) {
  console.log("q1", question1(input));
  console.log("q2", question2(input));
}
