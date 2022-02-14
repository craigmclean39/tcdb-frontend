<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url] -->

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/craigmclean39/tcdb-frontend">
    
  </a>

<h3 align="center">True Crime Podcast Database</h3>

  <p align="center">
    A true crime podcast database!
    <br />
    <a href="https://github.com/craigmclean39/tcdb-frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://tcdb-frontend.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/craigmclean39/tcdb-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/craigmclean39/tcdb-frontend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#libraries-used">Libraries Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
      <li><a href="#demo">Live Demo</a></li>
        <li><a href="#installation">Local Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://tcdb-frontend.vercel.app/)

<p>
This project was created because I wanted nice way to view true crime podcast data. This is just a framework of the site I hope to make. I plan to add categories and filters, and fix the search implementation. I used this project as an excuse to try out Next.js. I implemented server side rendering on all pages that fetch data. I also tried out the Mantine UI library for quick development and iteration.

</p>

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Libraries Used

- [Next.js](https://nextjs.org/)
- [Mantine UI](https://mantine.dev/)
- [Express](https://expressjs.com/)
- [node-schedule](https://github.com/node-schedule/node-schedule)
- [mongoose](https://mongoosejs.com/)
- [date-fns](https://date-fns.org/)
- [react-audio-player](https://github.com/justinmc/react-audio-player)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

## Live Demo

Take a look at the demo <a href="https://tcdb-frontend.vercel.app/">here.</a>

## Installation

Install the backend<br>
`git clone https://github.com/craigmclean39/tcdb-backend.git`<br>
`cd tcdb-backend`<br>
`npm install`<br>
`touch .env`<br>
`nano .env`<br>
`MONGODB_CONNECT=mongodb+srv://[username]:[password]@database-address`<br>
`cd ..`<br>
`npm run start`<br>

Install the front end<br>
`git clone https://github.com/craigmclean39/tcdb-frontend.git`<br>
`cd tcdb-frontend`<br>
`npm install`<br>
`touch .env.local`<br>
`nano .env.local`<br>
`NEXT_PUBLIC_SERVER_ADDRESS=http://localhost:3001`<br>
`npm run build`<br>
`npm start`<br>

Populate the Database<br>
http://localhost:3000/admin<br>
Click populate<br>

## Features

- View the latest episode releases. New episodes are scanned hourly.<br>
- View podcast information, and information about it's episodes<br>
- Podcast and episode lists are paginated<br>
  <img src="./readme/podcast.jpg">
- All pages do their initial fetch call server side before the page is served to the browser<br>
- HTML Head tag filled dynamically for SEO<br>
- Listen to episodes in embedded player<br>
  <img src="./readme/episode.jpg">
- Mobile support<br>
  <img src="./readme/mobile.jpg">

<!-- CONTACT -->

## Contact

Craig McLean - craig@craigmclean.dev<br>
https://www.linkedin.com/in/mcleancraig/

Project Link: [https://github.com/craigmclean39/tcdb-frontend](https://github.com/craigmclean39/tcdb-frontend)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [react-icons](https://react-icons.github.io/react-icons/)
- [Google Fonts](https://fonts.google.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/mcleancraig/
[product-screenshot]: ./readme/latest.jpg
