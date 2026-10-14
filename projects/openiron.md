---
layout: project
title: OpenIron
description: A self-hosted workout and body-metrics tracker for people who lift, built so your training data stays on your own server rather than behind a subscription.
period: 2026
date: 2026-03-17
status: In progress
skills:
 - Go
 - Gin
 - PostgreSQL
 - Docker
 - JWT
source: https://github.com/benorrin/openiron
---

I got frustrated with fitness apps. Most are built around running and cardio, lock basic features behind a subscription, and keep your training history on someone else's servers. I wanted something focused on weightlifting that I could run in my own homelab, so I'm building it.

OpenIron is a self-hosted web app for logging workouts, tracking body measurements and progress photos, and seeing how you're progressing over time, without sharing your data with a third party.

## Where it's at

OpenIron is in early development. So far I've built the foundations of the API:

* **A Go REST API** using [Gin](https://gin-gonic.com/), with handlers for authentication, exercises, workouts and body metrics
* **PostgreSQL** with versioned up/down migrations via `golang-migrate`, covering users, profiles, exercises, workouts, body metrics and indexes
* **JWT authentication** with bcrypt-hashed passwords and a bootstrap admin account
* **Unit tests** using `sqlmock` and `testify`, so database code is tested without a live database
* **Docker Compose** to bring up the API and a health-checked Postgres with one command, ready to drop into a homelab

The goal is a complete tracker with workout logging, body metrics, progress photos and analysis of how your training is going, all running on hardware you own.
