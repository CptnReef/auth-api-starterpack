const router = require('express').Router()
const User = require("../models/user");
const jwt = require('jsonwebtoken');

module.exports = (app) => {
   // TODO: Implement authentication controller.
   router.post('/register', (req,res) => {
      res.send('Register')
   });
   
  }
