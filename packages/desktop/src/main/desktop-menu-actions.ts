import { BrowserWindow } from "electron"
import type { DesktopMenuAction } from "@opencode-ai/app/desktop-menu"
import { createMainWindow, updateTitlebar } from "./windows"

export type DesktopMenuActionHandlers = Partial<{
  checkForUpdates: () => void
  relaunch: () => void
  createWindow: () => void
}>

export function runDesktopMenuAction(
  win: BrowserWindow | null,
  action: DesktopMenuAction,
  handlers: DesktopMenuActionHandlers = {},
) {
  switch (action) {
    case "app.checkForUpdates":
      handlers.checkForUpdates?.()
      return
    case "app.relaunch":
      handlers.relaunch?.()
      return
    case "window.new":
      if (handlers.createWindow) {
        handlers.createWindow()
        return
      }
      createMainWindow()
      return
    case "window.close":
      if (win?.isDestroyed()) return
      win?.close()
      return
    case "window.minimize":
      if (win?.isDestroyed()) return
      win?.minimize()
      return
    case "window.toggleMaximize":
      if (win?.isDestroyed()) return
      if (win?.isMaximized()) {
        win.unmaximize()
        return
      }
      win?.maximize()
      return
    case "view.reload":
      if (!canUseWindow(win)) return
      win?.reload()
      return
    case "view.toggleDevTools":
      if (!canUseWindow(win)) return
      win?.webContents.toggleDevTools()
      return
    case "view.resetZoom":
      setZoom(win, 1)
      return
    case "view.zoomIn":
      setZoom(win, (win?.webContents.getZoomFactor() ?? 1) + 0.2)
      return
    case "view.zoomOut":
      setZoom(win, (win?.webContents.getZoomFactor() ?? 1) - 0.2)
      return
    case "view.toggleFullscreen":
      if (win?.isDestroyed()) return
      win?.setFullScreen(!win.isFullScreen())
      return
    case "edit.undo":
      if (!canUseWindow(win)) return
      win?.webContents.undo()
      return
    case "edit.redo":
      if (!canUseWindow(win)) return
      win?.webContents.redo()
      return
    case "edit.cut":
      if (!canUseWindow(win)) return
      win?.webContents.cut()
      return
    case "edit.copy":
      if (!canUseWindow(win)) return
      win?.webContents.copy()
      return
    case "edit.paste":
      if (!canUseWindow(win)) return
      win?.webContents.paste()
      return
    case "edit.delete":
      if (!canUseWindow(win)) return
      win?.webContents.delete()
      return
    case "edit.selectAll":
      if (!canUseWindow(win)) return
      win?.webContents.selectAll()
      return
  }
}

function canUseWindow(win: BrowserWindow | null): win is BrowserWindow {
  return !!win && !win.isDestroyed() && !win.webContents.isDestroyed()
}

function setZoom(win: BrowserWindow | null, value: number) {
  if (!canUseWindow(win)) return
  const target = win
  target.webContents.setZoomFactor(Math.min(Math.max(value, 0.2), 10))
  updateTitlebar(target)
}
