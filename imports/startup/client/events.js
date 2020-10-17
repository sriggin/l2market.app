Template.layout.events({
  'click .dropdown-toggle'(event, instance){
    const $parent = $(event.target).parent();
    $parent.toggleClass('show');
    $parent.find('.dropdown-menu').toggleClass('show');
  },
  'click .navbar-toggler'(event, instance){
    let $target = $(event.target);
    if (event.target.tagName.toLowerCase() != 'button') {
      $target = $target.parent();
    }
    $($target.data('target')).toggleClass('show');
  },
  'input .clearable input:text'(event, instance){
    $(event.target)
      .siblings('.clearable-clear')
      .toggle(!!event.target.value);
  },
  'click .clearable-clear'(event, instance){
    event.preventDefault();
    $(event.target)
      .siblings('input:text')
      .val('')
      .trigger('input')
      .trigger('instant');
  }
});

// dropdown clear on window click
$(window).click(function(evt){
  if ($(evt.target).hasClass('dropdown-toggle')) return;
  let $el = $('.dropdown.show,.dropdown-menu.show');
  $el.removeClass('show');
});