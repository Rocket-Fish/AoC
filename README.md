# Advent of Code Script Runner

## Introduction

Script runner for the [Advent of Code](https://adventofcode.com/) challenges. Handles all the boilerplate code for running AOC scripts and obtaining the test data.
This version has been copied from https://github.com/yrova/Advent-Of-Code-Runner

## Features

- **Automatic Input (Test data) Retrieval:** If an input file for a specific day is missing, the script automatically downloads it, assuming you've provided a valid session token.
- **Manual Input Placement:** You have the option to manually place the `input.txt` file in the appropriate input folder, organized by year and day.
- **Solution Execution:** Write your solution code in the `runner.ts` file corresponding to the day you are working on.

## Usage

### Command Line Arguments

- `day` (alias: `-d`): Specify the day to run (range: 1-25).
- `year` (alias: `-y`): Specify the year to run. Defaults to 2023 if not provided.
- `sessionCookie` (alias: `-c`): Provide the session token for downloading inputs.

### Running the Script

Execute the script using Yarn with the desired arguments. For example:

```bash
yarn start --day 3 --year 2023 --sessionCookie 234jdfj2i3jro3jo13j5
```
