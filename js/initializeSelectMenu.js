function initializeSelectMenu($arraySelectMenu) {
  for (i = 0; i < $arraySelectMenu.length; i++) {
      $($arraySelectMenu[i]).selectmenu({
        classes: { 'ui-selectmenu-button': 'form-control' },
        create: function(e, ui) {
          if ($(this).val()) { $(this).selectmenu('refresh'); }
        },
        change: function(e, ui) {
          if ($(this).val()) { $(this).trigger('change'); }
        },
        position: { my: 'left top', at: 'left bottom', collision: 'flip', using: function(obj, info) {
          var $this = $(this).css('opacity', 0);
    
          if ((info.element.top > 0 && info.element.top < info.target.top) || $(document).height() < info.element.top + info.element.height) {
            $this.addClass('ui-flipped');
          } else {
            $this.removeClass('ui-flipped');
          }
          setTimeout(function() { $('.scrollbar-dynamic').trigger('scroll'); }, 1);
        }}
      })
      .on('change', function(e) {
        $(this).parent().removeClass('ok empty invalid');
        var $btn = $(this).closest('.form').find('button');
        if ($(this).val() || $(this).attr('name') == 'locale') {
          $btn.removeClass('disabled').attr('disabled', false);
        } else {
          $btn.addClass('disabled').attr('disabled', true);
        }
      });
    };
  };