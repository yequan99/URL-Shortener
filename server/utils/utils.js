const shortid = require('shortid')
const validUrl = require('valid-url')

function ValidateURL(longurl) {
    if (!longurl.startsWith("http://") || !longurl.startsWith("https://")) {
        longurl = "https://" + longurl
    }
    return (validUrl.isUri(longurl))
}

function GenUniqueUrlCode(UserInfo) {
    let urlCode = shortid.generate()

    let urlCodeArr = []
    UserInfo.map((item) => {
        urlCodeArr.push(item.urlcode)
    })
    // Regenerate urlCode if other users are already using
    while (urlCodeArr.includes(urlCode)) {
        urlCode = shortid.generate()
    }
    return urlCode
}

module.exports = {
    ValidateURL,
    GenUniqueUrlCode
}