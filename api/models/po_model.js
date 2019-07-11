const mongoose = require('mongoose');
const Schema = mongoose.Schema;
PO_Schema = Schema({
    po_id: { type: mongoose.Schema.Types.ObjectId, ref: 'po_id' },
    supplier_id: { type: String },
    supplier_name: { type: String },
    item_name: { type: String },
    item_qty: { type: Number },
    status: { type: String },
    created_date: { type: Date, default: new Date() },
});

const PO = mongoose.model('PO', PO_Schema);
module.exports = PO;