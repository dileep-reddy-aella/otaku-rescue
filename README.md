**Otaku rescue:** Web automation using node.js and puppeteer.

**Aim:** Otaku is a manga fan. He searches the web everyday to check if new chapters of Boruto are released or not. But this is a tiresome process as he has to open the website every day and search for Boruto’s newly released chapters. What I want to do is write a web scraper code which scrapes the Manga reader website and notify otaku through email if new chapters are released.

**Dependencies used:** Puppeteer, cheerio, nodemailer, cronJob, dotenv
Description: The app runs daily at 11pm every night and scrapes Mangareader site and checks if the release date of the newly released chapter is equal to the current date. If yes then it sends a mail saying that a new chapter is released.
 
**How to run it ?**
* First install the dependencies using the command “pip install”. This will install all the required dependencies present in *package.json file*.
* Next create a .env file in which you need to store the info regarding the from and to mail address and password as shown in image below. 
* Add the details accordingly without any inverted commas.
 

