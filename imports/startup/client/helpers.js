Template.layout.helpers({
  activeIfTemplateIs: function(template) {
    var currentRoute = FlowRouter.getRouteName();
    return currentRoute && template === currentRoute ? ' active' : '';
  }
});

Template.layout.helpers({
  pathFor: function(path, view) {
    var hashBang, query, ref;
    if (view == null) view = { hash: {} };
    if (!path) throw new Error('no path defined');
    if (!view.hash) view.hash = view;
    if (((ref = path.hash) != null ? ref.route : null) != null) {
      view = path;
      path = view.hash.route;
      delete view.hash.route;
    }
    query = view.hash.query ? FlowRouter._qs.parse(view.hash.query) : {};
    hashBang = view.hash.hash ? view.hash.hash : '';
    return FlowRouter.path(path, view.hash, query) + (hashBang ? "#" + hashBang : '');
  }
});