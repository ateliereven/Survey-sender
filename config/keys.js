// to figure out which set of credentials to return:
if (process.env.NODE_ENV === 'production') { // NODE_ENV is set by heroku
    // we are in droduction - return prod set of keys
    module.exports = require('./prod') // imports and exports prod
} else {
    // we are in development - return dev set of keys
    module.exports = require('./dev') // imports and exports dev
}
