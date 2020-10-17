import { Mongo } from 'meteor/mongo';

export const ShopItems = new Mongo.Collection('shopitems');

if (Meteor.isServer) {
  const opts = {
    sort: {
      createdAt: -1
    },
    limit: 50
  };

  Meteor.publish('items', (types, query) => {
    let lookup = {
      type: { $in: types }
    };
    if (query) {
      if (query.substr(0, 2) == 'p:') {
        lookup['player'] = {
          $regex: query.substr(2) + '.*',
          $options: 'i'
        };
      } else if (query.substr(0, 1) == '"') {
        lookup['item.text'] = query.substr(1, query.length-2);
      } else {
        lookup['item.text'] = {
          $regex: query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(/ /g, '.*'),
          $options: 'i'
        }
      }
    }
    return ShopItems.find(lookup, opts);
  });
}