
const express = require('express');
const router = express.Router();
const { addFeeRecord, getFeeRecords, updateFeeRecord, resetFees, deleteFeeRecord } = require('../controllers/feeController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addFeeRecord);
router.get('/', auth, getFeeRecords);
router.put('/:id', auth, updateFeeRecord);
router.post('/reset', auth, resetFees);
router.delete('/:id', auth, deleteFeeRecord); // Ensure this line exists

module.exports = router;