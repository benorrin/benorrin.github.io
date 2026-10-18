---
layout: project
title: Driftwood
description: A slow, text-driven survival game set on an uncharted South Seas island in 1846, in the spirit of A Dark Room. It runs in your browser, and every picture and sound in it is generated in code.
period: October 2026
date: 2026-10-18
image: driftwood.webp
hero: driftwood.webp
hero_alt: Driftwood in its default engraving style, with a hand-drawn beach camp above a list of actions, the log on the left and stores on the right
skills:
 - JavaScript
 - SVG
 - Web Audio API
 - CSS
play: /Driftwood/
source: https://github.com/benorrin/Driftwood
---

> *They rowed you ashore at first light, as the old custom demands: a flintlock with a single ball, a flask of water, a tin of ship's biscuit, and the Bible, so that you might make your peace.*

You were bosun's mate aboard the barque *Meridian*, out of Bristol and bound for Valparaíso. When the crew mutinied you wouldn't take either side, so the mutineers left you alone on an uncharted island.

Gather driftwood. Keep the fire alive. Explore the island and learn what happened to the brig *Calliope*, wrecked on the same reef twenty years before you. Then find a way home.

**[Play Driftwood in your browser →](/Driftwood/)** Your progress saves automatically, and it works on phones too.

## What's in it

* **Survival.** A day/night cycle, a fire to feed, and hunger and thirst every dawn. Nights without a fire are cold, and something prowls beyond the light.
* **Crafting.** Twist palm fibre into cord, then build a lean-to, stone tools, rain catchers, fish weirs and a smoking rack.
* **Exploration.** A hand-drawn chart with eight places to find, from the tide pools to a wreck on the reef and the summit.
* **Combat.** Real-time fights with land crabs, a wild boar, a viper, a shark… and perhaps a man.
* **Story.** A message in a bottle, a captain's log and a dead man's journal lead you through the island's history. The choices you make change the ending.
* **Two ways off.** Build a raft and brave the open sea, or light a signal pyre and pray a ship sees it.

## No asset files at all

Everything you see and hear is generated in the browser. The illustrations are drawn as SVG in code, in the manner of a 19th-century wood engraving: hatching, stipple and ink line, roughened with an SVG displacement filter so nothing is quite ruler-straight. The sound is all synthesised with the Web Audio API: breaking surf, a crackling fire, an original fiddle lament in D dorian, a heartbeat drum for fights and ship's bells at dawn.

There's no build step and no framework either. It's plain HTML, CSS and JavaScript, and it runs straight from `file://` if you clone it.

## Visual styles

Every illustration is drawn in just two colours, so swapping the palette repaints the whole game. I took the idea from the monitor palettes in *Return of the Obra Dinn*. As well as the default ink-on-paper engraving, you can play on chalk and slate, a 1984 Macintosh, green, amber and cyan CRTs with scanlines and glow, or a pea-green pocket LCD.

![Driftwood shown in all eight visual styles](/assets/img/driftwood-styles.webp)

Driftwood is free software under the GPL v3.
