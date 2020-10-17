// Simply 'inherits' helpers from AccountsTemplates
Template['override-atPwdForm'].helpers(AccountsTemplates.atPwdFormHelpers);

// Simply 'inherits' events from AccountsTemplates
Template['override-atPwdForm'].events(AccountsTemplates.atPwdFormEvents);

$(document).ready(function(){
  $('#create-account').click(function(e){
    e.preventDefault();
    $(this).parent().next('div').removeClass('d-none');
  });
});