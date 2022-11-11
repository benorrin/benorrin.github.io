---
layout: project
title: SolMines
permalink: /projects/solmines
---

SolMines is an example webapp created to showcase modern, scalable web development. Users can register an account and win prentend money placing bets in a fun twist on the classic PC game minesweeper.

The app is fully scalable, utilising AWS for it’s backend infrastructure. The project uses industry standards such as Infrastructure as Code, CI/CD, version control and unit testing to aid development.

<hr />

* MIT License
* [Source Code](https://github.com/benorrin/mines)
* [Live Demo](https://mines.orrin.uk)

<div class="alert">
    <p>
        <strong>Note:</strong> 
        Due to cost constraints with AWS, the live demo backend is currently offline. If you would like to test the app for yourself, send me an email and I would be more than happy to spin up an instance for you upon request.
    </p>
</div>

<hr />

## Key Features

* React frontend hosted on AWS and cached using Cloud Front
* Scalable HTTP API backend built using NodeJS/React. Packaged as a docker container and hosted using AWS Elastic Container Service
* Scalable database using MongoDB hosted on AWS
* CI/CD integration using Github Actions
* Unit & mock tests using Jest
* User account and authentication system

## Showcase

<iframe width="560" height="315" src="https://www.youtube.com/embed/MRHnv-AFGSY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>