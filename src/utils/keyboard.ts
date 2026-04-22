import { type KeyEvent } from "@opentui/core";
import { createStore } from "zustand/vanilla";
import type { fileTabs } from "../file-management/filemanagement.ui";

type appTabsStore = {
  activeFileTab: fileTabs;
  setFileTab: (tab: fileTabs) => void;
};

export const useAppTabs = createStore<appTabsStore>((set, get) => ({
  activeFileTab: "files",
  setFileTab: (tab) => set({ activeFileTab: tab }),
}));

// create a keyboard map
export const keyboard = (renderer: any) => {
  const keyHandler = renderer.keyInput;

  if (!keyHandler) {
    throw new Error("No key input handler found");
  }

  keyHandler.on("keypress", (key: KeyEvent) => {
    if (key.name === "f") {
      useAppTabs.getState().setFileTab("files");
    }

    if (key.name === "h") {
      useAppTabs.getState().setFileTab("hidden");
    }

    // Toggle with backtick key
    if (key.name === "d") {
      renderer.console.toggle();
    }

    // Or with a modifier
    if (key.ctrl && key.name === "l") {
      renderer.console.toggle();
    }
  });
};
