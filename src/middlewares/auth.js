const jwt = require('jsonwebtoken')

const authentication = function (req, res, next) {
    try {
        const token = req.headers.token
        if (!token)
            return res.status(401).send({
                status: false,
                message: "Token Headers is missing"
            })
        jwt.verify(token, 'secretKey', (err) => {
            if (err)
                return res.status(403).send({
                    status: false,
                    message: "Please login"
            })
            
        })
        next()
    }
    catch {
        return res.status(500).send({
            status: false,
            message: "Server Side Error"
        })
    }
}

module.exports = { authentication }