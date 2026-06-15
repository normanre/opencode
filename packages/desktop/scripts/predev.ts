import { $ } from "bun"

const electronPathFile = new URL("../node_modules/electron/path.txt", import.meta.url)
const electronDistDir = new URL("../node_modules/electron/dist/", import.meta.url)

if (!(await Bun.file(electronPathFile).exists()) || !(await Bun.file(electronDistDir).exists())) {
  await $`bun ./node_modules/electron/install.js`
}

await $`bun ./scripts/copy-icons.ts ${process.env.OPENCODE_CHANNEL ?? "dev"}`

await $`cd ../opencode && bun script/build-node.ts`
