import { Box, Text } from "@opentui/core";
import si, { osInfo } from "systeminformation";

export async function system() {
  const os = await si.osInfo();
  const versions = await si.versions();
  const user = await si.users();
  const motherboard = await si.baseboard();
  const cpu = await si.cpu();
  const gpu = await si.graphics();
  const disks = await si.diskLayout();

  const rows = [
    { label: "User", value: user[0]?.user },
    { label: "Host", value: os.hostname },
    { label: "OS", value: `${os.distro} ${os.arch}` },
    { label: "Platform", value: os.platform },
    { label: "Bun", value: versions.bun },
    { label: "Docker", value: versions.docker },
    { label: "Board", value: motherboard.model },
    { label: "CPU", value: cpu.brand },
    { label: "GPU", value: gpu.controllers[0]?.model },
    { label: "Disks", value: disks.map((d) => d.name).join(", ") },
  ];

  const _content = JSON.stringify(rows, null, "\t");
  return Box(
    {
      width: 40,
      height: rows.length + 4,
      border: true,
      borderStyle: "rounded",
      borderColor: "#868e96",
      flexDirection: "column",
      padding: 1,
    },
    ...rows.map(({ label, value }) =>
      Box(
        { width: "100%", height: 1, flexDirection: "row", gap: 1 },
        Text({ content: label.padEnd(10), fg: "#868e96" }),
        Text({ content: value ?? "N/A", fg: "#f8f9fa" }),
      ),
    ),
  );
}
