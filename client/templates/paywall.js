import { Template } from 'meteor/templating';
import { AccessCodes } from '/imports/api/access-codes.js';
import { Donations } from '/imports/api/donations.js';

import './paywall.html';

// TODO: Move to server const store
const DONATION_GOAL = 49;

let donors = new ReactiveVar();
let valueNow = new ReactiveVar(0);

Template.paywall.onCreated(function(){
  Meteor.subscribe('access-codes');
  Meteor.subscribe('donations-monthly', {
    onReady() {
      donors.set(Donations.find({}, { sort: { createdAt: -1 }}));
      valueNow.set(Donations
        .find()
        .map((d) => d.amount)
        .reduce((total, value) => total + value, 0)
        .toFixed(2));
    }
  });
});

Template.paywall.events({
  'submit #access-code-form'(event, instance) {
    event.preventDefault();

    let el = $('#access-code');
    let input = el.val();
    let code = AccessCodes.findOne({ code: input });

    // TODO: Quit job. Leave wife. Leave daughter.
    const msg = 'yes i know it is hardcoded xD it will be like this until i get time... fu!';
    if (code || input == "OHOHOH" || input == "OCT2020") {
      window.localStorage.setItem('access-code', input);
      FlowRouter.go('/');
    } else {
      el.val('INVALID CODE');
    }
  }
});

Template.paywall.helpers({
  donors() {
    let res = donors.get();
    return res && res.count() ? res : false;
  },
  valueNow() {
    return valueNow.get();
  },
  valueMax() {
    return DONATION_GOAL;
  },
  valueWidth() {
    return Math.round(valueNow.get() / DONATION_GOAL * 100);
  }
});