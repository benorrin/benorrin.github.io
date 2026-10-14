---
layout: default
title: Projects
description: Side projects, open-source tools and experiments, mostly built because I wanted them to exist.
---

<header class="page-header">
    <p class="eyebrow">Projects</p>
    <h1>Things I've built</h1>
    <p class="lead">{{ page.description }}</p>
</header>

{% assign projects = site.pages | where_exp: "p", "p.path contains 'projects/'" | where_exp: "p", "p.path != 'projects/index.md'" | sort: "date", "first" | reverse %}
<div class="card-grid">
    {% for item in projects %}
        {% include card.html item=item label="View project" %}
    {% endfor %}
</div>
