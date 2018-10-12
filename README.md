# headless-chrome-puppeteer-broken-images
Get Broken images and screenshot of page with broken images from a list of page urls

## Instructions

1. npm install.
2. create an .env file with content like [this](env.example)
3. SAME_SITE_LINKS is a comma separated list of urls to test
4. (HT_USER and HT_PASS are optional, use only if your site is password protected).
5. npm start

## Instructions (Broken Links)
1. npm install.
2. create an .env file with content like [this](env.example)
3. SAME_SITE_LINKS is a comma separated list of urls from the original domain (without the domain or starting slash)
4. (HT_USER and HT_PASS are optional, use only if your site is password protected).
5. (NEW_DOMAIN is required and is the new domain to check if those urls exist)
6. npm run broken-links

## Instruction (Featured Image)
1. npm install.
2. create an .env file with content like [this](env.example)
3. SAME_SITE_LINKS is a comma separated list of urls to test
4. (HT_USER and HT_PASS are optional, use only if your site is password protected).
5. npm run featured-image

### To Do
* Code Refactoring
