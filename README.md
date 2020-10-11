
*Otaku-rescue:* Web automation using node.js and puppeteer.

*Aim:* 
      Otaku is a manga fan. He searches the web everyday to check if new chapters of Boruto are released or not. But this is a tiresome process as he has to open the website every day and search for Boruto’s newly released chapters. 
      What I want to do is write a web scraper code which scrapes the Manga reader website and notify otaku through email if new chapters are released.
      
Libraries used: 
      Puppeteer, cheerio, nodemailer, cronJob, dotenv
      
*Description:*
      The app runs daily at 11pm every night and scrapes Mangareader site and checks if the release date of newly released chapter si equal to current date. If yes then it sends a mail saying that new chapter is released.


