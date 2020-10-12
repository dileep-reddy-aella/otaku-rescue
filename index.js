const puppeteer = require("puppeteer");
const $ = require("cheerio");
const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");
require("dotenv").config();

// This code gets us today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

// console.log(today);

var relDate = "";

// You can replace this url with the website you wish to scrape
const url = "https://www.mangareader.net/boruto-naruto-next-generations";

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
  $(
    "table[class='d48'] > tbody > tr:last-of-type > td:last-of-type",
    html
  ).each(function () {
    relDate = $(this).text();
  });

  $("ul[class='d44'] > li:first-of-type > a", html).each(function () {
    let chap = $(this).text();
    // console.log(currentChap);

    if (relDate === today) {
      //   console.log("New chap");
      sendMail();
    } else {
      console.log("no new chap");
      console.log(relDate);
      console.log(today);
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
      "Open the link to go to site: https://www.mangareader.net/boruto-naruto-next-generations",
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

// async function monitor() {
//   let page = await configureBrowser();
//   await checkChapter(page);
// }

// monitor();
