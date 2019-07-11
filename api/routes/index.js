let poRoute = require('./po_routes')
let init = (router) => {
    poRoute.init(router);
};

module.exports.init = init;