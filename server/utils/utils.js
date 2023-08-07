const shortid = require('shortid')

function ValidateURL(longurl) {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

    return urlPattern.test(longurl)
}

function GenUniqueUrlCode(urlArray, urlCode) {
    // Regenerate urlCode if other users are already using
    while (urlArray.includes(urlCode)) {
        urlCode = shortid.generate()
    }
    return urlCode
}

module.exports = {
    ValidateURL,
    GenUniqueUrlCode
}