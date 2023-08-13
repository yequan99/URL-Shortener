const shortid = require('shortid')

function ValidateURL(longurl) {
    const urlPattern = /^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,4}(\.[a-z]{2})?\/?.*$/i

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