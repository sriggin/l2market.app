import { Template } from 'meteor/templating';

import { Donations } from '/imports/api/donations.js';

let donors = new ReactiveVar();

Template.donate.onCreated(function(){
  Meteor.subscribe('donations', {
    onReady() {
      donors.set(Donations.find({}, { sort: { createdAt: -1 }}));
    }
  });
});

Template.donate.helpers({
  donors() {
    let res = donors.get();
    return res && res.count() ? res : false;
  },
});

Template.donate.events({
  'submit #donate'(event, instance){
    event.preventDefault();
    gtag('event', 'click', {
      'event_category': 'button',
      'event_label': 'donate',
      'event_callback': function(){
        event.target.submit();
      }
    });
  },
});