const puppeteer = require("puppeteer");
const $ = require("cheerio");
const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");
require("dotenv").config();

var prevChap = "168";
var message = "";

// You can replace this url with the website you wish to scrape
const url =
  "https://anilist.co/anime/97938/Boruto-Naruto-Next-Generations/watch";

async function configureBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function checkChapter(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  //console.log(html);

  // If you change the url then you also need to change the path
  // to the element you want to find
  $("a[class='episode']:first-of-type > div", html).each(function () {
    let currentChap = $(this).text().slice(8, 11);
    console.log(currentChap);

    if (Number(currentChap) > Number(prevChap)) {
      console.log("New chap");
      sendMail();
      prevChap = currentChap;
      console.log(prevChap);
      message = $(this).text();
    } else {
      console.log("no new chap");
      console.log(currentChap);
      console.log(prevChap);
    }
  });
}

//This code make the program run everyday at 11pm
async function startTracking() {
  const page = await configureBrowser();

  // "0 23 * * *" refers to 11pm every day
  let job = new CronJob(
    "0 23 * * *",
    function () {
      checkChapter(page);
    },
    null,
    true,
    null,
    null,
    true
  );
  job.start();
}

//If you want to use another mail service other than gmail
// then make changes as you like in accordance with .env file
async function sendMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.TO,
    subject: "Boruto-New Chapter",
    text:
      message +
      "Open the link to go to site: https://anilist.co/anime/97938/Boruto-Naruto-Next-Generations/watch",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent");
    }
  });
}

startTracking();
