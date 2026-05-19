import {
  Box,
  ConsolePosition,
  createCliRenderer,
  Input,
  Text,
  TextRenderable,
} from "@opentui/core";
import { system } from "./core/system";

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 50,
  },
});

const fake_box = Box(
  {
    width: 20,
    height: 40,
  },
  Text({ content: "test" }),
);
renderer.root.add(await system());
