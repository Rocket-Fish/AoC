function predictNextEntry(entries: number[]): number {
  const isAllZeros = entries.reduce((acc, curr) => acc && curr === 0, true);
  // console.log(JSON.stringify(entries));
  if (isAllZeros) return 0;

  const derivativeIntervals = [] as number[];
  for (let i = 0; i < entries.length - 1; i++) {
    const current = i;
    const next = i + 1;
    derivativeIntervals.push(entries[next] - entries[current]);
  }
  const lastEntry = entries[entries.length - 1];
  return lastEntry + predictNextEntry(derivativeIntervals);
}

function q1(input: string) {
  const rows = input.split("\n");
  const results = rows.map((row: string) =>
    predictNextEntry(
      row
        .split(" ")

        .map((r) => parseInt(r))
    )
  );

  return results.reduce((acc, curr) => acc + curr, 0);
}

function q2(input: string) {
  const rows = input.split("\n");
  const results = rows.map((row: string) =>
    predictNextEntry(
      row
        .split(" ")
        .reverse()
        .map((r) => parseInt(r))
    )
  );

  return results.reduce((acc, curr) => acc + curr, 0);
}

const testinput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
// Put code here
export function runner(input: string) {
  console.log("q1", q1(input));
  console.log("q2", q2(input));
}
