if (process.env.NODE_ENV === 'production') { // NODE_ENV is set by heroku
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}
