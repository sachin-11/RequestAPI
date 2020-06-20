const express = require('express')
const router = new express.Router()
const Request = require('../models/Request');
const Client = require('../models/Client');
 
router.get( '/', (req, res) => {
  
  // Add Request to MongoDB
  const  firstRequest = new Request({
       firstName: 'Sachin',
       lastName: 'Singh',
       description: "this is first request"
      
      });
  
  const  secoundRequest = new Request({
    firstName: 'Rahul',
    lastName: 'Singh',
    description: "this is secound request"
  });
  
  firstRequest.save(function (err){
   if(err) return console.error(err.stack)
   console.log("FirstRequest is added")
  });
  
  secoundRequest.save(function(err){
    if(err) return console.error(err.stack);
    console.log("Secound Request is added")
  })
  
  // Add Client to MongoDB
  var secoundClient = new Client({
    code: 'first client',
    description: 'this is first client'
  });
  secoundClient.requests.push(firstRequest._id, secoundRequest._id);
  
  var firstClient = new Client({
    code: 'secound client',
    description: 'this is secound client'
  })
  firstClient.requests.push(secoundRequest._id)
  
  firstClient.save(function(err){
    if(err) return console.log(err.stack);
    console.log("firstClient is added")
  });
  
  secoundClient.save(function(err){
    if(err) return console.log(err.stack);
    console.log("secoundClient is added");
  });
  
  // Return Message
  res.send("Done Initial Data!");
});


module.exports = router;
