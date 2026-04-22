import { Box, ConsolePosition, createCliRenderer, Text } from "@opentui/core";
import { machineUI } from "../machine/machine.ui";
import {
  fileManagementUI,
  type FileTab,
} from "../file-management/filemanagement.ui";
import { keyboard } from "../utils/keyboard";

export const renderer = await createCliRenderer({
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 30,
  },
});

let activeTab: FileTab = "files";

async function renderApp() {
  renderer.root.add(
    Box(
      {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: 0,
        padding: 0,
        backgroundColor: "#343a40",
      },
      machineUI(),
      await fileManagementUI({ activeTab }),
    ),
  );
}

keyboard(renderer);
console.log("log");
await renderApp();

renderer.keyInput.on("keypress", (key) => {
  // Toggle with backtick key
  if (key.name === "d") {
    renderer.console.toggle();
  }

  // Or with a modifier
  if (key.ctrl && key.name === "l") {
    renderer.console.toggle();
  }
});
