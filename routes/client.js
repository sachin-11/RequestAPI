const express = require('express')
const Client = require('../models/Client');
const Request = require('../models/Request')
const router = new express.Router()

 
 
router.get('/', async (req, res) => {
      try {
          const client = await Client.find().populate({
              path: 'requests',
              select: 'firstName'
          });
          res.status(200).json({ success: true, data: client})
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false , message: 'Server Error'})  
      }
});


router.get( '/:id'  , async (req, res) => {
    const client = await Client.findById(req.params.id).populate({
      path: 'requests',
      select: 'firstName lastName',
    });
  
    if (!client) {
      return next(new ErrorResponse(`No article with id ${req.params.id}`), 404);
    }
  
    res.status(200).json({ success: true,  data: client });
  });


module.exports = router;
