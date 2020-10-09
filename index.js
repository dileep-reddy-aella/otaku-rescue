//Grabbing items from library
const request = require("request-promise-native");
const cheerio = require("cheerio");
//Creating a file to save csv file
const fs = require("fs");
//creating a csv file
const json2csv = require("json2csv").Parser;

const animeLink = "https://www.mangareader.net/boruto-naruto-next-generations";

(async () => {
  const response = await request({
    uri: animeLink,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
    },
    gzip: true,
  });

  let $ = cheerio.load(response);
  let latestChap = $("ul[class='d44'] > li:first-of-type > a").text();

  console.log(latestChap.slice(-2));
  //   const j2cp = new json2csv();
  //   const csv = j2cp.parse(latestChap(-2));
  //   fs.writeFileSync("./new.csv", csv, "utf-8");
})();
