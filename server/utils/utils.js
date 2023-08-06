const shortid = require('shortid')
const validUrl = require('valid-url')

function ValidateURL(longurl) {
    if (!longurl.startsWith("http://") || !longurl.startsWith("https://")) {
        longurl = "https://" + longurl
    }
    return (validUrl.isUri(longurl))
}

function GenUniqueUrlCode(urlArray) {
    let urlCode = shortid.generate()

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