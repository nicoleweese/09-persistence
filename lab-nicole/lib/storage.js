'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const path = require('path');

module.exports = exports = {};

exports.addDoggo = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));
  let filePath = path.join(`${__dirname}`, '..', 'data', `${schemaName}`, `${item.id}.json`);
  console.log('write file path', filePath);
  let json = JSON.stringify(item);
  console.log('stringified doggo', json);
  return fs.writeFileProm(filePath, json)
    .then( () => item)
    .catch( err => Promise.reject(err));
};

exports.fetchDoggo = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));
  let filePath = path.join(`${__dirname}`, '..', 'data', `${schemaName}`, `${id}.json`);
  return fs.readFileProm(filePath)
    .then( data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch( err => Promise.reject(err));
};

exports.adoptDoggo = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));
  let filePath = path.join(`${__dirname}`, '..', 'data', `${schemaName}`, `${id}.json`);
  console.log('delete file path', filePath);
  return fs.unlinkProm(filePath);
};