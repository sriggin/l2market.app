_.each(AccountsTemplates.atInputRendered, function(callback){
  Template['override-atInput'].onRendered(callback);
  Template['override-atHiddenInput'].onRendered(callback);
});

// Simply 'inherites' helpers from AccountsTemplates
Template['override-atInput'].helpers(AccountsTemplates.atInputHelpers);

// Simply 'inherites' events from AccountsTemplates
Template['override-atInput'].events(AccountsTemplates.atInputEvents);

// Simply 'inherites' helpers from AccountsTemplates
Template['override-atTextInput'].helpers(AccountsTemplates.atInputHelpers);

// Simply 'inherites' helpers from AccountsTemplates
Template['override-atCheckboxInput'].helpers(AccountsTemplates.atInputHelpers);

// Simply 'inherites' helpers from AccountsTemplates
Template['override-atSelectInput'].helpers(AccountsTemplates.atInputHelpers);

// Simply 'inherites' helpers from AccountsTemplates
Template['override-atRadioInput'].helpers(AccountsTemplates.atInputHelpers);

// Simply 'inherites' helpers from AccountsTemplates
Template['override-atHiddenInput'].helpers(AccountsTemplates.atInputHelpers);

// Sets up default Bootstrap icon classes for social button icons
AccountsTemplates.configure({
    texts: {
        inputIcons: {
            isValidating: 'glyphicon glyphicon-refresh',
            hasError: 'glyphicon glyphicon-remove',
            hasSuccess: 'glyphicon glyphicon-ok',
        }
    },
});
