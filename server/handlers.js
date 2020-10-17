import bodyParser from 'body-parser';

import { WebApp } from 'meteor/webapp';

import { ShopItems } from'/imports/api/shopitems.js';
import { AccessCodes } from'/imports/api/access-codes.js';
import { Donations } from'/imports/api/donations.js';

const _callback = (res, error, result, okCode) => {
  if (error) {
    console.log(error);
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Error\n');
  } else if (result) {
    res.writeHead(okCode, { 'Content-Type': 'text/plain' });
    res.end('OK\n');
  }
};

WebApp.connectHandlers.use(bodyParser.json());
WebApp.connectHandlers.use((req, res, next) => {
  // Deny post requests without correct api token
  if (req.method === 'POST' && req.headers['x-api-token'] !== process.env.L2MARKET_API_KEY) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('fu\n');

  // Add donation
  } else if (req.url === '/ctrl/donation/add' && req.method === 'POST') {
    Donations.insert({
      amount: parseFloat(req.body['amount']),
      name: req.body['name'],
      createdAt: new Date(parseInt(req.body['createdAt']) * 1000)
    }, (error, result) => _callback(res, error, result, 201));

  // Add access code
  } else if (req.url === '/ctrl/access/add' && req.method === 'POST') {
    AccessCodes.insert({
      code: req.body['code'],
      expiresAt: new Date(parseInt(req.body['expiresAt']) * 1000)
    }, (error, result) => _callback(res, error, result, 201));

  // Remove access code
  } else if (req.url === '/ctrl/access/remove' && req.method === 'POST') {
    AccessCodes.remove({
      code: req.body['code']
    }, (error, result) => _callback(res, error, result, 204));

  // Refresh access code
  } else if (req.url === '/ctrl/access/refresh' && req.method === 'POST') {
    AccessCodes.update(
      { code: req.body['code'] },
      { expiresAt: new Date(parseInt(req.body['expiresAt']) * 1000) },
      (error, result) => _callback(res, error, resul, 204));

  // Clear items
  } else if (req.url === '/ctrl/clear' && req.method === 'POST') {
    ShopItems.remove({}, (error, result) => _callback(res, error, resul, 204));

  // Add item
  } else if (req.url === '/ctrl/add' && req.method === 'POST') {
    const item = ShopItems.findOne({
      server: req.body['server'],
      player: req.body['player'],
      item: {
        id: parseInt(req.body['item']['id']),
        enchant: parseInt(req.body['item']['enchant'])
      }
    }, { sort: { createdAt: -1 }});

    if (item) {
      const newPrice = parseInt(req.body['item']['price']);
      const oldPrice = item.item.price;
      // Remove latest item stored if price matches
      if (oldPrice == newPrice) {
        console.log('Removing', item._id);
        ShopItems.remove({ _id: item._id });
      }
    }

    console.log('Adding', req.body['timestamp']);
    ShopItems.insert({
      server: req.body['server'],
      location: req.body['location'],
      player: req.body['player'],
      type: parseInt(req.body['type']),
      item: {
        id: parseInt(req.body['item']['id']),
        text: req.body['item']['text'],
        count: parseInt(req.body['item']['count']),
        price: parseInt(req.body['item']['price']),
        enchant: parseInt(req.body['item']['enchant'])
      },
      createdAt: new Date(parseInt(req.body['timestamp']) * 1000)
    }, (error, result) => _callback(res, error, resul, 201));
  } else {
    next();
  }
});