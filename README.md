# Countries Search App

A simple Angular application to explore country details and upcoming public holidays.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)


---

## Overview

The **Countries Search App** allows users to:

- View a list of available countries.
- Search and filter countries by name.
- See detailed information about a selected country.
- View upcoming public holidays for the selected country.

Data is fetched from a REST API and cached in the app for performance.

---

## Features

- Country listing with filtering.
- Country detail page with borders, official and common names, and region.
- Upcoming holidays per country with date and local name.
- Random countries feature.
- Reactive Angular forms and pipes for date formatting.
- Cache management for country details and holidays to reduce API calls.

---

## Technologies

- **Angular 20** – Frontend framework
- **TypeScript** – Language for the app
- **RxJS** – Reactive programming for HTTP and state
- **SCSS** – Styling
- **Angular Router** – Routing between pages
- **HTTPClient** – API communication

---

## Installation

```bash
git clone https://github.com/GeorgeShegera/countries-search-app.git
cd countries-search-app
npm i
npm run start
```
