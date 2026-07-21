export function parseDeepLinkWindow(input: string) {
  if (!input.startsWith("opencode://")) return "current"
  if (typeof URL.canParse === "function" && !URL.canParse(input)) return "current"

  try {
    const url = new URL(input)
    if (url.hostname !== "open-project") return "current"
    return url.searchParams.get("window") === "new" ? "new" : "current"
  } catch {
    return "current"
  }
}

export function partitionDeepLinks(urls: string[]) {
  return urls.reduce(
    (result, url) => {
      if (parseDeepLinkWindow(url) === "new") {
        result.newWindows.push([url])
        return result
      }

      result.current.push(url)
      return result
    },
    { current: [] as string[], newWindows: [] as string[][] },
  )
}

export function extractDeepLinks(argv: string[]) {
  return argv.filter((arg) => arg.startsWith("opencode://"))
}
