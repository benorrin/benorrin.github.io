---
layout: portfolio
order: 1
company: Radical Company
title: Lloyds Working Capital Management
image: lloyds-working-capital-management.jpg
description: Rebuilt the backend and AWS infrastructure behind a Lloyds Bank internal tool so it could launch to the public.
period: March – October 2023
highlight:
  value: ">90%"
  label: reduction in AWS infrastructure spend
roles:
  - Backend Developer
  - Cloud Infrastructure
  - DevOps
skills:
 - C#
 - ASP.NET
 - AWS
 - CI/CD
---

## The brief

[Lloyds Bank](https://www.lloydsbank.com/) had an internal Working Capital Management (WCM) tool that staff used to assess products and services for business clients. Lloyds wanted to turn it into a [public tool](https://www.lloydsbank.com/business/working-capital-management-tool.html): any business could look itself up using Companies House data, see its key financial metrics, and model scenarios to improve its working capital.

That meant taking a legacy internal codebase and making it ready for the public, at lower cost, while staying compliant with GDPR and financial regulations.

![The public Lloyds Working Capital Management tool](/assets/img/lloyds-working-capital-management.jpg)

## What I did

* **Rebuilt the backend API in C# and ASP.NET.** I designed and built a modernised API that aggregates and processes company data, including integrating the Companies House API.
* **Redesigned the AWS infrastructure.** I re-architected the hosting for scalability, reliability and cost, which is where the biggest saving came from.
* **Set up CI/CD.** I built a deployment pipeline so changes could be tested and shipped quickly and consistently.

## The result

* **AWS spend down by more than 90%** compared with the original infrastructure
* **A legacy internal tool modernised** and launched publicly for UK businesses
* **Compliant with GDPR and financial regulations**, as required for a bank-branded public service
