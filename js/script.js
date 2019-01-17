jQuery(function($){
  var speed = 500;
  var O, T, H, OP;
  var h = 0;
  var HH = [0];
  var WH = $(window).height();
  var HD = $('#header').innerHeight();
  /* header */
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100){
      $('#header').addClass('scroll');
    } else{
      $('#header').removeClass('scroll');
    };
  });
  /* logo */
  $('.logo a').click(function() {
    $('html, body').animate({scrollTop : 0},400);
    return false;
  });
  /* main slide */
  $('#mainSlide').bxSlider({
    mode:'fade',
    auto:true
  });
  $('.bx-wrapper').height(WH);
  $(window).on('resize',function(){
    $('.bx-wrapper').clearQueue().animate({'height': WH},speed);
  });
  /* mobile gnb */
  $('.m_gnb').on('click', function(){
    $(this).toggleClass('active');
    $('.gnb li a').removeClass('active');
    if ($(this).hasClass('active')) {
      $('.gnb_wrap').css({
        'top' : '0',
        'opacity' : '1'
      });
      $('#header .inner_container').css({
        'padding' : '0'
      });
    } else {
      $('.gnb_wrap').css({
        'top' : '-100%',
        'opacity' : '0'
      });
    }
    $(window).on('scroll',function(){
      $('.gnb li a').removeClass('active');
    });
    $('.gnb li a').on('click',function(){
      $('.m_gnb').removeClass('active');
      $('.gnb_wrap').css({
        'top' : '-100%',
        'opacity' : '0'
      });
    });
  });
  /* gnb */
  function now (){
    var X;
    var T = $(window).scrollTop();
    for (var i=0; i<$('section').length; i++) {
		T+(WH/3)>= HH[i+1] ? X = i : false;
	};
    return X;
  };
  var moving = false;
  function move (i){
    moving = true;
    if ($('html,body').is(':animated')) return false;
    var O = $('section').not(':eq(0)').eq(i).offset().top + -HD;
    $('html,body').clearQueue().animate({scrollTop: O},speed, function (){
      active(i);
      moving = false;
    });
  };
  function active (i){
    if ($('html,body').is(':animated')) return false;
    $('.gnb li a').removeClass('active');
    $('.gnb li').eq(i).find('a').addClass('active');
  };
  $(window).on('touchmove scroll',function(){
    if (moving) return false;
    active(now());
  });
  $('section').each(function(i){
    h+=$(this).height();
    HH[i+1] = h;
  });
  $('.gnb li a').on('click', function(){
    var idx = $(this).parents('li').index();
    move(idx);
    return false;
  });
});