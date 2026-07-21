import { describe, expect, test } from "bun:test"
import { extractDeepLinks, parseDeepLinkWindow, partitionDeepLinks } from "./deep-link"

describe("desktop deep links", () => {
  test("routes open-project window=new to a new window", () => {
    expect(parseDeepLinkWindow("opencode://open-project?directory=/tmp/demo&window=new")).toBe("new")
  })

  test("keeps other deep links on the current window", () => {
    expect(parseDeepLinkWindow("opencode://open-project?directory=/tmp/demo")).toBe("current")
    expect(parseDeepLinkWindow("opencode://new-session?directory=/tmp/demo&window=new")).toBe("current")
    expect(parseDeepLinkWindow("https://example.com")).toBe("current")
  })

  test("partitions deep links by target window", () => {
    expect(
      partitionDeepLinks([
        "opencode://open-project?directory=/a",
        "opencode://open-project?directory=/b&window=new",
        "opencode://new-session?directory=/c",
      ]),
    ).toEqual({
      current: ["opencode://open-project?directory=/a", "opencode://new-session?directory=/c"],
      newWindows: [["opencode://open-project?directory=/b&window=new"]],
    })
  })

  test("extracts an encoded Windows project deep link from launch arguments", () => {
    const url = "opencode://open-project?directory=C%3A%5CUsers%5CNorman%5C.dotfiles"
    expect(extractDeepLinks(["electron.exe", "C:\\app\\index.js", url])).toEqual([url])
  })
})
