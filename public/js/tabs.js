$(document).ready(function () {
  $('#tabs li a:not(:first)').addClass('inactive');
  $('.container').hide();
  $('.container:first').show();
      
  $('#tabs li a').click(function(){
    var t = $(this).attr('id');
    if($(this).hasClass('inactive')){
      $('#tabs li a').addClass('inactive');           
      $(this).removeClass('inactive');

      $('.container').hide();
      $('#'+ t + '-content').fadeIn('slow');
    }
  });
});