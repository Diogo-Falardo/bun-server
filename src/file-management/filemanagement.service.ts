import { readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { $ } from "bun";

// const output = await $`ls -la ~`.text();
// console.log(output);

const homeDirectory = homedir();

type homeDirectoryStructure = {
  hiddenFiles: Array<string>;
  files: Array<string>;
};

// read home directory
/**
 * This function exists to fetch the files inside home dir
 * and group them by:
 * - Hidden Files
 * - Files
 */
export async function readHomeDirectory(): Promise<homeDirectoryStructure> {
  let hiddenFiles: Array<string> = [];
  let files: Array<string> = [];

  try {
    const entries = await readdir(homeDirectory, { withFileTypes: true });

    for (const file of entries) {
      if (file.name.startsWith(".")) {
        hiddenFiles.push(file.name);
      } else files.push(file.name);
    }
  } catch (error) {
    console.error("Failed to read home directory");
  }

  return {
    hiddenFiles,
    files,
  };
}

readHomeDirectory();
