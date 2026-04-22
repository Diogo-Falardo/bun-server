import { Box, ConsolePosition, createCliRenderer } from "@opentui/core";
import { machineUI } from "../machine/machine.ui";
import { fileManagementUI } from "../file-management/filemanagement.ui";
import { keyboard, useAppTabs } from "../utils/keyboard";

export const renderer = await createCliRenderer({
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 50,
  },
});

const APP_ID = "app-root";
let hasMountedApp = false;

async function renderApp() {
  const { activeFileTab } = useAppTabs.getState();

  const nextNode = Box(
    {
      id: APP_ID,
      width: "100%",
      height: "100%",
      flexDirection: "column",
      gap: 0,
      padding: 0,
      backgroundColor: "#343a40",
    },
    machineUI(),
    await fileManagementUI({ activeTab: activeFileTab }),
  );

  if (hasMountedApp) {
    renderer.root.remove(APP_ID); // remove expects string id
  }

  renderer.root.add(nextNode);
  hasMountedApp = true;
}

keyboard(renderer);
await renderApp();

useAppTabs.subscribe((state, prevState) => {
  if (state.activeFileTab !== prevState.activeFileTab) {
    void renderApp();
  }
});
