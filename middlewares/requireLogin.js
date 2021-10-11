module.exports = (req, res, next) => { 
    //making sure the user is logged in:
    if (!req.user) {
        return res.status(401).send({ error: 'You must login first' }) //unauthorized/forbidden
    }
    next(); //next is a function we call when the request is complete and passes it on the next middleware in the chain or to the route handler
}