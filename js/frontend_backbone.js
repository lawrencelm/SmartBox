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

    $(document).on("submit", "#submitLogin", function(e) {
        e.preventDefault();
        var username = document.getElementById('inputUsername').value;     
        var password = document.getElementById('inputPassword').value;
        var email = document.getElementById('inputEmail').value;
        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
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
    });

});

//LOGIN//



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