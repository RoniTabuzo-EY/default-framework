const mongoDao = require('../dao/mongo')
const constant = require('../common/constant.json');

/**
 * Method used to create PO
 * @param {*Object} poObject 
 * @returns {*Object} dn response
 */
let createPO = async (poObject) => {
    try {
        let response = await mongoDao.saveData(constant.MODEL_TYPES.PO, poObject);

        return Promise.resolve(response);
    } catch (e) {
        return Promise.reject(e)
    }
}

module.exports = {
    createPO
}