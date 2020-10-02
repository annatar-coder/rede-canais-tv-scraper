const scraper = require('./scraper')
const validator = require('./validator')
const { defaultChannels } = require('./helpers')

/**
 *
 * @param {Array} channels receive a array containing channel names
 */
async function scrape (channels) {
  try {
    validator(channels)
  } catch (error) {
    return error
  }

  channels = channels || defaultChannels

  const results = { channels: [], errors: [] }

  for (var chanel of channels) {
    try {
      console.info('-------------------------')
      console.info(`iniciando canal ${chanel}`)
      const result = await scraper(chanel)
      results.channels.push(result)
      console.info(`canal ${chanel} finalizado`)
    } catch (error) {
      console.info(`erro no canal ${chanel}`)
      console.info('-----------------------')
      results.errors.push(error.message)
    }
  }

  return results
}

module.exports = scrape
