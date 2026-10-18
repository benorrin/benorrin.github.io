---
layout: project
title: OpenFive
description: An open-source reimplementation of the engine behind The Famous Five, Treasure Island (1999). It runs the original game natively on Windows, macOS and Linux, with no emulator needed.
period: 2026
date: 2026-10-13
image: openfive-beach.webp
hero: openfive-beach.webp
hero_alt: The Famous Five on the beach outside the fisherman's hut, running in OpenFive
skills:
 - C#
 - .NET 8
 - SDL3
 - Reverse Engineering
 - GitHub Actions
source: https://github.com/benorrin/openfive
---

*The Famous Five: Treasure Island* (*5 Freunde auf Schatzsuche*) is a point-and-click adventure released by Ravensburger Interactive in 1999. You play George, Dick and the rest of the gang on the trail of a treasure hidden on Kirrin Island{% include seaglass.html id=4 %}. Like a lot of late-90s PC games, it was built for Windows 95 and DirectX, so getting it working today means fiddling with compatibility modes, emulators or a virtual machine.

OpenFive fixes that. Put your old CD in the drive (or point it at a disc image) and the original adventure plays again, from the intro movie to the closing credits:

* **The whole game**, start to finish, with save and load at any time
* **English and German**, since both languages are on every CD
* **Any window size or fullscreen**, with smooth or sharp pixel scaling
* **Native builds** for Windows, macOS (Apple silicon and Intel) and Linux (x64 and ARM)

## How it works

OpenFive doesn't contain any of the original game's code or assets. The graphics, speech, music and story text are all read from your own CD each time it runs. What OpenFive provides is a new engine, written from scratch in C#, that behaves exactly like the original:

* **Disc access.** It reads ISO 9660 images, raw `.img`/`.bin` dumps, `.cue`/`.ccd` sheets or a mounted CD directly, so you never have to extract anything by hand.
* **File formats.** It has decoders for the game's proprietary BRG images, Smacker video, WAV audio and resource scripts.
* **A faithful task scheduler.** The original engine runs at 10 ticks a second, and almost everything (walking, talking, animations) is a chain of tasks that wait on each other's handles. OpenFive reproduces that model tick for tick, so the story plays out exactly as it was written.
* **Rendering.** An 800×600 RGB565 framebuffer with depth-sorted sprites, scenery masks that let characters walk behind objects, and character shadows, all scaled up to modern displays through SDL3.
* **Readable story scripts.** Each of the game's locations is its own C# class with named story variables, instead of a wall of magic numbers.

## Testing an adventure game automatically

Adventure games are hard to test: one wrong story flag and you're stuck three rooms later. So OpenFive has a headless `--play` mode that drives the game off-screen from simple commands like `click OBJECT`, `use ITEM TARGET` and `expect LOCATION`, skipping speech as it goes. Nine scripts chained together play the entire game from a new save to the credits in about a minute. That's my regression suite: if a change breaks a puzzle anywhere in the story, I know straight away.

![The dungeons under Kirrin Castle](/assets/img/openfive-dungeon.webp)

## Shipping it

I wanted it to be easy for anyone to play, not just people with a .NET SDK installed. GitHub Actions builds self-contained, single-executable releases on every push: a `.zip` for Windows, `.dmg` files for both Mac architectures, and `.deb`, `.rpm` and portable tarballs for Linux on x64 and ARM. Download, run, play.

OpenFive is an independent fan project, not affiliated with Ravensburger or the rights holders of *The Famous Five*. You need your own copy of the original CD to play. It's free software under the GPL v2.
