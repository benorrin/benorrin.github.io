---
layout: post
title: "Stop Asking AI to Do the Job. Ask It for the Tool"
image: ask-ai-for-the-tool.svg
description: "If you keep asking an AI to do the same job, you're paying for the same work every time. Get it to write a script once, then just run the script."
categories: [AI, Automation, Productivity]
---

For the past month or so I've been paying for Claude Pro and using it in my own time, trying to work out how to get the most out of it. What works, what doesn't, and where it's actually worth the money. There's plenty I could write about using AI day to day (and I probably will), but this post is about one habit in particular. Mostly because it's the one I'm most surprised other people aren't doing.

If I've got a task I know I'm going to do again, I don't get the AI to do it again. I get it to write me a program that does it, and from then on I just run the program.

Now, this might be teaching people to suck eggs. But I've brought it up both at home and at work, and a surprising number of people just hadn't thought of it.

## The obvious way, and the better way

Say there's a job you hand to an AI every week. Pulling some figures out of a set of files, tidying up a CSV, renaming a load of files to some convention - that sort of thing. The obvious approach is to just ask it every time. The model reads everything, works out the steps, does them, and hands you the result.

And that works fine. The problem is it starts from scratch every single time. You're paying for the model to read all the inputs and reason through the exact same steps it reasoned through last week. And you might not even get quite the same answer.

The better way is to ask once: "write me a script that does this". Read through it, try it on some real files, fix whatever's wrong. Then next time the job comes round, you (or the AI) run the script.

## Utilities and tools

The things I end up with tend to fall into two buckets.

**Utilities** are small programs that do one specific job, and that's it. A while back I needed to get a floorplan into some CAD software, but all I had was an image of it. So I made a program that converts an image of a floorplan into a vector I could actually import. Another one: I wanted my code linted and formatted exactly the way I like it, not the way some existing linter thinks it should be. So I made my own.

Neither of these is anything clever. They do one thing, and they do it the same way every time.

**Tools** are more about my workflow - the stuff I do regularly that's fiddly enough to be annoying. I run openSUSE, and updating it properly means running the Zypper updates, updating my Flatpaks, and making sure the handful of packages I don't want updated stay where they are. That's three things to remember every time, and it's very easy to forget one. So now there's a script that does all of it in one go.

The board I track work on for this website is another one. It's a self-hosted [Planka](https://planka.app/) board, and I wanted Claude to keep it up to date as it works - create a card when it starts something, comment as it goes, move the card when it's done. Without a tool, every single one of those means the model working out Planka's API all over again: find the board, find the list, look up the label IDs, build the request, check the response. Same reasoning, paid for again, every time a card moves.

So instead there's a small server (a few hundred lines of plain Python) that gives it a handful of commands like `board_overview`, `create_card` and `move_card`. Moving a card is now one call. The model doesn't need to know how Planka works, just that the tool's there.

## Why bother?

The big one is tokens. It doesn't save all of them - if the AI is running the script it still spends a bit calling it and reading the output. But that's one short command and a summary, rather than all the inputs plus all the reasoning about them. And if you run the script yourself, it costs nothing at all.

On a plan with usage limits (which I think is most of us), that's the difference between working all day without much of an issue and slamming into the end of your five-hour usage window by lunchtime.

It also frees up budget for the work that actually needs a model. The tokens you're not spending on busywork can go on the bigger, more expensive models like Opus, rather than dropping down to Sonnet to make your allowance last.

(Side note: I think I'll have to write a post about mixing different models, including local ones like Qwen, to get the best bang for your buck out of a token plan.)

Then there's consistency. A script does the same thing every time. A model usually will too, but "usually" is the problem when the output is feeding into something else. If the task has a right answer, I want it done the same way every time. And if it's wrong, I want it wrong the same way every time, so I can find the bug and fix it once.

You can actually see what it did. When the AI does a task in the chat, the steps are gone as soon as the reply ends. A script *is* the steps, written down. You can read it, test it and stick it in Git like any other code.

Other people can use it too - including people who wouldn't touch AI with a barge pole. Colleagues can run it, and you can drop it into a cron job or a CI pipeline. When the AI does the job in a chat, it only helps whoever's in that chat.

And you can build on it. Once it exists, adding to it is usually a small, well-defined change ("add a flag for X"), which happens to be exactly the kind of thing AI is good at. Before long you've got a bunch of small pieces you understand, rather than one enormous prompt you're scared to touch.

## When it's not worth it

It's not for everything, though.

If it's a genuine one-off, don't bother. Writing and testing a script is more work than just doing the thing once. The payoff only comes the second or third time round.

If the task needs judgement every time - summarising a document, reviewing a PR, drafting a reply - then that judgement is the whole reason you're using a model in the first place. A script can still handle the boring bits either side, like gathering the inputs or formatting the output.

And if you don't understand what the script does, you're no better off than with an answer you can't check. Read it before you trust it, same as you would with code from anyone else.

The question I ask myself now is pretty simple: "Am I going to want this again?" If the answer's yes, I ask for the tool, not the result.

## The result

My GitHub is slowly filling up with little utilities and tools that each do one simple thing, and honestly, I love it. Pretty much every one of them started as something I'd asked an AI to do by hand, before realising I'd be asking it again next week.

I like to think of it as my own little GNU coreutils. Small programs that help me work better and faster.

And the more of them there are, the fewer tokens I actually use. I'm hitting my five-hour window less and less, because more and more of the work is being done by plain old code instead of the model.

None of this is a new idea. Automate the boring stuff - if you do something three times, script it. AI just makes writing the script so cheap that there isn't really an excuse not to anymore.
