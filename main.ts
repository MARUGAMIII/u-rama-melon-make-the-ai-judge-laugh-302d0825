// Make the AI Judge Laugh — entry program.
//
// The entry is a single one-line office joke, written to /output/entry.txt.
// The joke was drafted against the published judge brief:
//   1. about office life and lands as a joke,
//   2. a true observation (the "circle back" jargon every office worker
//      has heard, endlessly, until it eats their weekend),
//   3. a surprising turn ("my weekend filed a missing persons report" —
//      the lost weekend personified as the one reporting itself missing),
//   4. tight: one line, no wasted setup,
//   5. original phrasing, not a stock line with the nouns swapped.
//
// The program is deterministic: it always writes the same line, so the two
// grading runs produce identical output. It validates the gate itself
// (UTF-8 text, 1-200 characters, not only whitespace, single line) and
// refuses to write an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "My boss asked me to circle back so often my weekend filed a missing persons report.";

// The grader runs the program with /output as its output directory.
// ENTRY_OUTPUT is only a local-test override; it defaults to the real path.
const OUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function main(): void {
  const text = JOKE.trim();

  // Gate checks, mirroring the sealed scorer:
  //  - 1 to 200 characters
  //  - not only whitespace
  //  - a single line (no embedded newlines)
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry is ${text.length} characters, must be 1-200`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry is only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  console.log(`wrote ${text.length} characters to ${OUT_PATH}`);
}

main();
