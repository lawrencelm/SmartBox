//pure jQuery part
$(document).ready(function() {
    $('body').keypress(function(e) {
        if (e.keyCode === 13) {
            var query = $('#searchinput').val();
            /*$('#navigationText>a').append('<span id="query">' + query + '</span>');*/
            $('.searchLanding, #navigation, .searchbox').addClass('submitted');
            /*$('#searchPrefix').css({'display': 'inline-block'});*/
        }
    });
    $('#login-button').click(function() {
        $('#login-modal').removeClass('hidden');
    });
});

