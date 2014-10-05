//BACKBONE//

var Result_Item = Backbone.Model.extend({
    initialize: function() {
    },
    parse: function(data) {
        this.model.set('URL', data.attributes.URL[0]);
        this.model.set('pic', data.attributes.pic[0]);
        this.model.set('title', data.attributes.title[0]);
        console.log(this);
        return this;
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
        var element = view.render().$el;
        $('#resultContainer').append(element);
        console.log(element);
        }.bind(this), 100);
    }
});


var Result_View = Backbone.View.extend({
    initialize: function() {
        $('body').keypress(function(e) {
            if (e.keyCode === 13 && this.rendered)
                $(this.$el).addClass('moved');
        }.bind(this))
    },
    makeRow: function() {
        console.log('result_view');
        return $(document.createElement('div')).addClass('row');
    },
    rendered: false,
    render: function() {
        var elementsWrapper = document.createElement('div');
        var row = this.makeRow();
        console.log(this.collection)
            for (var i = 0; i < this.collection.length; i++) {
                //console.log(this.collection.models[i].attributes.URL[0])
                row.append(new Result_Item_View({model: this.collection.models[i]}).render().$el);
                if ((i + 1) % 4 === 0) {
                    $(elementsWrapper).append($(row));
                    row = this.makeRow();
                }
            }
            if (!((i+1) % 4 === 0)) $(elementsWrapper).append($(row));
            $(elementsWrapper).addClass('resultCollection');
            console.log(elementsWrapper);
            this.$el = elementsWrapper;
        this.rendered = true;
        return this;
    }
});

var Result_Item_View = Backbone.View.extend({
    tagName: "div",
    className: "result_item panel panel-default col-md-3",
    initialize: function() {
        //console.log('result_item_view');
        this.template = _.template($('#result_item').html());
        $('#result_item').css({'display': 'inline-block'});
    },
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        console.log(this);
        return this;
    }
});

var Spotify_Item = Backbone.Model.extend({
    initialize: function() {
        setTimeout(function() {
        var view = new Spotify_View({model: this});
        var element = view.render().$el;
        $('#resultContainer').append(element);
        }.bind(this), 100);
    }
});

var Spotify_View = Backbone.View.extend({
    tagName: "div",
    id: "spotifyelement",
    initialize: function() {
        this.template = _.template($('#spotifyelement').html());
    },
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

//END BACKBONE//


//pure jQuery part: SEARCH///
var searchMoved = false;
$(document).ready(function() {
    var submitState = function() {
        $('.searchLanding, #navigation, .searchbox').addClass('submitted');
    }

    annyangThread(function(response) {
        submitState();
        generate(response);
    });
    
    function generate(response) {
                /*$('#navigationText>a').append('<span id="query">' + query + '</span>');*/
                /*$('#searchPrefix').css({'display': 'inline-block'});*/

                //currently not useful.
                var determineSearchMoved = function() {
                    if ($('.searchbox').css('margin-top') === margin_searchAtTop)
                        searchMoved = true;
                }

                var content;

                var determineAPIView = function() {
                    switch(response.APItype) {
                        case "EBAY":
                            console.log(response.list);
                            content = new Results(response.list);
                            margin_searchAtTop = $(this).css('margin-top'); //currently not useful.
                            break;
                        case "SPOTIFY":
                            console.log(response.meta);
                            content = new Spotify_Item(response.meta);
                            break;    
                    }
                }

                determineAPIView();
                /*if(!searchMoved) {
                    $(".searchbox").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                        function() {
                            console.log('reached end of transition already');
                            determineAPIView();}
                    );
                }
                else determineAPIView();*/
            }

    $('body').keypress(function(e) {
        if (e.keyCode === 13) {
            var response;
            var query = $('#searchinput').val();

            if (query.substring(0,"buy".length)==="buy") {
                query = query.substring("buy".length + 1);
                submitState();
                requestEbay(query, function(data) {
                    response = data;
                    generate(response);
                });
            }
        }
    });

    $('#login-button').click(function() {
        $('#login-modal').removeClass('hidden');
    });

    $(document).on("submit", ".submitLogin", function(e) {
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