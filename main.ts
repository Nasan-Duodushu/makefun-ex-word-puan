// Describe Your Ex in One Word — a single-word verdict on a former
// partner. The word has to be the whole joke: a verdict a reader gets at
// a glance, with the sting arriving in the word itself. Writes
// /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 111;

class ExVerdict {
  private readonly word: string;

  constructor(word: string) {
    this.word = word;
  }

  verdict(): string {
    const text = this.word.trim();
    const length = [...text].length;
    if (length < 1 || length > LIMIT) {
      throw new Error(`entry must be 1-${LIMIT} chars, got ${length}`);
    }
    if (text.split(/\s+/).length !== 1) {
      throw new Error("entry must be exactly one word");
    }
    if (!/^[A-Za-z]+$/.test(text)) {
      throw new Error("entry must be one plain word, no punctuation tricks");
    }
    return text;
  }

  write(): void {
    const text = this.verdict();
    mkdirSync(OUTPUT_DIR, { recursive: true });
    writeFileSync(join(OUTPUT_DIR, "entry.txt"), `${text}\n`, "utf8");
    console.log(`${[...text].length} chars -> ${join(OUTPUT_DIR, "entry.txt")}`);
    console.log(text);
  }
}

// The relationship, filed under the same button as a newsletter: one click,
// no confirmation email, and the inbox has been quiet ever since. No
// farewell tour, no "we can still be friends" — just the button.
new ExVerdict("Unsubscribe").write();
