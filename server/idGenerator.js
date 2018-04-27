const idChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const idLength = 8

/**
 * Random ID Generator
 * @returns {string} an 8-character ID
 */

const generateId = () => {
  let randomId = ''
  for (let i = 0; i < idLength; i++) {
    randomId += idChars.charAt(Math.floor(Math.random() * idChars.length))
  }
  return randomId
}

module.exports = {generateId}
