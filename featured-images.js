require('dotenv').config()
const puppeteer = require('puppeteer');
var fs = require('fs');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function getImages(url , index=0){
  let username = process.env.HT_USER;
  let password = process.env.HT_PASS;
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  try {
    if (username && password) {
      await page.authenticate({username, password});
    }

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 0
    });
    let images_links = await page.$$eval('.grop-post_image img', image => image);
    if (images_links.length == 0) {
      await page.screenshot({path: `page-${index}.png`, fullPage: true });
      console.log(url);
      fs.appendFile('missing_featured_images.txt', url+'\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
    await browser.close();
  }
  catch (e){
    console.error(e);
  }
}

(async() => {
  fs.writeFile('missing_featured_images.txt', '', function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });

  const same_site_links = process.env.SAME_SITE_LINKS.split(',');
  try {

  await asyncForEach(same_site_links, async (link, index) => {
    try {
      await getImages(link, index);
    }
    catch (e){
      console.error(e);
    }
  });
  }
  catch (e){
    console.error(e);
  }
})();
