//BACKBONE//

var Result_Item = Backbone.Model.extend({
    initialize: function() {
        this.append();
    },
    append: function() {
        /*var view = new Result_View({model:this});

        $('#resultContainer').append(view.render().$el);*/
    }
});

var Results = Backbone.Collection.extend({
    model: Result_Item,
    initialize: function() {
        var view = new Result_View({collection:this});
        $('#resultContainer').append(view.render().$el);
    }
});

var Result_View = Backbone.View.extend({
    className: "resultCollection",
    makeRow: function() {
        return $(document.createElement('div')).addClass('row');
    },
    render: function() {
        var elementsWrapper = document.createElement('div');
        var row = this.makeRow();
        setTimeout(function() {
            for (var i = 0; i < this.collection.length; i++) {
                row.append(new Result_Item_View({model: this.collection.models[i]}).render().$el);
                if ((i + 1) % 4 === 0) {
                    $(elementsWrapper).append($(row));
                    row = this.makeRow();
                }
                console.log(elementsWrapper);
            }
        }.bind(this), 100);
        this.$el = elementsWrapper;
        return this;
    }
});

var Result_Item_View = Backbone.View.extend({
    tagName: "div",
    className: "result_item panel panel-default",
    initialize: function() {
        this.template = _.template($('#result_item').html());
        /*$('#result_item').css({'display': 'inline-block'});*/
    },
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

//END BACKBONE//



//pure jQuery part: SEARCH///
$(document).ready(function() {
    $('body').keypress(function(e) {
        if (e.keyCode === 13) {
            var query = $('#searchinput').val();
            var response;
            requestEbay(query, function(data) {
                response = data.
            }
            /*$('#navigationText>a').append('<span id="query">' + query + '</span>');*/
            $('.searchLanding, #navigation, .searchbox').addClass('submitted');
            /*$('#searchPrefix').css({'display': 'inline-block'});*/
            $(".searchbox").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                function() {
                    var samples = new Results([
                        {imageURL: 'http://puu.sh/bZ5I1/c798733d64.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5JO/1c94e84275.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5JO/1c94e84275.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5LD/6ad8c10d74.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5MA/75169540e1.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5I1/c798733d64.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5JO/1c94e84275.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5JO/1c94e84275.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5LD/6ad8c10d74.png', desc: 'this is a test one'},
                        {imageURL: 'http://puu.sh/bZ5MA/75169540e1.png', desc: 'this is a test one'}
                    ]);
                });
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