const express = require('express');
const router = new express.Router();

const Client = require('../models/client');

router.route('/')
  .get((req, res) => {
    let dbQuery = Client.find({})
    let { pagesize, page, gender, minage, maxage, visitafter, visitbefore, allergy } = req.query;

    if(gender) {
      dbQuery.where('gender').equals(gender);
    }
    if(minage) {
      dbQuery.where('age').gte(Number(minage));
    }
    if(maxage) {
      dbQuery.where('age').lte(Number(maxage));
    }
    if(visitafter) {
      dbQuery.where('lastVisit').gt(visitafter);
    }
    if(visitbefore) {
      dbQuery.where('lastVisit').lt(visitbefore);
    }
    if(page) {
      if(!pagesize) pagesize = 20;
      if(!page) page = 1;
      dbQuery.skip((Number(page) - 1) * Number(pagesize)).limit(Number(pagesize));
    }
    if(allergy) {
      dbQuery.where('allergies').in([allergy]);
    }

    dbQuery
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err));

  })
  .post((req, res) => {
    Client.create(req.body)
      .then(client => res.send(client))
      .catch(err => res.status(400).send(err));
  });

router.route('/:id')
  .get((req, res) => {
    Client.findById(req.params.id)
      .then(client => res.send(client))
      .catch(err => res.status(400).send(err));
  })
  .put((req, res) => {
    Client.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(Client.find({}))
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err));
  })
  .delete((req, res) => {
    Client.findByIdAndRemove(req.params.id)
      .then(Client.find({}))
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err));
  });

module.exports = router;
