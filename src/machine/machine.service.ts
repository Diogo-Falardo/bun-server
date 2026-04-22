import { $ } from "bun";

const { stdout } = await $`ip a`.quiet();
const output = stdout.toString();

// Bun.write("ip.txt", output);

// eno1
/**
 * Inside of eno1 we are looking for:
 * LAN IP
 *
 */
export function search_for_lan_ip(): string {
  let inEno1 = false;
  let ip = "";
  for (const line of output.split("\n")) {
    if (line.includes("eno1:")) {
      inEno1 = true;
      continue;
    }
    // regular expression
    if (inEno1 && /^\d+:/.test(line)) {
      break;
    }

    // While in eno1, look for the LAN IP
    if (inEno1 && line.includes("inet ")) {
      // This regex finds the IPv4 LAN IP after "inet " in the line.
      // It matches four groups of digits separated by dots (e.g., 192.168.1.68).
      // It does NOT include the subnet mask (e.g., /24).
      const match = line.match(/inet (\d+\.\d+\.\d+\.\d+)/);
      if (match) {
        ip = `eno1.LAN_ip: ${match[1]}`;
      }
    }
  }

  return ip;
}
