const path = require('path');
const puppeteer = require('puppeteer');

// See https://github.com/GoogleChrome/puppeteer/issues/800#issuecomment-330012850
var doScreenshot = (page, options) => {
  return new Promise(resolve => {
    setTimeout(() => {
      page.screenshot(options).then(data => {
        resolve(data)
      })
    }, 200); // wait 200ms between every clip
  })
}

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, 'index.html')}`);

  await doScreenshot(page, {
    path: 'cover.png',
    clip: {
      x: 0,
      y: 0,
      width: 828,
      height: 315
    }
  });

  await browser.close();
})();
