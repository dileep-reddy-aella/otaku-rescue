const puppeteer = require("puppeteer");
const $ = require("cheerio");
const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");
require("dotenv").config();

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

// console.log(today);

var relDate = "";

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

async function startTracking() {
  const page = await configureBrowser();

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

async function sendMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      //user: process.env.EMAIL,
      //pass: process.env.PASSWORD,
      //Use these if you want to hide you email and password using a .env file
      //if you don't want it you can just add your mail and password below directly as shown in next lines
      user: 'yourmail@gmail.com',
      pass: 'your_password',
    },
  });

  let mailOptions = {
    from: "tstdileep@gmail.com",
    to: "saidileepreddyaella@gmail.com",
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
