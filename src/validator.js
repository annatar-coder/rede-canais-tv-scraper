module.exports = (channels) => {
  if (!channels) {
    console.info('using default channels')
    return
  }
  if (!Array.isArray(channels)) {
    throw new Error('channels must be array')
  }
  if (channels.length <= 0) {
    throw new Error('must contain at least one channel')
  }
}
