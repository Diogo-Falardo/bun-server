import { $ } from "bun";
import * as readline from "node:readline/promises";
import * as path from "node:path";
import { stdin as input, stdout as output } from "node:process";
import { log } from "../middleware/logger";
// current working directory
let cwd = process.cwd();
// change directory
//process.chdir()
const cw = async (command: string) => await $`${command}`;

export async function terminal() {
  const rl = readline.createInterface({ input, output });
  while (true) {
    const cmd = await rl.question(`${cwd} $ >> `);
    log.withMetadata({ shell_command: cmd }).info("request");
    if (cmd.startsWith("cd ")) {
      const target = cmd.slice(3).trim();
      cwd = path.resolve(cwd, target); // go to new path
      log.withMetadata({ new_cwd: cwd, target }).info("new path");
      continue;
    }
    if (cmd === "exit") break;
    // if cmd request is bun run, run this command to invoke shell
    if (cmd.startsWith("bun run")) {
      await $`sh -c "${cmd}"`.cwd(cwd);
    }
    try {
      const result = await $`${cmd}`.cwd(cwd).text();
      log.withMetadata({ exe_cmd_in: cwd, result }).info("executed");
    } catch (e) {
      log.withError(e).error("command failed");
    }
  }
  rl.close();
}
