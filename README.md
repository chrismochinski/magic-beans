# **Magic Beans Cryptofolio**  <img src="./README-visuals/magic-beans-logo.png" width="13%" style="float: left; margin: 5px">


## <b><span style="color:#F0ED86">A cryptocurrency market data and portfolio tracker for everyone!</b>

### ⭐ &nbsp; Check out [this app presentation on YouTube](https://youtu.be/_slC4RNX-d8) &nbsp; ⭐

---


##### 🗓️ &nbsp; <span style="color: #9ED2F0">_Duration: Two-Week Sprint_  </span><br />

<p> This playful and feature-rich application, named without hesitation by the developer's eight-year-old stepson, was styled for mobile and built to aid in the demystification the role of cryptocurrency in the advanced financial world of today.</p>
<p>A user is able to see an expanse of realtime market data as well as add assets to and track their own virtual portfolio.</p>

<text align="right">

##### <i><span style="color: #2F60F7">**Please note that Magic Beans **does not** require, encourage or even allow a user to spend real money. Any actual cryptocurrency purchases must be made on qualifying exchanges which follow national and international regulations and adhere to KYC standards. The developer behind the app is not now nor will he ever be a qualified financial planner, accountant, CPA, astronaut, cowboy or ninja.</i>

<text align="left">

---
<img src="./README-visuals/mb-original-wireframe.jpeg" style="float: left; margin-right: 5px"> 

##### <i>(this image represents the detailed, original, conceptual application flowchart. Several days were spent meticulously peeling back layers of API data and planning data paths as well as designing routes. The final product featured the majority of stretch functionality and implemented a few extra features to boot)</i>


---

<br />
<!-- 

<img src="./README-visuals/mb-gif-1.gif" style="margin: 20px"/>
 -->



<img align="right" src="./README-visuals/mb-use-2.gif" height="600px" style="margin: 20px"/>




# Prerequisites

---

### 🍩  Internet browser (e.g. Chrome, Firefox, Safari)<br />
### 🍩  Node.js<br />
### 🍩  PostgreSQL<br />
<br />
</font>



# Installation
---
- Create a database using the provided .sql file (title the DB <b>`magic_beans`</b>)
- Run the queries in the included `database.sql` file
- Run `npm install` from the project root directory
- Run `npm run server` to run the node server
- In a separate terminal tab, run `npm run client` to launch the React app
<br />
<br />



# Application Use
---

- In order to proceed to the app content, you will need to <sub><img src="./README-visuals/agreeButton.png" alt="agree button" style="width:55px;"></sub> to the `disclaimer` landing page.
- `Create an account` or `login` with your username and password to advance.
- If you see a  <sub><img src="./README-visuals/bitcoinLogoSpinning.gif" alt="agree button" style="width:20px;"></sub> logo, this means that the real-time market data - as well as your stored portfolio and position information - is loading/calculating. Depending on the status of the market, this could take a few seconds (you can view `CoinGecko's API` status [HERE](https://status.coingecko.com/)).
- At any time, tap the <sub><img src="./README-visuals/icons8-hamburger-58.png" alt="hamburger menu" style="width:21px;"></sub> menu to open a drawer of navigation options. 
- This `actual hamburger menu` features a <sub><img src="./README-visuals/aboutButton.png" alt="previous button" style="width:24px;"></sub> which will navigate to the `about page`. This page features some developer acknowledgments and links (also found at the bottom of this README).
- If you have not added any crypto holdings yet, you'll be greeted by an empty `positions table`. You can scroll down to browse the top 250 cryptocurrencies (ordered descending by market capitalization) at that particular time. Tapping on any `row` will bring you to a `details page` with a wealth of current market data as well as a 24-hour price chart. The line will be <font color="red"><b>red</b></font> if the price is lower than it was 24 hours prior and <font color="green"><b>green</b></font> if it's higher.
- On this `details page`, you can enter any amount of that particular cryptocurrency that you'd like to add to <sub><img src="./README-visuals/addButton.png" alt="next button" style="width:34px;"></sub> to `your portfolio`. The following dialogue will allow you to <sub><img src="./README-visuals/confirmButton.png" alt="next button" style="width:52px"></sub> or <sub><img src="./README-visuals/cancelButton.png" alt="next button" style="width:52px"></sub> (don't sweat it too much - you can always change this later).
- If you do <sub><img src="./README-visuals/confirmButton.png" alt="next button" style="width:52px"></sub> the addition of an asset holding, you'll see a friendly `success` dialogue that indicates that you now own a little more of the future of global currency! It even crunches the numbers for you 😃
- From this page, you can always press the <sub><img src="./README-visuals/searchButton.png" alt="next button" style="width:31px"></sub> button to navigate to the `search page` or the <sub><img src="./README-visuals/homeButton.png" alt="next button" style="width:31px"></sub> button to navigate back to the `home page` where you can see your current portfolio and market data.
- On the `search page`, you can enter any coin by `name`, `ticker` or by a `single letter`. The single letter option will return every currency in the current top 250 that BEGINS WITH THAT LETTER. Pressing the <sub><img src="./README-visuals/searchGreenButton.png" alt="previous button" style="width:55px;"></sub> button will launch the search. Please note that it is possible to return multiple results and continuing to search will stack results on the page. 
- At any time, once results are populated, you can click the <sub><img src="./README-visuals/detailsButton.png" alt="details button" style="width:45px;"></sub> button to navigate to the `coin details page`.
- Alternatively, you can clear the entire search queue by pressing the <sub><img src="./README-visuals/clearButton.png" alt="clear button" style="width:35px;"></sub> button.



- From the `home page`, you can `remove` a position by tapping the <sub><img src="./README-visuals/deleteButton.png" alt="delete menu" style="width:20px;"></sub> button.
- You can also `modify` a position by tapping the <sub><img src="./README-visuals/modifyButton.png" alt="confirm button" style="width:20px"></sub> button. This will bring to a page that allows you to enter a new position amount entirely if you made a mistake, would like to add more or would like to remove some, but not all, from your position.
<br />



- At any time, inside the <sub><img src="./README-visuals/icons8-hamburger-58.png" alt="hamburger menu" style="width:22px;"></sub> menu, you can tap the <sub><img src="./README-visuals/logoutButton.png" alt="logout button" style="width:22px;"></sub> button to `sign out`. 

<img align="left" src="./README-visuals/mb-use-3.gif" height="600px" style="margin: 20px" />

# Built with
---
[Visual Studio Code](https://code.visualstudio.com/) <br />
[Pixelmator Pro](https://www.pixelmator.com/pro/) <br />
[Material UI](https://mui.com/) <br />
[Moment.js](https://momentj) <br />
[date-fns](https://date-fns.org/) <br />
[react-chartjs-2](https://www.chartjs.org/) <br />
[Gifox](https://gifox.io/) <br />
[CoinGecko API](https://www.coingecko.com/en/api) <br />
[Font Awesome](https://fontawesome.com/) <br />
[Google Fonts](https://fonts.google.com/) <br />
[Lucid Chart](https://www.lucidchart.com/) <br />
[Postico](https://eggerapps.at/postico/) <br />




# Acknowledgement
---
I'd like to extend my sincere thanks to my instructors and everyone at [Prime Digital Academy](www.primeacademy.io) - especially [Chris Black](https://github.com/blackcj) and the Proth cohort - for giving me the tools to do amazing things with amazing technology. Thanks also to my little family, especially  After years of juggling upwards of 40 cryptocurrency applications and thinking of all the fun stuff I'd love to do if I ever made my own, bringing this to life was a truly amazing experience. I absolutely cannot wait to do more. 
<br />

# Support
---
If you have any questions - or would like to leave feedback - please do not hesitate to email me at: [cmochinski@gmail.com](mailto:cmochinski@gmail.com) or visit me via one of the links below. I'd love to hear from you!

## Thanks for looking 😃

---
<br />

<img align="left" src="./README-visuals/readme-signature-pic.png" alt="mo" style="width:150px; margin: 10px">


_[My Website](https://chrismochinski.com)_ <br />
_[My LinkedIn](https://www.linkedin.com/in/chrismochinski/)_ <br />
_[My Twitter (@HolyMosesMusic)](https://twitter.com/holymosesmusic)_ <br />
_[My GitHub](https://github.com/chrismochinski)_ <br />

