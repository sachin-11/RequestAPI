const express = require('express')
const Request = require('../models/Request');
const router = new express.Router()


// Get All Students
router.get('/', async (req, res) => {
     try {
       const request = await Request.find().populate('clients')
        res.status(200).json({ success: true, data: request})
     } catch (error) {
       console.error(error.message);
       res.status(500).json({ success: false, message: 'Server Error'})
     }  

});
 





module.exports = router