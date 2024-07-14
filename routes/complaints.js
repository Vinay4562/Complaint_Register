const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Get all complaints
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new complaint
router.post('/', async (req, res) => {
    const { date, complaint, complaintType } = req.body;

    if (!date || !complaint || !complaintType) {
        return res.status(400).json({ message: "Date, complaint, and complaintType are required." });
    }

    const newComplaint = new Complaint({
        date,
        complaint,
        complaintType,
        attemptedBy: req.body.attemptedBy || '',
        attemptedDate: req.body.attemptedDate || '',
        remarks: req.body.remarks || ''
    });

    try {
        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a complaint
router.patch('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        if (req.body.date != null) {
            complaint.date = req.body.date;
        }
        if (req.body.complaint != null) {
            complaint.complaint = req.body.complaint;
        }
        if (req.body.complaintType != null) {
            complaint.complaintType = req.body.complaintType;
        }
        if (req.body.attemptedBy != null) {
            complaint.attemptedBy = req.body.attemptedBy;
        }
        if (req.body.attemptedDate != null) {
            complaint.attemptedDate = req.body.attemptedDate;
        }
        if (req.body.remarks != null) {
            complaint.remarks = req.body.remarks;
        }

        const updatedComplaint = await complaint.save();
        res.json(updatedComplaint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a complaint
router.delete('/:id', async (req, res) => {
    try {
        const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);

        if (!deletedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.json({ message: 'Complaint deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
