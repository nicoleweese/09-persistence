'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Doggo = require('../model/doggo.js');

module.exports = function(router) {
  router.get('/api/doggo', function(req, res) {
    if(req.url.query.id) {
      storage.fetchDoggo('doggo', req.url.query.id)
        .then( doggo => {
          response.sendJSON(res, 200, doggo);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'route not found');
        });
      return;
    }
  
    response.sendText(res, 400, 'bad request');
  });
  
  router.delete('/api/doggo', function(req, res) {
    storage.adoptDoggo('doggo', req.url.query.id);
    response.sendText(res, 204, '');
  });
  
  router.post('/api/doggo', function(req, res) {
    try {
      var doggo = new Doggo(req.body.name, req.body.breed, req.body.favActivity);
      storage.addDoggo('doggo', doggo);
      response.sendJSON(res, 200, doggo);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};