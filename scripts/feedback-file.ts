/**
 * Feedback kept in a file, one JSON object a line: what `bun run dev` stores,
 * and what `bun run feedback --local` reads. `.feedback/` is git-ignored;
 * anything worth keeping becomes a plan change or a review in reviews.json.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { arrayStore, type Feedback, type Store } from "../worker/feedback";

export const LOCAL_FILE = ".feedback/dev.jsonl";

export async function readFeedbackFile(path: string): Promise<Feedback[]> {
  let text: string;
  try {
    text = await readFile(path, "utf8");
  } catch {
    return [];
  }
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line) as Feedback);
}

export function fileStore(path = LOCAL_FILE): Store {
  return arrayStore(
    () => readFeedbackFile(path),
    async (all) => {
      await mkdir(dirname(path), { recursive: true });
      await writeFile(
        path,
        all.map((f) => JSON.stringify(f)).join("\n") + "\n",
        "utf8",
      );
    },
  );
}
