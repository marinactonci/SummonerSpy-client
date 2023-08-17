<h1 align="center">Summoner Spy</h1>

<div align="center">
  <h3>
    <a href="https://summoner-spy.vercel.app/">
      Demo
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Instalation](#instalation)
- [Contact](#contact)

<!-- OVERVIEW -->

## Overview

![screenshot](screenshot.png)


SummonerSpy is an API project that allows you to check your rank, statistics, and match history page for League of Legends. It is built using Angular, Node, Tailwind, and Firebase, which are modern web development tools and technologies. SummonerSpy is a great tool for League of Legends players who want to keep track of their gaming progress and learn how they can improve their gameplay.

### Built With

- [Angular](https://angular.io/)
- [Tailwind](https://tailwindcss.com/) ([DaisyUI](https://daisyui.com/))
- [Firebase](https://firebase.google.com/)
- [ExpressJS](https://expressjs.com/)

## Instalation

### Prerequisites

Have the latest version of git and node installed on your computer.

### Frontend

Clone this repo and install neccessary dependencies. Make sure that after cloning you cd into the right directory:
```terminal
$ git clone https://github.com/marinactonci/SummonerSpy-client.git
$ cd SummonerSpy-client
$ npm install
```
After the dependencies have been installed, you can run the project with:
```terminal
$ ng serve
```

### Backend

In case you want to use your own Riot API key, clone the [backend repo](https://github.com/marinactonci/SummonerSpy-server) and install dependencies:
```terminal
$ git clone https://github.com/marinactonci/SummonerSpy-server.git
$ cd SummonerSpy-server
$ npm install
```
Change the following line in `server.js`:
```javascript
axios.defaults.headers.common['X-Riot-Token'] = 'YOUR-RIOT-API-KEY';
```
Start the `server.js` file:
```terminal
$ npm run start
```
Finally, change endpoint to localhost in frontend in constants.ts file:
```typescript
export const endpoint: string = 'http://localhost:4320';
```

## Contact

- GitHub [@marinactonci](https://github.com/marinactonci)
- LinkedIn [Tonči Marinac](https://www.linkedin.com/in/marinactonci/)
- Instagram [@marinactonci](https://instagram.com/marinactonci)
