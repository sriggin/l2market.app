// Simply 'inherites' rendered callback from AccountsTemplates
Template['override-atReCaptcha'].rendered = AccountsTemplates.atReCaptchaRendered;

// Simply 'inherites' helpers from AccountsTemplates
Template['override-atReCaptcha'].helpers(AccountsTemplates.atReCaptchaHelpers);
