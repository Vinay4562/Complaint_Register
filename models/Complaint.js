const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    complaint: { type: String, required: true },
    complaintType: { type: String, enum: ['Electrical', 'System'], default: 'none' },
    attemptedBy: { type: String },
    attemptedDate: { type: Date },
    remarks: { type: String }
});

module.exports = mongoose.model('Complaint', complaintSchema);
