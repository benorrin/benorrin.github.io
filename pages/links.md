---
layout: page
title: Links
permalink: /links/
description: Sites and people worth your time. The old web was held together by people linking to each other, so here's my bit.
---

{%- assign groups = site.data.links | group_by: "group" %}
{%- for group in groups %}
<h2>{{ group.name }}</h2>
<ul class="link-list">
{%- for link in group.items %}
    <li>
        <a href="{{ link.url }}">
            <span class="link-name">{{ link.name }}</span>
            <span class="link-host">{{ link.host }} ↗</span>
        </a>
        <p>{{ link.about }}</p>
    </li>
{%- endfor %}
</ul>
{%- endfor %}

Know somewhere I should add? [Email me](mailto:ben@orrin.uk).

## Link to me

If you'd like to link back, you're welcome to use this button. Please copy it to your own site rather than hotlinking.

<p class="button-share">
    <img src="/assets/img/orrin-uk-88x31.png" width="88" height="31" alt="orrin.uk" class="pixel">
</p>

```html
<a href="https://orrin.uk">
  <img src="orrin-uk-88x31.png" width="88" height="31" alt="orrin.uk">
</a>
```
