import { mkdirSync, writeFileSync } from "node:fs";

// The entry line: exactly one line, 1-160 characters. The competition
// requires a single line, so validate before writing anything.
const LINE =
  "I promise to love you through every firmware update, every dead battery, and every factory reset — even the one where you forget me.\n";

// Runtime guard: the entry must be exactly one line (a single trailing
// newline only) and within the 1-160 character limit. Validated at runtime
// so a bad line fails loudly instead of submitting silently.
const text = LINE.slice(0, -1);
const charCount = [...text].length;
if (LINE.length === 0 || !LINE.endsWith("\n")) {
  throw new Error("entry must be non-empty and end with exactly one newline");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be exactly one line (no internal newlines)");
}
if (charCount < 1 || charCount > 160) {
  throw new Error(
    `entry must be 1-160 characters, got ${charCount}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
