import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email'

import { ShopItems } from'/imports/api/shopitems.js';
import { Timestamps } from'/imports/api/timestamps.js';

Meteor.startup(() = {
  if (process.env.L2MARKET_ONLINE_CHECK_RECIPIENT && process.env.MAIL_URL) {
    SyncedCron.add({
      name: 'Check if bot is online',
      schedule: function(parser) {
        return parser.text('every 2 minutes');
      },
      job: function() {
        const item = ShopItems.findOne({}, { sort: { createdAt: -1 }});

        if (!item) {
          console.log('error: no items in db');
          return;
        }

        const diff = new Date().getTime() - item.createdAt.getTime();
        const mins = Math.round(diff / (1000 * 60));

        // Only send alert if no new item for 5 mins
        if (mins < 5) {
          return;
        }

        // Only send alert once an hour
        const timestamp = Timestamps.findOne({ name: 'online-check' });
        if (timestamp && timestamp.time > new Date().getTime() - (1000 * 60 * 60)) {
          return;
        }

        Timestamps.upsert({ name: 'online-check' }, { name: 'online-check', time: new Date().getTime() });
        Email.send({ to: process.env.L2MARKET_ONLINE_CHECK_RECIPIENT, from: 'l2marketapp@gmail.com', subject: 'L2Market.app offline', text: 'Last item added more than 5 minutes ago' });
      }
    });
    SyncedCron.start();
  }
});
