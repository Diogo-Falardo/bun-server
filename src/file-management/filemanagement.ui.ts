import {
  Box,
  BoxRenderable,
  ScrollBox,
  ScrollBoxRenderable,
  Text,
} from "@opentui/core";
import { readHomeDirectory } from "./filemanagement.service";

export type fileTabs = "files" | "hidden";

type FileManagementUIOptions = {
  activeTab: fileTabs;
};

function tabButton(label: string, isActive: boolean) {
  return Box(
    {
      width: "50%",
      height: 1,
      border: true,
      borderStyle: "rounded",
      borderColor: isActive ? "#f8f9fa" : "#868e96",
    },
    Text({ content: label }),
  );
}

export async function fileManagementUI({ activeTab }: FileManagementUIOptions) {
  const allFiles = await readHomeDirectory();
  const currentList =
    activeTab === "files" ? allFiles.files : allFiles.hiddenFiles;

  const fileRows = currentList.map((file) =>
    Box(
      {
        id: file,
        width: "100%",
        height: 1,
      },
      Text({ content: file }),
    ),
  );

  return Box(
    {
      width: "50%",
      height: "60%",
      border: true,
      borderColor: "#868e96",
      borderStyle: "rounded",
    },
    Box(
      {
        width: "100%",
        height: 3,
        flexDirection: "row",
      },
      tabButton("Files", activeTab === "files"),
      tabButton("Hidden Files", activeTab === "hidden"),
    ),
    ScrollBox(
      {
        id: "filesScrollBox",
        width: "100%",
        height: "auto",
      },
      ...fileRows,
    ),
  );
}
