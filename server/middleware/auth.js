const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) {
        console.log("[JWT Auth] No token in header")
        return res.status(401).send("Access Denied")
    }

    try {
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log("[JWT Auth] Invalid Token")
                return res.status(401).json({ msg: 'Token is invalid'})
            } else {
                req.user = decoded
                next()
            }
        })
    } catch (err) {
        console.error("Something went wrong with auth middleware")
        res.status(500).json({ msg: "Server Error" })
    }
}