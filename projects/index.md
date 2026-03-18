---
layout: default
title: Projects
description: Side projects and experiments to learn and explore new technologies.
---

<h1 style="margin-top: 0;">{{ page.title }}</h1>
<p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 3rem;">
    {{ page.description }}
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
    {% for item in site.pages %}
        {% if item.path contains 'projects/' and item.path != 'projects/index.md' %}
        <div class="card" style="display: flex; flex-direction: column; border-left: 4px solid var(--primary); padding-left: 1.5rem; overflow: hidden;">
            {% if item.image %}
            <div style="margin: -2rem -2rem 1rem -1.5rem; height: 180px; overflow: hidden; border-radius: 4px 4px 0 0;">
                <img src="/assets/img/{{ item.image }}" alt="{{ item.title }}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            {% endif %}
            
            <h3 style="margin-top: 0; color: var(--primary);">{{ item.title }}</h3>
            
            {% if item.period %}
            <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1rem;"><strong>Period:</strong> {{ item.period }}</p>
            {% endif %}
            
            {% if item.description %}
                <p style="flex-grow: 1;">{{ item.description }}</p>
            {% else %}
                {% if item.excerpt %}
                    <p style="flex-grow: 1;">{{ item.excerpt }}</p>
                {% else %}
                    <p style="flex-grow: 1;">{{ item.content | truncatewords: 20 }}</p>
                {% endif %}
            {% endif %}

            {% if item.source %}
            <p style="margin-bottom: 1rem;">
                <a href="{{ item.source }}" target="_blank" rel="noopener noreferrer" class="btn" style="font-size: 0.85rem; padding: 0.5rem 1rem; display: inline-block;">View Source Code</a>
            </p>
            {% endif %}
            
            {% if item.skills %}
            <div style="margin-bottom: 1rem;">
                <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: var(--text-light);"><strong>Technologies</strong></p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    {% for skill in item.skills %}
                        <span class="post-tag">{{ skill }}</span>
                    {% endfor %}
                </div>
            </div>
            {% endif %}
            
            <div style="margin-top: auto; padding-top: 1rem;">
                <a href="{{ item.url }}" class="btn" style="font-size: 0.85rem; padding: 0.5rem 1rem; display: inline-block;">View Details →</a>
            </div>
        </div>
        {% endif %}
    {% endfor %}
</div>