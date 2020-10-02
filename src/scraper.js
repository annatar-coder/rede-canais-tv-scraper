const puppeteer = require('puppeteer-firefox')

async function scraper (channel) {
  return new Promise((resolve, reject) => {
    (async () => {
      const browser = await puppeteer.launch({ headless: true, timeout: 0, devtools: false })
      const page = await browser.newPage()

      await page.goto(`https://redecanaistv.com/player3/canais.php?canal=${channel}`, {
        waitUntil: 'domcontentloaded'
      })

      page.click('h2 > a')
      await page.waitForNavigation({ timeout: 0 })

      page.click('body')
      await page.waitForNavigation({ timeout: 0 })

      page.click('body')
      await page.waitForNavigation({ timeout: 0 })

      await page.setRequestInterception(true)

      page.on('request', async request => {
        if (request.url().startsWith('https://streaming.belugacdn.link')) {
          await request.abort()
          resolve(request.url())
          await page.close()
          await browser.close()
        } else {
          request.continue()
        }
      })

      await page.waitFor(15000)

      reject(Error(`erro no canal ${channel}`))
    })()
  })
}

module.exports = scraper
