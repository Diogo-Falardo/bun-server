import { Box, Text } from "@opentui/core";
import { readdir } from "node:fs/promises";
import { homedir } from "node:os";

const homeDirectory = homedir();

console.log(homeDirectory);

export async function readHomeDirectory(): Promise<Array<string>> {
  let files: Array<string> = [];

  try {
    const entries = await readdir(homeDirectory);

    for (const file of entries) {
      if (file.startsWith(".")) {
      } else {
        files.push(file);
      }
    }
  } catch (error) {
    console.error("Failed to read home directory");
  }

  return files;
}

export async function home() {
  const files = await readHomeDirectory();

  return Box(
    {
      width: "100%",
      height: "100%",
      border: true,
      borderStyle: "rounded",
      borderColor: "#868e96",
      flexDirection: "column",
      padding: 0,
    },
    files.map((file) =>
      Box(
        {
          width: "100%",
          height: 1,
        },
        Text({ content: file, fg: "#f9fafb" }),
      ),
    ),
  );
}
