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
    try {
        const { date, type, complaint } = req.body;

        if (!date || !type || !complaint) {
            return res.status(400).send('All fields are required.');
        }

        const newComplaint = new Complaint({
            date,
            type,
            complaint
        });

        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (error) {
        console.error('Error adding complaint:', error);
        res.status(500).send('Server error. Please try again later.');
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
        if (req.body.type != null) {
            complaint.type = req.body.type;
        }
        if (req.body.complaint != null) {
            complaint.complaint = req.body.complaint;
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
