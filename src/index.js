const puppeteer = require('puppeteer-firefox')

const scraper = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('https://redecanaistv.com/player3/canais.php?canal=discovery&img=discovery', {
    waitUntil: 'domcontentloaded',
    timeout: 0
  })

  page.click('h2 > a')
  await page.waitForNavigation()

  return 'ok'
}

scraper()
  .then((value) => {
    console.log(value)
  })
  .catch((error) => {
    console.log(error)
  })
