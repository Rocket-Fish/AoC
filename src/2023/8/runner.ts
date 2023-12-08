type InstructionsMap = {
  [k: string]: {
    L: string;
    R: string;
  };
};

function parseInstructionsMap(input: string): InstructionsMap {
  const regexIterator = input.matchAll(/(\w{3}).+(\w{3}).+(\w{3})/g);
  const result = {} as InstructionsMap;
  let target = regexIterator.next();
  while (!target.done) {
    const [, k, L, R] = target.value;
    result[k] = { L, R };
    target = regexIterator.next();
  }
  return result;
}

function calculateTotalSteps(
  instructions: string,
  instructionsMap: InstructionsMap,
  start: string,
  isTarget: (test: string) => boolean
) {
  let currentLocation = start;
  let totalSteps = 0;
  while (!isTarget(currentLocation)) {
    const instructionStep = totalSteps % instructions.length;
    const nextStep = instructions[instructionStep];

    currentLocation = instructionsMap[currentLocation][nextStep];
    totalSteps++;
  }

  return totalSteps;
}

function quesiton1(input: string) {
  const [instructions, rawInstructionsMap] = input.split("\n\n");
  const instructionsMap = parseInstructionsMap(rawInstructionsMap);

  return calculateTotalSteps(
    instructions,
    instructionsMap,
    "AAA",
    (test) => test === "ZZZ"
  );
}

// DON"T BRUTE FORCE
// function quesiton2(input: string) {
//   const [instructions, rawInstructionsMap] = input.split("\n\n");
//   const instructionsMap = parseInstructionsMap(rawInstructionsMap);

//   let currentLocations = Object.keys(instructionsMap).filter((loc) =>
//     loc.endsWith("A")
//   );
//   let totalSteps = 0;

//   const doesAllArrayElementsEndWithZ = (arr: string[]) =>
//     arr.reduce((acc, loc) => acc && loc.endsWith("Z"), true);
//   const numberOfArrayElementsEndWithZ = (arr: string[]) =>
//     arr.reduce((acc, loc) => acc + Number(loc.endsWith("Z")), 0);
//   console.log("init", currentLocations);

//   while (!doesAllArrayElementsEndWithZ(currentLocations)) {
//     const instructionStep = totalSteps % instructions.length;
//     const nextStep = instructions[instructionStep];

//     currentLocations = currentLocations.map(
//       (loc) => instructionsMap[loc][nextStep]
//     );

//     totalSteps++;
//     const debugNum = numberOfArrayElementsEndWithZ(currentLocations);
//     if (debugNum >= 3) console.log(totalSteps, debugNum, currentLocations);
//   }

//   return totalSteps;
// }

function leastCommonMultiple(list: number[]) {
  list.sort((a, b) => a - b);

  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  let multiple = list[0];
  list.forEach((n) => {
    multiple = lcm(multiple, n);
  });

  return multiple;
}

function quesiton2(input: string) {
  const [instructions, rawInstructionsMap] = input.split("\n\n");
  const instructionsMap = parseInstructionsMap(rawInstructionsMap);

  const currentLocations = Object.keys(instructionsMap).filter((loc) =>
    loc.endsWith("A")
  );

  const stepsList = currentLocations.map((loc) =>
    calculateTotalSteps(instructions, instructionsMap, loc, (test) =>
      test.endsWith("Z")
    )
  );
  console.log("stepsList", stepsList);
  return leastCommonMultiple(stepsList);
}

const testinput = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

export function runner(input: string) {
  console.log("q1", quesiton1(input));
  console.log("q2", quesiton2(input));
}
