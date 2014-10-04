//pure jQuery part: SEARCH///
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

Parse.initialize('Xbx1p6suP8Fd2FjL2qr98AktVB5WfV5fRom9a1Dy', 'Q5Br45nLQaq08jtkpoIix1C1DheI9d6wV7SqoFNv');

//LOGIN//
$('#submitLogin').click(function() {
    register();
});

var register = function() {
    var user = new Parse.User();
    //var user = new Parse.User();
    /*var inputUsername = $('#inputUsername').val();
    var inputPassword = $('#inputPassword').val();
    var inputEmail = $('#inputEmail').val();*/
    alert();
    user.set('username', 'asdf');
    user.set('password', 'asdfasdfasdf');
    user.set('email', 'asdasdf@asdfasdf.com');
    console.log(user);
    user.signUp(null, {
        success: function(user) {
        // Hooray! Let them use the app now.
        },
        error: function(user, error) {
        // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

var Results = Backbone.Collection.extend({

    model: Result_Item,
});

var Result_Item = Backbone.Model.extend({
    initialize: function() {

    }
});

var Result_Item_View = Backbone.View.extend({
    tagName: "div",
    className: "result_item",
    initialize: function() {
        this.template = _.template($('#result_item').html());
        /*$('#result_item').css({'display': 'inline-block'});*/
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

for (var i = 0; i < 10; i++) {
    var view = new Result_Item_View();
    $('#resultContainer').append(view.render().$el);
}