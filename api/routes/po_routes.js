const poService = require('../business_logic/poService');
const Response = require('./response/index');
const logger = require('../config/logger');

let init = (router) => {

    router.route('/createPO')
    .post(async (req, res) => {
        let response;
        try {
            let po = await poService.createPO(req.body);
            response = new Response(200, "PO Created", po, null);
            res.status(response.code).json(response)
        } catch (e) {
            logger.info("Router ==> Failed to create po");
            response = new Response(500, "Error in PO Creation", {}, e);
            res.status(response.code).json(response)
        }
    })

}

module.exports.init = init;