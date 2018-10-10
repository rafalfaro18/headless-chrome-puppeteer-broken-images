require('dotenv').config()
const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
  await page.authenticate({username:process.env.HT_USER, password:process.env.HT_PASS});
  await page.goto(process.env.SITE_URL, {waitUntil: 'networkidle2'});
  await page.screenshot({path: 'page.png', fullPage: true });
  await browser.close();
  }
  catch (e){
    console.error(e);
  }
})();
