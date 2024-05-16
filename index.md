---
layout: default
---

**Hi, I'm Ben** 👋

I'm a software developer and devops engineer from London. You'll usually find me writing code, hacking away at a backend or microservice, or tinkering with a Linux server.
I like to explore new technologies and make interesting things with them.

I currently work as a Software Engineer at [Radical](https://www.radicalcompany.com).

I recently graduated with a BSc Hons in **Computer Science** from [The Open University](https://open.ac.uk) and I'm currently looking to start my journey in the industry.

I've built a number of [projects](./projects.html) in my spare time, and I'm always looking for new open source projects to contribute to.

Read my [GPG key](https://orrin.uk/gpg)

<h2>Recent Blog Posts</h2>

<ul>
  {% for post in site.posts limit:10 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
    </li>
  {% endfor %}
</ul>

<p><a href="/blog">View More</a></p>
