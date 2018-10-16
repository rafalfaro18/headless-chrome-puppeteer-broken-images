require('dotenv').config()
const puppeteer = require('puppeteer');
var fs = require('fs');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function getImages(url , index=0, browser){
  let username = process.env.HT_USER;
  let password = process.env.HT_PASS;
  let page = await browser.newPage();
  // let old_url = process.env.OLD_DOMAIN.replace(/\/$/, '') + '/' +url;
  let new_url = process.env.NEW_DOMAIN.replace(/\/$/, '') + '/' +url;
  try {
    if (username && password) {
      await page.authenticate({username, password});
    }

    await page.goto(new_url, {
      waitUntil: 'networkidle2',
      timeout: 0
    });
    console.log(`checking ${new_url}`);
    let images_links = await page.$$eval('body.error404', image => image);
    if (images_links.length > 0) {
      // await page.screenshot({path: `page-${index}.png`, fullPage: true });
      console.log(new_url);

      fs.appendFile('broken-links.txt', new_url+'\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
    // await browser.close();
  }
  catch (e){
    console.error(e);
  }
}

(async() => {
  fs.writeFile('broken-links.txt', '', function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });

  const same_site_links = process.env.SAME_SITE_LINKS.split(',');
  try {

  await asyncForEach(same_site_links, async (link, index) => {
    try {
      let browser = await puppeteer.launch();
      await getImages(link, index, browser);
      await browser.close();
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
