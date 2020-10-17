AccountsTemplates.configure({
  defaultLayout: 'layout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'content',

  showForgotPasswordLink: false,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  //sendVerificationEmail: true,
  //enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,

  // negativeValidation: true,
  // positiveValidation: true,
  // negativeFeedback: false,
  // positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',

  texts: {
    errors: {
      // accountsCreationDisabled: 'Client side accounts creation is disabled!!!',
      // cannotRemoveService: 'Cannot remove the only active service!',
      // captchaVerification: 'Captcha verification failed!',
      // loginForbidden: 'error.accounts.Login forbidden',
      // mustBeLoggedIn: 'error.accounts.Must be logged in',
      // pwdMismatch: 'error.pwdsDontMatch',
      // validationErrors: 'Validation Errors',
      // verifyEmailFirst: 'Please verify your email first. Check the email and follow the link!',
    }
  }
});

T9n.map('en', {
  error: {
    accounts: {
      'Login forbidden': 'Authentication failed'
    }
  }
});

// AccountsTemplates.configureRoute('changePwd');
// AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn', {
  path: '/login'
});
// AccountsTemplates.configureRoute('signUp');
// AccountsTemplates.configureRoute('verifyEmail');
// AccountsTemplates.configureRoute('signIn', {
//   layoutType: 'blaze',
//   name: 'signin',
//   path: '/login',
//   template: 'myLogin',
//   layoutTemplate: 'myLayout',
//   layoutRegions: {
//     nav: 'customNav',
//     footer: 'customFooter'
//   },
//   contentRegion: 'main',
//   redirect: '/user-profile'
// });

Template['override-atForm'].replaces('atForm');
Template['override-atError'].replaces('atError');
Template['override-fullPageAtForm'].replaces('fullPageAtForm');
Template['override-atTitle'].replaces('atTitle');
Template['override-atTermsLink'].replaces('atTermsLink');
Template['override-atSocial'].replaces('atSocial');
Template['override-atSignupLink'].replaces('atSignupLink');
Template['override-atSigninLink'].replaces('atSigninLink');
Template['override-atSep'].replaces('atSep');
Template['override-atResult'].replaces('atResult');
Template['override-atResendVerificationEmailLink'].replaces('atResendVerificationEmailLink');
Template['override-atReCaptcha'].replaces('atReCaptcha');
Template['override-atPwdLink'].replaces('atPwdLink');
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
Template['override-atPwdForm'].replaces('atPwdForm');
Template['override-atOauth'].replaces('atOauth');
Template['override-atNavButton'].replaces('atNavButton');
Template['override-atMessage'].replaces('atMessage');
Template['override-atInput'].replaces('atInput');
Template['override-atTextInput'].replaces('atTextInput');
Template['override-atCheckboxInput'].replaces('atCheckboxInput');
Template['override-atSelectInput'].replaces('atSelectInput');
Template['override-atRadioInput'].replaces('atRadioInput');
Template['override-atHiddenInput'].replaces('atHiddenInput');