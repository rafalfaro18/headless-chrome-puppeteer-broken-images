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

    await page.goto(url, {waitUntil: 'networkidle2'});
    const images_links = await page.$$eval('img', image => image.filter(image => image.naturalWidth == 0 || image.readyState == 'uninitialized').map(img => img.src));
    if (images_links) {
      await page.screenshot({path: `page-${index}.png`, fullPage: true });
      images_links.forEach((image) => {
        console.log(image);
        fs.appendFile('broken_images.txt', image+'\n', function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      });
    }
    await browser.close();
  }
  catch (e){
    console.error(e);
  }
}

(async() => {
  fs.writeFile('broken_images.txt', '', function (err) {
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
