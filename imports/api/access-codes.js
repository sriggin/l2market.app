import { Mongo } from 'meteor/mongo';

export const AccessCodes = new Mongo.Collection('access_codes');

/**
 * {
 *   id: _...,
 *   code: "str",
 *   expiresAt: Date
 * }
 */

if (Meteor.isServer) {
  Meteor.publish('access-codes', () => {
    return AccessCodes.find({
      expiresAt: {
        $gte : new Date()
      }
    });
  });
}