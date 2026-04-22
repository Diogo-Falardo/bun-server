// this file is responsabile for the machine info dispayed
import { Box, Text } from "@opentui/core";
import { search_for_lan_ip } from "./machine.service";

export function machineUI() {
  return Box(
    {
      width: "100%",
      height: "20%",
      border: true,
      borderColor: "#38d9a9",
      borderStyle: "rounded",
    },

    Text({ content: search_for_lan_ip() }),
  );
}
