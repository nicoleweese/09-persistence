'use string';

const parseURL = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parseURL(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};