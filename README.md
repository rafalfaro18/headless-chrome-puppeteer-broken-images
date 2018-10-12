# headless-chrome-puppeteer-broken-images
Get Broken images and screenshot of page with broken images from a list of page urls. You can still use chrome wile this runs because it uses a headless version of chromium, so you don't need to worry about blocking chrome usage while it runs.

## Instructions

1. npm install.
2. create an .env file with content like [this](env.example)
3. SAME_SITE_LINKS is a comma separated list of urls to test
4. (HT_USER and HT_PASS are optional, use only if your site is password protected).
5. npm start
6. Results are stored in broken_images.txt and multiple screenshots called page-#.png

## Instructions (Broken Links - Check if some links also exist in another domain. For example after migrating wordpress posts to another wordpress site)
1. npm install.
2. create an .env file with content like [this](env.example)
3. SAME_SITE_LINKS is a comma separated list of urls from the original domain (without the domain or starting slash)
4. (HT_USER and HT_PASS are optional, use only if your site is password protected).
5. (NEW_DOMAIN is required and is the new domain to check if those urls exist)
6. npm run broken-links
7. Results are stored in broken-links.txt

## Instruction (Featured Image)
1. npm install.
2. create an .env file with content like [this](env.example)
3. SAME_SITE_LINKS is a comma separated list of urls to test
4. (HT_USER and HT_PASS are optional, use only if your site is password protected).
5. It looks for an img tag inside an element with a class 'grop-post_image'. You might want to change this.
6. npm run featured-image
7. Results are stored in missing_featured_images.txt and multiple screenshots called page-#.png

### Notes

- .txt files are overwritten on each run.
- .png files are NOT overwritten pn each run. (For a clean run remove all png files)

### To Do
* Code Refactoring
