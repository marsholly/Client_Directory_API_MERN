const express = require('express');

const router = new express.Router();

const Sth = require('../models/sth');

router.route('/')
  .get((req, res) => {
    Sth.getAll()
   .then(sths => {
      res.send(sths);
   })
   .catch(err=>{
      res.status(400).send(err);
   })
 })

module.exports = router;
