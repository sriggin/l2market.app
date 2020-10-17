import { Mongo } from 'meteor/mongo';

export const Donations = new Mongo.Collection('donations');

/**
 * {
 *   id: _...,
 *   name: "str",
 *   amount: 1.00,
 *   createdAt: Date,
 * }
 */

if (Meteor.isServer) {
  Meteor.publish('donations-monthly', () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    return Donations.find({
      createdAt: {
        $gte: firstDay
      }
    });
  });

  Meteor.publish('donations', () => {
    return Donations.find();
  });
}