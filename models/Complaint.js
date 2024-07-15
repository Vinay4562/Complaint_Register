// models/Complaint.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: { type: String, required: true },
    complaint: { type: String, required: true }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
