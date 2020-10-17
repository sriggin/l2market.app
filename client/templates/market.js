import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import { ShopItems } from '/imports/api/shopitems.js';

import './market.html';

let subscription;
let error = new ReactiveVar(null);

Template.market.onCreated(function(){
  this.opts = {
    sort: {
      createdAt: -1
    }
  };
  this.query = '';
  this.queryEmitted = '';
  this.time = new Date();
  this.shopTypes = new ReactiveVar([1, 3, 8]);
  this.shopItems = new ReactiveVar(ShopItems.find({}, this.opts));

  this.updateItems = function(clear = true) {
    if (clear) {
      subscription && subscription.stop();
      subscription = Meteor.subscribe('items', this.shopTypes.get(), this.query, {
        onStop: function(err){
          error.set(err ? err.reason : null);
        }
      });
    }

    let lookup = {
      type: { $in: this.shopTypes.get() }
    };

    if (this.query) {
      if (Meteor.isProduction && this.query != this.queryEmitted) {
        this.queryEmitted = this.query;
        gtag('event', 'query', { 'event_category': 'search', 'event_label': this.query });
      }
      if (this.query.substr(0, 2) == 'p:') {
        lookup['player'] = {
          $regex: this.query.substr(2) + '.*',
          $options: 'i'
        };
      } else if (this.query.substr(0, 1) == '"') {
        lookup['item.text'] = this.query.substr(1, this.query.length-2);
      } else {
        lookup['item.text'] = {
          $regex: this.query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(/ /g, '.*'),
          $options: 'i'
        }
      }
    }

    this.shopItems.set(ShopItems.find(lookup, this.opts));
  };

  subscription && subscription.stop();
  subscription = Meteor.subscribe('items', this.shopTypes.get());
});

Template.market.helpers({
  loaded() {
    return subscription && subscription.ready();
  },
  error() {
    return error.get();
  },
  optionsDisabledClass() {
    return subscription && subscription.ready() ? '' : ' option-disabled';
  },
  optionsDisabled() {
    return subscription && subscription.ready() ? '' : 'disabled';
  },
  shopItems() {
    return Template.instance().shopItems.get();
  }
});

Template.market.events({
  'instant #search'(event, instance){
    if (event.target.value != instance.query) {
      instance.query = event.target.value;
      instance.updateItems();
    }
  },
  'keyup #search': _.debounce((event, instance) => {
    if (event.target.value != instance.query) {
      instance.query = event.target.value;
      instance.updateItems();
    }
  }, 400),
  'click .field-player'(event, instance){
    $('#search')
      .val('p:' + $(event.target).text())
      .trigger('input') // update clearable
      .trigger('instant'); // trigger search without debounce
  },
  'click .field-item'(event, instance){
    $('#search')
      .val('"' + $(event.target).text() + '"')
      .trigger('input') // update clearable
      .trigger('instant'); // trigger search without debounce
  },
  'change [type=checkbox]'(event, instance){
    var types = [];
    document.querySelectorAll('[type=checkbox]:checked').forEach(e => types.push(parseInt(e.value)));
    instance.shopTypes.set(types);
    instance.updateItems();
  },
  'click .sort-by'(event, instance){
    const field = $(event.target).data('field');
    const order = instance.opts.sort[field] == 1 ? -1 : 1;
    instance.opts.sort = {};
    instance.opts.sort[field] = order;
    instance.updateItems(false);
  }
});

Template.item.onRendered(function(){
  let $spinner = this.$('.spinner-border');
  let $img = this.$('img[data-src]');
  $img.attr('src', $img.data('src'));
  $img.bind('load', function(){
    $img.removeClass('d-none');
    $spinner.remove();
  });
});

Template.item.helpers({
  formatPrice(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  formatEnchant(val) {
    return val > 0 ? '+'+val : '-';
  },
  formatDate(val) {
    var diff = new Date().getTime() - new Date(val).getTime();
    var mins = Math.round(diff / (1000 * 60));

    if (mins > 1440) {
      days = Math.round(mins / 60 / 24);
      return days + (days != 1 ? " days ago" : " day ago");
    } else if (mins > 60) {
      hours = Math.round(mins / 60);
      return hours + (hours != 1 ? " hours ago" : " hour ago");
    } else if (mins > 0) {
      return mins + (mins != 1 ? " minutes ago" : " minute ago");
    } else {
      return "Just now";
    }
  },
});