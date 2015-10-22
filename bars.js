// Bars.js
// Author: Jamie Coulter
// Date: 13.10.15

// Globals

max_arr = {};

// ============================================================== 
// Assign each bar group a unique id
// ==============================================================

function bar_group(){
  group_ident = 1;
  $('.bar_group').each(function(){
    $(this).addClass('group_ident-' + group_ident);
    $(this).data('gid', group_ident);
    group_ident++;
  });
}

// ============================================================== 
// Determine the maximum value within a bar group
// ==============================================================

function get_max(){
  $('.bar_group').each(function(){
    var bgArr = [];
    $(this).children().each(function(){
      bgArr.push($(this).attr('value'));
    });
    max_arr['group_ident-' + $(this).data('gid')] = bgArr;
    if($(this).attr('max') !== undefined){
      $(this).data('bg_max',$(this).attr('max'));
    }else{
      $(this).data('bg_max',Math.max.apply(null, bgArr));
    }
  });
}

// ============================================================== 
// Data labels
// ==============================================================

function data_labels(){
  $('.bar_group__bar').each(function(){
    if($(this).attr('label') !== undefined){
      $('<p class="b_label">' + $(this).attr('label') + '</p>').insertBefore($(this));
    }
  });
}

// ============================================================== 
// Show values
// ==============================================================

function show_values(){
  $('.bar_group__bar').each(function(){
    if($(this).attr('show_values') == 'true'){
      $(this).css('margin-bottom','40px');
      if($(this).attr('unit') !== undefined){
        $(this).append('<p class="bar_label_min">0 ' + $(this).attr('unit') + '</p>');
      	$(this).append('<p class="bar_label_max">' + $(this).parent().data('bg_max') + ' ' + $(this).attr('unit') + '</p>');
      } else {
      	$(this).append('<p class="bar_label_min">0</p>');
      	$(this).append('<p class="bar_label_max">' + $(this).parent().data('bg_max') + '</p>');
      }
    }
  });
}

// ============================================================== 
// Show tooltips
// ==============================================================

function show_tooltips(){
  $('.bar_group__bar').each(function(){
    if($(this).attr('tooltip') == 'true'){
      $(this).css('margin-bottom','40px');
      $(this).append('<div class="b_tooltip"><span>' + $(this).attr('value') + '</span><div class="b_tooltip--tri"></div></div>');
    }
  });
}

// ============================================================== 
// Pop up when in view
// ==============================================================

function in_view(elem){
  var $elem = $(elem);
  var $window = $(window);
  var docViewTop = $window.scrollTop();
  var docViewBottom = docViewTop + $window.height();
  var elemTop = $elem.offset().top;
  var elemBottom = elemTop + $elem.height();
  if(docViewBottom > elemBottom - 45){
    $elem.css('width',(($elem.attr('value'))/($elem.parent().data('bg_max')) * 100) + '%');
  } 
}

// Fire if bars in view when page loads
$('.bar_group__bar').each(function(){
  in_view($(this));
});

// Check on window scroll
$(window).scroll(function(){
  $('.bar_group__bar').each(function(){
    in_view($(this));
  });
});

// ============================================================== 
// Init
// ==============================================================

function bars(){
	bar_group();
	get_max();
	data_labels();
	show_tooltips();
	show_values();	
}

bars(); // Start bars.js
