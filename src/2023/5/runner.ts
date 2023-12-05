import util from "util";
import v8 from "v8";

type AlmanacRule = {
  sourceRangeStart: number;
  destinationRangeStart: number;
  range: number;
};

type AlmanacInstruction = {
  source: string;
  destination: string;
  rules: AlmanacRule[];
};

type SourceToInstruction = {
  [source: string]: AlmanacInstruction;
};

function stripTrailingAndInitialNewline(input: string): string {
  return input.replace(/^\n*/, "").replace(/\n*$/, "");
}

function parseAlmanacRules(input: string): AlmanacRule[] {
  const rows = stripTrailingAndInitialNewline(input).split("\n");
  // console.log(rows);
  return rows.map((row) => {
    const [destinationRangeStart, sourceRangeStart, range] = row.split(" ");
    return {
      destinationRangeStart: parseInt(destinationRangeStart),
      sourceRangeStart: parseInt(sourceRangeStart),
      range: parseInt(range),
    };
  });
}

function parseAlmanacInstruction(input: RegExpMatchArray): AlmanacInstruction {
  return {
    source: input[1],
    destination: input[2],
    rules: parseAlmanacRules(input[3]),
  };
}

function calculateDestinationBasedOnRules(
  input: number,
  rules: AlmanacRule[]
): number {
  let result = input;

  // console.log(rules);
  for (const rule of rules) {
    if (
      input >= rule.sourceRangeStart &&
      input < rule.sourceRangeStart + rule.range
    ) {
      const inputRelativeDiffToSourceRangeStart = input - rule.sourceRangeStart;
      result = rule.destinationRangeStart + inputRelativeDiffToSourceRangeStart;
    }
  }

  return result;
}

function calculateResultPerInstructionSet(
  input: number,
  initialSourceKey: string,
  sourceToInstruction: SourceToInstruction
): number {
  const instructionSet = sourceToInstruction[initialSourceKey];
  if (!instructionSet) return input;
  const destinationValue = calculateDestinationBasedOnRules(
    input,
    instructionSet.rules
  );
  // console.log(
  //   input,
  //   initialSourceKey,
  //   destinationValue,
  //   instructionSet.destination
  // );
  return calculateResultPerInstructionSet(
    destinationValue,
    instructionSet.destination,
    sourceToInstruction
  );
}

function buildSourceToInstruction(input: string) {
  const regexIterator = input.matchAll(/(.*)-to-(.*) map:\n([\d \n]*)/g);
  const sourceToInstruction: SourceToInstruction = {};
  let target = regexIterator.next();
  while (!target.done) {
    const match = target.value;
    const result = parseAlmanacInstruction(match);
    sourceToInstruction[result.source] = result;
    target = regexIterator.next();
  }
  return sourceToInstruction;
}

function question1(input: string) {
  const sourceToInstruction = buildSourceToInstruction(input);

  // console.log(
  //   util.inspect(sourceToInstruction, false, null, true /* enable colors */)
  // );

  const headerLine = input.split("\n")[0];
  const [, initialValues] = headerLine.split(": ");

  const results: number[] = initialValues
    .split(" ")
    .map((value): number =>
      calculateResultPerInstructionSet(
        parseInt(value),
        "seed",
        sourceToInstruction
      )
    );

  results.sort((a, b) => a - b);
  console.log(JSON.stringify(results));
  return results[0];
}

function question2(input: string) {
  const sourceToInstruction = buildSourceToInstruction(input);

  const headerLine = input.split("\n")[0];
  const [, initialValues] = headerLine.split(": ");
  let currentSmallestNumber = Number.MAX_SAFE_INTEGER;

  const regexIterator = initialValues.matchAll(/(\d+) (\d+)/g);
  let target = regexIterator.next();
  let targetNumber = 0;
  while (!target.done) {
    targetNumber++;
    const match = target.value;

    const startAt = parseInt(match[1]);
    const count = parseInt(match[2]);

    for (let i = 0; i < count; i++) {
      if (i % 1000000 === 0)
        console.log(
          `targetNumber: ${targetNumber} of 10; calculating ${i} of ${count}; current smallest number: ${currentSmallestNumber}`
        );
      const result = calculateResultPerInstructionSet(
        startAt + i,
        "seed",
        sourceToInstruction
      );
      if (result < currentSmallestNumber) {
        currentSmallestNumber = result;
      }
    }

    target = regexIterator.next();
  }
  return currentSmallestNumber;
}

// const testInput = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`;

export function runner(input: string) {
  console.log("max safe int", Number.MAX_SAFE_INTEGER);
  console.log("heap stats", v8.getHeapStatistics());
  // console.log("q1", question1(input));
  console.log("q2", question2(input));
}
