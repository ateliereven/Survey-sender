const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
    const token = req.headers.cookie.split(" ")[2].split("=")[1];
    if (req.user) {
        return next();
    } else if (token){
        try {
            const decodedData = jwt.verify(token, keys.jwtKey);
            req.userId = decodedData?.id;
            // check userId login issue... to be fixed!!!
            return next();
        } catch {
            res.status(401).send({ error: 'Invalid token' })
        }
    } else {
        return res.status(401).send({ error: 'You must login first' })
    }
}