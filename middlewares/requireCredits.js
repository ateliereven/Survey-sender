module.exports = (req, res, next) => {
    //making sure the user has credits:
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits' }) //forbidden
     } 
    next(); //next is a function we call when the request is complete and passes it on the next middleware in the chain or to the route handler
}