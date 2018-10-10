require('dotenv').config()
const puppeteer = require('puppeteer');
var fs = require('fs');

async function getImages(page, url , index=0){
  await page.goto(url, {waitUntil: 'networkidle2'});
  const images_links = await page.$$eval('img', image => image.filter(image => image.naturalWidth == 0 || image.readyState == 'uninitialized').map(img => img.src));
  if (images_links) {
    images_links.forEach((image) => {
      console.log(image);
      fs.appendFile('broken_images.txt', image+'\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    });
  }
  await page.screenshot({path: `page-${index}.png`, fullPage: true });
}

(async() => {
  fs.writeFile('broken_images.txt', '', function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const username = process.env.HT_USER;
  const password = process.env.HT_PASS;
  const same_site_links = process.env.SAME_SITE_LINKS.split(',');
  try {
  if (username && password) {
    await page.authenticate({username, password});
  }
  await getImages(page, process.env.SITE_URL, 0);
  await browser.close();
  }
  catch (e){
    console.error(e);
  }
})();
