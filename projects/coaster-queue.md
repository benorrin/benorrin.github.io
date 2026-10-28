---
layout: project
title: coaster-queue
description: Live ride wait times for UK theme parks, shown on a browser display that looks like an RGB LED matrix. It's one small Rust binary, and the plan is to drive a real LED panel with it.
period: 2026
date: 2026-10-23
status: In progress
image: coaster-queue.webp
hero: coaster-queue.webp
hero_alt: The coaster-queue web display showing Alton Towers wait times in coloured LED dots, with The Smiler at 55 minutes at the top
skills:
 - Rust
 - JavaScript
 - Canvas
 - REST API
 - TOML
source: https://github.com/benorrin/coaster-queue
---

coaster-queue shows live ride wait times for UK theme parks: Alton Towers, Blackpool Pleasure Beach, Chessington, Flamingo Land, Legoland Windsor, Paultons Park, Thorpe Park, and any other UK park that [Queue-Times.com](https://queue-times.com/) adds. The weather for each park comes from [Open-Meteo](https://open-meteo.com/).

## One binary, three parts

You can run the parts in any combination:

* **`led`** is the main display. For now it draws in the terminal, but it's what will drive a real LED matrix.
* **`api`** is a JSON API for the queue data and the settings.
* **`web`** is a browser display that looks like an RGB LED matrix, with the API included.

All three share one data store and one poller, and the poller only fetches the parks someone is looking at, so running more parts costs almost nothing. When idle, the API uses under 5 MB of memory and no CPU between polls.

## The web display

Text resolves like a split-flap board, long ride names scroll, wait bars glide to their new length, and arrows show which way each wait last moved. The footer has the time, the weather at the park on screen and the page number. Press `s` and a settings menu is drawn on the matrix itself, where you can pick parks, ride groups, colour themes, brightness and dot density.

Settings you change in the browser are remembered there and kept in the URL, so you can bookmark a board you've set up.

## Picking rides

Built-in ride groups such as `thrill`, `family`, `kids`, `water` and `scare` narrow the display down to the rides you care about. They match rides by name and by the land Queue-Times puts them in, so new parks pick most of them up automatically. You can also define your own groups in the config file, either as a list of rides (`"Nemesis*"`, `"The Smiler"`) or by combining other groups.

## Configuration

Settings are layered: built-in defaults, then a TOML config file, then command-line flags, then changes made through the API while it's running. Unknown keys and invalid values are errors, so typos get caught at startup rather than silently ignored.

coaster-queue is free software under the GPL v3.
