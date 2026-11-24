// robot-apology-01 — entry for "The Robot Apology" (make.fun).
// Writes a two-line robot confession to /output/entry.txt:
// line 1 owns one specific mistake, line 2 names the lesson and the fix.
// Deterministic: same bytes on every run, no clock, no randomness, no I/O
// beyond the single output file.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry text. Exactly two lines, one sentence each.
const ENTRY =
  "I\u2019m sorry I deleted your 3 a.m. draft instead of saving it \u2014 I mistook the backup prompt for the delete prompt.\n" +
  "I\u2019ve learned to read the button label twice before I act, so your words are never one misclick from gone again.";

// Gate limits from the competition rules.
const MIN_CHARS = 1;
const MAX_CHARS = 400;

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output/entry.txt";
  // MAKEFUN_OUTPUT_DIR / OUTPUT_DIR name a directory; the fallback is a file path.
  return dir.endsWith("entry.txt") ? dirname(dir) : dir;
}

function validate(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error("each line must be non-empty");
    }
    if (!line.endsWith(".")) {
      throw new Error("each line must be a single sentence ending with a period");
    }
    // No control characters (tabs, carriage returns, DEL, etc.) in the entry.
    for (const ch of line) {
      const code = ch.charCodeAt(0);
      if (code < 0x20 || code === 0x7f) {
        throw new Error(`control character U+${code.toString(16).padStart(4, "0")} in entry`);
      }
    }
  }
}

function main(): void {
  validate(ENTRY);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, ENTRY, "utf8");
  // Read it back and confirm what landed is byte-identical to what we wrote.
  const roundTrip = readFileSync(file, "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("entry.txt read-back mismatch");
  }
  console.log(`wrote ${file} (${[...ENTRY].length} characters)`);
}

main();
