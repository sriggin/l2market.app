import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { ShopItems } from'/imports/api/shopitems.js';

DDPRateLimiter.addRule({
  type: 'subscription',
  name: 'items',
}, 5, 1000);


Meteor.startup(() => {
  // ShopItems.remove({});
  ShopItems.rawCollection().createIndex({ 'createdAt': 1 });
  ShopItems.rawCollection().createIndex({ 'item.text': 'text' });
  ShopItems.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });

  // TODO: Add a route for item updates and create a script that calls it
  // ShopItems.find({ 'item.id': { $in: [22223, 22224] }}).forEach(function(e, i){
  //   ShopItems.update(e._id, { $set: { 'item.text': e.item.text.replace('Solid', 'Stable') } });
  // });

  // ShopItems.find({ 'item.id': { $in: [71078, 71079, 71080, 71081, 71082, 71083, 71084, 71085, 71086, 71087, 71088, 71089, 71090, 71091, 71092, 71093, 71094, 710950] }}).forEach(function(e, i){
  //   let text = e.item.text;
  //   text = text.replace('Power', 'Authority');
  //   text = text.replace('Bright', 'Radiant');
  //   ShopItems.update(e._id, { $set: { 'item.text': text } });
  // });

  // ShopItems.find({ 'item.id': { $in: [49783] }}).forEach(function(e, i){
  //   ShopItems.update(e._id, { $set: { 'item.text': e.item.text.replace('Sibi', 'Oriana') } });
  // });
});