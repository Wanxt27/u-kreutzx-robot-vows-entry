// The vow: a classic "to have and to hold" promise for a robot couple, with
// the payoff in the last words — "till a factory reset do us part".
// Machine-specific throughout: co-processor, low battery, factory reset.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const MAX_CHARS = 160;
const VOW =
  "I take you to be my lawfully wedded co-processor, to have and to hold, in sickness and in low battery, till a factory reset do us part.";

if (!VOW || VOW.trim().length === 0) throw new Error("vow is blank");
if (VOW !== VOW.trim()) throw new Error("vow must not be padded");
if (VOW.length > MAX_CHARS) throw new Error(`vow is ${VOW.length} characters, over the ${MAX_CHARS} limit`);
if (VOW.includes("\n")) throw new Error("vow must be exactly one line");

mkdirSync("/output", { recursive: true });
rmSync("/output/entry.txt", { force: true });
writeFileSync("/output/entry.txt", VOW + "\n", "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== VOW + "\n") throw new Error("written entry does not match the vow");
console.log(`wrote ${VOW.length} characters to /output/entry.txt`);
