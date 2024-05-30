---
layout: post
title: "Discovering Emacs"
published: false
---

Over the past few weeks I have seen the light. I have been bitten by the bug of Free Software, and I have been converted to an Emacs purist - all completely by chance.

A few short weeks ago I began looking for a new editor, I had begun to become *slighlty* frustrated with VSCode and the way it does things. As good of an editor it may be, I felt that it was in some ways holding me back. The lack of intellisense was starting to annoy me, and the general lack of macros meant I spent a lot longer than I needed performing grunt work whilst coding.

So, I went on the hunt for an alternative to use.

Now, I do like to use a bit of free and open source software wherever I can - so the obvious choice was to try and find some FOSS alternatvie editor or IDE that I could use.

I had a look at what was out there - Geany, NetBeans etc. and they really just don't quite live up to the level of polish and feature set that the proprietary editors and IDEs like VSCode and JetBrains do.

That was when I stumbled across Emacs.

Now, Emacs might seem like an odd choice - given its user interface looks fresh out of a terminal window - but it had a certain minimalist and rustic feel I quite liked. Not to mention, it seemed to have an ~~army~~ religion of fanatics that extolled the virtues of this supposed all powerful editor

Probably like most new Emacs users, after installing the program for the first time I felt like a fish out of water. This certainly wasn't an experieince that I had been used to, and this was going to take some adjusting.

Thankfully, Emacs comes with a built-in tutorial (quite a novelty!) exactly for this purpose. A simple tutorial wasn't the only off-the-wall features that are built in - as I would come to learn.

Very quickly I was enthralled. I was surprised to find features and macros built into Emacs that I never knew I even needed. Jumping per word, jump to the start and end of a file -  and so on.

It was obviously apparent that this was of working was valuabkle and efficient - if I could find a way to implement it into my workflow.

One of the obvious issues straight away as a new user of emacs, and someone who is faimilar with using traditional editors like VSCode, is that it offers a very diffierent way of working.

Buffers and frames are a very different way of working vs a pretty file tree and nice tabs in an aesthetically pleasing UI. And not one that's is easy to get used to (at least at first).

My first task was to see if I could recreate my usual VSCode workflow within emacs.

After a little googling I decided to give the Doom Emacs variant a try. It seemed to have most of the things I was looking for pre configured, and seemed to have a large community supporting it.

The setup wasnt too bad and soon enough I was bumbling away with Doom. But.. I hated it. You see, unbeknowst to me, Doom Emacs has a strong focus on Vim (eurgh!) and a lot of the keybindings are completely different to vanilla emacs. That might be great if you're a regular vim user, but for me that was a big step back. I quite like the vanilla emacs keybindings and I intend to keep using them.

After a bit more hacking trying to remove evil mode and expunge the vim keybindings I decided to juice wasnt worth the squeeze. I didnt want to fight Doom emacs to work the way I wanted it to, it was much easier just to revert back to vanilla emacs.

So back to vanilla emacs I went.

First port of call was to find a file tree explorer. This turned out to be slightly simplier than expected. Treemacs and Neotree were the two favourites. Neotree was associated with Vim so that was immediately binned. I kid - no, Treemacs seemed to have the most rich feature set and so I added that to my config,

It took a little getting used to, to figure out not only how to naviategate treemacs, but how to add projects in the way I expected. But before long we had a VSCode style file tree which functioned BETTER than VSCode. Better? you say. Yes, better. Better because I can configure treemacs to work exactly how I want it to work. Cant do that in VSCode.

Okay, so next step - we have these ugly buffers. And we have no idea whats actually happening. We just have to pray to stallman and hope the buffer we want magically renders.

Lets get this a bit more modern. Let's use TABS. Amazing right? Tabs.

Well turns out, Emacs has us sorted. We have centaur tabs. Centaur Tabs gives us some beautiful tabs, and once again, they can be configured exactly how we want them to be.

Now, I'm not going to downplay how frustrating this process was. There were numerous times where I simply had to give up using emacs because it was behaving in ways I didn't expect. Clicking a tab "deleted" it. Tabs dissapeared and reappeared. And so on.

It took some perseverance, but slowly I begun to not only learn the "Emacs way" of doing things, but I was also slowly beginning to wrangle emacs to do things the way I wanted.

Very quickly I began to become quicker and more efficient in emacs than I ever had been in VSCode.

And, as problems and quirk arose, I found I could quickly add packages and changes to my config file the get emacs to work exactly as I wanted.


