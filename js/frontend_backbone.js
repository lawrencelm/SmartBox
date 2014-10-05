//BACKBONE//

var Result_Item = Backbone.Model.extend({
    initialize: function() {
        this.append();
    },
    parse: function(data) {
        this.model.set('URL', data.attributes.URL[0]);
        this.model.set('pic', data.attributes.pic[0]);
        this.model.set('title', data.attributes.title[0]);
        console.log(this);
        return this;
    },
    append: function() {
        /*var view = new Result_View({model:this});

        $('#resultContainer').append(view.render().$el);*/
    }
});

var Results = Backbone.Collection.extend({
    model: Result_Item,
    parse: function() {
    },
    initialize: function() {
        var view;
        setTimeout(function() {
        view = new Result_View({collection:this});
        $('#resultContainer').append(view.render().$el);
        }.bind(this), 200);
    }
});

var Result_View = Backbone.View.extend({
    className: "resultCollection",
    makeRow: function() {
        //console.log('result_view');
        return $(document.createElement('div')).addClass('row');
    },
    render: function() {
        var elementsWrapper = document.createElement('div');
        var row = this.makeRow();
        console.log(this.collection)
            for (var i = 0; i < this.collection.length; i++) {
                console.log(this.collection.models[i].attributes.URL[0])
                row.append(new Result_Item_View({model: this.collection.models[i]}).render().$el);
                if ((i + 1) % 4 === 0) {
                    $(elementsWrapper).append($(row));
                    row = this.makeRow();
                }
            }
            console.log(elementsWrapper);
            this.$el = elementsWrapper;
        return this;
    }
});

var Result_Item_View = Backbone.View.extend({
    tagName: "div",
    className: "result_item panel panel-default col-md-3",
    initialize: function() {
        //console.log('result_item_view')
        this.template = _.template($('#result_item').html());
        /*$('#result_item').css({'display': 'inline-block'});*/
    },
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        console.log(this);
        return this;
    }
});

//END BACKBONE//



//pure jQuery part: SEARCH///
$(document).ready(function() {
    $('body').keypress(function(e) {
        if (e.keyCode === 13) {
            var response;

            requestEbay($('#searchinput').val(), function(data) {
                response = data;
                generate(response.list);
            });

            function generate(response) {
                /*$('#navigationText>a').append('<span id="query">' + query + '</span>');*/
                $('.searchLanding, #navigation, .searchbox').addClass('submitted');
                /*$('#searchPrefix').css({'display': 'inline-block'});*/
                $(".searchbox").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                    function() {
                        var content = new Results(response);
                    });
            }
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