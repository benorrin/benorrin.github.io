---
layout: project
title: Geekoffee
description: A tiny Rust system tray app for KDE Plasma. One click keeps your PC awake, and another click puts everything back to normal.
period: 2026
date: 2026-10-14
image: geekoffee.svg
skills:
 - Rust
 - Tokio
 - D-Bus
 - KDE Plasma
 - Linux
source: https://github.com/benorrin/geekoffee
---

Every so often I need my machine to stay awake: a long build, a big download, a presentation, or a terminal I'm watching from across the room. On macOS there are apps like Caffeine for this. On my openSUSE desktop it meant going into the power settings, turning things off, and then forgetting to turn them back on.

Geekoffee is the fix. It sits in the KDE Plasma system tray as a little coffee cup:

* **Left-click** toggles keep-awake on or off.
* **Right-click** opens a menu with *Keep awake* and *Quit*.
* **Hover** shows the current state.

While it's on, the screen won't dim or lock and the PC won't go to sleep. When you switch it off, your normal settings take over again.

## How it works

The key design decision is that Geekoffee **never changes your power settings**. Instead it asks the desktop politely over D-Bus to hold off for a while, using two standard freedesktop APIs:

| D-Bus API | What it blocks |
|---|---|
| `org.freedesktop.ScreenSaver.Inhibit` | Screen dimming, blanking and locking |
| `org.freedesktop.PowerManagement.Inhibit` | Automatic suspend when idle |

Switching it off releases both inhibitors. And because the inhibitors belong to Geekoffee's D-Bus connection, if the app quits or crashes, the session bus cleans them up automatically, so your PC can never get stuck awake. While it's active it also shows up in Plasma's own *Power and Battery* applet, which explains why the machine isn't sleeping.

## Under the hood

It's a small, single-binary Rust app:

* [`ksni`](https://crates.io/crates/ksni) for the StatusNotifierItem tray icon and menu
* [`zbus`](https://crates.io/crates/zbus) on a [Tokio](https://tokio.rs/) runtime for the async D-Bus calls
* [`resvg`](https://crates.io/crates/resvg) to render the embedded SVG coffee cups into tray pixmaps, so there are no image files to install
* A release profile with LTO and stripping to keep the binary small

## Install

You'll need a Rust toolchain. Then:

```sh
cargo build --release
install -Dm755 target/release/geekoffee ~/.local/bin/geekoffee
install -Dm644 geekoffee.desktop ~/.config/autostart/geekoffee.desktop   # start on login
```

The [README](https://github.com/benorrin/geekoffee#readme) has the full steps, including the app launcher entry and how to uninstall. Geekoffee is free software under the GPL v3.
