---
layout: post
title: "Automating Docker Updates in My Homelab"
image: homelab-updates.svg
description: "How my Docker containers went from floating :latest tags to pinned versions, with Renovate opening a PR for each update and a small Bash script deploying whatever changes in Git."
categories: [Homelab, Docker, Automation]
---

If you run a homelab, you'll know that one of the most frustrating parts is keeping up with the constant barrage of updates.

I very much like my homelab to be "set and forget". I just want everything to chug away without much effort from me, unless I decide to get involved and start tinkering (which I do from time to time).

That's why I run Debian stable with unattended upgrades. I just want the servers to keep running and be secure without *too* much manual intervention from me, and on that front it works really well.

Where it falls short is Docker. I run quite a few containers, so there's a steady stream of updates that need deploying, and if you leave it for a month they really start to pile up.

It's been one of those small grumbles I kept meaning to get around to and never did. I'd check in about once a month, run my updates, and that was that.

Then, back in September, I checked whether the containers on one of my servers were actually up to date, and found out Uptime Kuma hadn't updated in a very long time. It was set to `:latest`, and `:latest` had been stuck on 1.23.17 for nearly eleven months. The project had moved on to 2.x, which only ships under version-numbered tags, so nobody was pushing to `:latest` anymore. Nothing had actually broken, so I'd never noticed. All those monthly updates, and it had just been sat there getting older.

That was the push I needed to sort it out properly. Twelve of my images were on `:latest`, and a handful of others were on tags like `:edge`, `:release` or `:7`, so my Git repo could tell me what I'd *asked* for but not what was actually running.

So, it was time to build something better.

## What I was trying to do

Basically, I wanted to automate updating my containers and deploying them. There were a few things I wanted from it, though:

- Routine updates should just happen without me, otherwise I've not really fixed anything.
- Anything risky should wait for me, because some of these containers hold photos and documents I can't replace.
- I should be able to see what's actually running (see: Uptime Kuma).
- If an update goes wrong, it should be easy to undo.

## Working out how to do it

### Noticing the updates

The first thing most people reach for with Docker is [Watchtower](https://github.com/containrrr/watchtower). It watches your running containers, and when the image behind a tag changes, it pulls the new one and restarts the container. A cron job running `docker compose pull` gets you much the same thing.

It's nice and simple, and it would have sorted the first thing on my list. But it only works if you stay on floating tags like `:latest`, which is what caught me out in the first place. Watchtower only knows whether the tag you're on has changed, so Uptime Kuma would have stayed on 1.23.17 forever. You can exclude individual containers, but there's no real record of what changed or when, and rolling back means working out what you were running before.

Call me fickle, but I also just don't trust it. That's nothing against the developers, but their own README says they don't recommend it in a commercial or production environment. Now, a homelab is what they say it's for, but my photos are about as close to production as anything I run. And I'd rather have something simple that I own and operate myself than another container that could develop issues or get deprecated without notice. As it happens, the original project is no longer maintained, so I wasn't far off.

Then there are notifiers like [Diun](https://crazymax.dev/diun/), which just tell you when there's a new image. Which is fine, but that's only another to-do list.

In the end I decided to treat container images like any other dependency in a codebase. If every image is pinned to an exact version in Git, an update is just a one-line change to a file, and a bot can compare version numbers and open a pull request for it. That gets me most of what I wanted. I can decide whether an update goes ahead on the PR, Git tells me what's running, and if something breaks I can revert the commit.

The catch is that every update becomes a PR, and reviewing all of those by hand would just be my monthly chore with extra steps. So the safe ones would have to merge themselves, leaving just the risky ones for me.

GitHub's own Dependabot can open these PRs too, but [Renovate](https://docs.renovatebot.com/) has auto-merging, per-directory rules and custom version formats built in, and I can run it in a container on my own hardware.

(Yes, I realise I've just moaned about relying on someone else's container and then picked one. But Watchtower is restarting my running containers, while Renovate only ever touches a Git repo, so I can see everything it does and revert it. If it broke or got abandoned tomorrow, the PRs would stop and that's about it.)

### Getting them onto the servers

Merging a PR doesn't change anything on its own, so something has to actually get the new version running. Either GitHub tells the server to deploy (push), or the server keeps asking GitHub if anything's changed (pull).

Push is the usual way of doing this at work, with a CI job that SSHes in or a webhook. But my servers are on my home network, so that means giving GitHub a way in, or running a self-hosted runner on the network and looking after that instead.

Pulling avoids all that. The server only makes outbound requests, so I don't have to open anything up, and all it needs is a read-only deploy key. A change might take a few minutes to land, but for a homelab I'm not going to lose any sleep over that.

One of my hosts already works this way through Portainer's Git sync. The other, srv2, doesn't run Portainer, so it needed something of its own. All it really has to do is fetch the repo, see what changed and run `docker compose up`. I didn't want a whole new service for that, especially for the part that actually touches my containers, so it's a short Bash script that I own and can fix myself.

Long term, I'll probably move all of this within the homelab. Hosting my own Git repos, CI/CD etc. But for the time being at least, I want the ease of hosting "critical infrastructure" in the cloud.

### The plan

So an update now goes like this:

1. A new image is released.
2. Renovate opens a PR that bumps the tag.
3. The PR either merges itself or waits for me, depending on what's being updated.
4. Once it's on `main`, the host running that stack redeploys it.

## Step one: pin everything

My homelab is two hosts running 14 Docker Compose stacks, all defined in one Git repo. Each stack gets its own directory with a `compose.yml` in it.

Everything else relies on the versions being in Git, so the first job was replacing every floating tag with an exact version. To keep it that way, a CI check fails any PR that adds an untagged image or a `:latest`.

## Step two: opening the PRs

This half isn't really a script I wrote. Renovate does the work, and all I've written is the config.

Renovate runs one pass and then exits, so its container just runs it in a loop once an hour. It logs in to GitHub with a fine-grained token scoped to that one repo. As well as the permissions you'd expect, the token needs *Commit statuses*, since that's how Renovate reports its release-age check on the PR.

The main thing to decide was what's allowed to merge without me. Trimmed down, the rules look like this:

```json
{
  "minimumReleaseAge": "3 days",
  "packageRules": [
    {
      "matchUpdateTypes": ["patch", "minor", "digest"],
      "automerge": true
    },
    {
      "matchUpdateTypes": ["major"],
      "automerge": false,
      "addLabels": ["major"]
    },
    {
      "matchFileNames": ["immich/**", "paperless/**", "caddy/**"],
      "automerge": false,
      "addLabels": ["needs-review"]
    }
  ]
}
```

A release has to be three days old before Renovate will touch it, which gives everyone else a chance to find the bad ones first. After that, patch and minor bumps merge on their own, and major bumps wait for me.

The last rule is the one I care about most. Immich and Paperless hold data I really don't want to lose to a surprise migration, and Caddy is my reverse proxy, so if that goes down it takes everything else with it. Those three never merge themselves, however small the update is.

The rest of the file is mostly edge cases. Immich's server and machine-learning images have to stay on the same version, so they're grouped into one PR. Postgres and Redis major bumps are switched off completely, because I'd rather do those by hand. Linuxserver.io's tags (`<version>-ls<build>`) need a custom regex before Renovate can compare them. And Renovate itself releases almost daily, so it only gets to update itself on Monday mornings.

A typical PR is just one line:

```diff
-    image: docker.io/louislam/uptime-kuma:2.5.8
+    image: docker.io/louislam/uptime-kuma:2.5.9
```

So far it's opened five real PRs. Four were small bumps that merged themselves about six seconds after being opened (the three-day wait had already happened by then). The fifth was a Caddy bump, which sat there labelled `needs-review` until I merged it by hand. A small bridge also mirrors each PR onto the [Planka board I mentioned last time](/blog/ask-ai-for-the-tool/), so the ones waiting on me land in a *Needs review* column.

## Step three: deploying the changes

The deploy script on srv2 is about 80 lines of Bash, run every five minutes by a systemd timer. It takes a lock so two deploys can't overlap, fast-forwards a local clone of the repo, and then goes through a plain text list of stacks to see which ones have changed.

Each stack has a small state file holding the last commit that deployed successfully, and that file only gets written once the deploy has worked. Because the script diffs against that commit rather than the previous pull, a failed deploy gets retried on the next run. A stack can't get forgotten just because `main` has moved on since it failed.

If a stack has changed, the script runs `docker compose up -d` and Compose does all the hard work from there. It pulls the new tag, recreates the containers whose config changed, and leaves the rest of the stack running.

### The bits that took more thought

Secrets stay out of Git, in an env file per stack on the server. If one of those goes missing, Compose will happily substitute blank strings and start your app with an empty database password. So if a compose file uses variables and its env file isn't there, the script refuses to deploy that stack.

`up -d` also doesn't notice every change. The Planka bridge has its code bind-mounted, so when the code changes, the compose config stays identical and Compose decides there's nothing to do. Stacks can have an optional hook script for that sort of thing, and that one just restarts the container. Caddy's hook is a bit cleverer - it validates the new Caddyfile, reloads it, and puts the old one back if validation fails.

My favourite bit is the very last line of the script:

```bash
# Run on one line so bash has parsed the whole script before the checkout can change under it.
main "$@"; exit $?
```

The script lives in the repo that it updates, and Bash reads scripts from disk as it goes. If a deploy pulled down a new version of `deploy.sh` while the old one was still running, Bash could carry on reading from the middle of a different file. Keeping it all on one line, with an `exit` straight after, means there's nothing left for it to read.

## What it doesn't do

It's not perfect, though. There are a few gaps I know about.

Renovate has `ignoreTests` turned on, so the automerge doesn't wait for CI. The compose check runs on every PR, but on all four automerged ones it finished a few seconds *after* the merge, so it couldn't have stopped anything. The check went in after the Renovate config, and that's a setting I should go back and change.

A successful deploy also just means `docker compose up` exited cleanly. A container that starts and then falls over still counts as deployed, and there's no automatic rollback. Uptime Kuma would be the thing to tell me about that, which is a little ironic given how all this started.

Failed deploys only show up in the systemd journal, and they retry every five minutes until they work. If I'm not looking, I won't know.

And the three-day wait won't catch everything. It helps with releases that get pulled quickly, but not with a bug that takes a week for anyone to notice.

## The result

The boring updates now happen without me, which is all I really wanted in the first place. The ones that could actually hurt wait in a column for me to look at, each with a diff showing exactly what's changing. And if I want to know what version of something is running, I can just look in Git.

It's about as close to set and forget as I'm going to get, and nothing should be sitting on an eleven-month-old version again. (Unless Renovate breaks, of course.)
