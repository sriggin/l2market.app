BlazeLayout.setRoot('body');

function checkPaywall(context, redirect) {
  // check if donations are 100%
  // > if not, check if user has code in localStorage
  // >> if yes, check if valid
  // if not, redirect to /paywall

  // TODO: Quit job. Leave wife. Leave daughter.
  // const msg = 'yes i know it is hardcoded xD it will be like this until i get time... fu!';
  // if (window.localStorage.getItem('access-code') == 'OHOHOH') {
  //   return;
  // }
  // if (window.localStorage.getItem('access-code') == 'OCT2020') {
  //   return;
  // }
  // if (context.path == '/donate' || context.path == '/paywall' || context.path == '/login') {
  //   return;
  // }
  // redirect('/paywall');
}

FlowRouter.triggers.enter([checkPaywall]);

FlowRouter.route('/', {
  name: 'market',
  action: function(params, query) {
    BlazeLayout.render('layout', { content: 'market' });
  }
});

FlowRouter.route('/closed', {
  name: 'closed',
  action: function(params, query) {
    BlazeLayout.render('layout', { content: 'closed' });
  }
});

FlowRouter.route('/paywall', {
  name: 'paywall',
  action: function(params, query) {
    // disable paywall for now
    FlowRouter.go('/');
    // BlazeLayout.render('layout', { content: 'paywall' });
  }
});

FlowRouter.route('/donate', {
  name: 'donate',
  action: function(params, query) {
    BlazeLayout.render('layout', { content: 'donate' });
  }
});

FlowRouter.route('/logout', {
  name: 'logout',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, query) {
    Meteor.logout(function(err){
      FlowRouter.go('/');
    });
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('layout', { content: '404' });
  }
};