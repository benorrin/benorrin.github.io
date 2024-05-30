---
layout: page
title: Portfolio
---

List of portfolios...

<div class="card-container">
{% for page in site.pages %}
    {% if page.path contains 'portfolio/' and page.path != 'portfolio/index.md' %}
    <a href="{{ page.url }}">
        <div class="card">
            <img src="/assets/img/{{ page.image }}" alt="Placeholder Image">
            <div class="card-content">
                <h3 class="card-title">{{ page.title }}</h3>
                <p class="card-description">{{ page.description }}</p>
            </div>
        </div>
    </a>
    {% endif %}
{% endfor %}
</div>