function annyangThread(callback){
  $.getScript("../annyang/annyang.js", function(){

        var tag = "kittens";

        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
            'play (the song) *song': playSong,
            'play (the song) *song by *artist': playSong,
            'smartbox play (the song) *song': playSong,
            'smartbox play (the song) *song by *artist': playSong,
             'stop (the music)': stop,
             'smartbox stop (the music)': stop,
              'buy (me) *item' :buyOnEbay,
              'smartbox buy (me) *item' :buyOnEbay,
               'Bring (me) food' : bringFood,
               'smartbox Bring (me) food' : bringFood,
            'show me (pictures of) *term' : requestPhotos,
            'smartbox show me (pictures of) *term' : requestPhotos,
            'google *term': function(term) {
                var win = window.open('https://www.google.com/#q='+term, '_blank');
      if(win){
          //Browser has allowed it to be opened
          win.focus();
      }else{
          //Broswer has blocked it
          alert('Please allow popups for this site');
      }
        }

        };
           function buyOnEbay(item){
              requestEbay(item, function(data) {
                callback(data)
              });
           }

           function bringFood(){
           document.getElementById('food').className="ordrin-embed";

           }

           function requestKittens(){

           }

           function requestPhotos(term){
            var url = 'https://secure.flickr.com/services/rest/?';
                url +='method=flickr.photos.search&';
                url +='api_key=02970fe33b397f5ac3934bdd232d1302&';
                url +='text=' + encodeURIComponent(term) + '&';
                url +='safe_search=1&';
                url +='content_type=1&';
                url +='sort=interestingness-desc&';
                url +='per_page=20';

            var req = new XMLHttpRequest();
            req.open("GET", url, false);
            req.send(null);
            console.log(req.responseText);

            var kittens = req.responseXML.querySelectorAll('photo');
            //console.log(kittens);
            var photos = []
            for (var i = 0; i < kittens.length; i++) {
              var photo = kittens[i];
              imgURL = photo.getAttribute("farm")+".static.flickr.com/" + photo.getAttribute("server") +
              "/" + photo.getAttribute("id") +
              "_" + photo.getAttribute("secret") +
              "_s.jpg";
              imgTitle=photo.getAttribute('title');
              photos.push({"imgURL":imgURL, "imgTitle":imgTitle})
            }
            apistructure={"APItype":"FLICKR", "photos":photos}
            console.log(apistructure);
            callback(apistructure);
          }


          var audio = null;
          function playSong(song, artist) {
              console.log("PlaySong", song);
              var req = new XMLHttpRequest();
              req.open('GET', 'https://api.spotify.com/v1/search?type=track&q=' + encodeURIComponent(song), true);
              req.onreadystatechange = function() {
                  if (req.readyState == 4 && req.status == 200){
                      var data = JSON.parse(req.responseText);
                      var textField = document.getElementById('searchinput').value;
                      if (data.tracks.items[0]) {
                          stop();
                          var matchedElement = document.getElementById('matched');
                              console.log("reached");
                              console.log(data);
                              var imgURL=data.tracks.items[0].album.images[0].url||data.tracks.items[0].album.name;
                              var artistName= data.tracks.items[0].artists[0].name;
                              console.log(imgURL);
                              console.log(artistName);
                              console.log(song);
                              var apistructure = {"APItype":"SPOTIFY",
                                                  "meta": {"imgURL":imgURL, "song":song, "artistName":artistName}};
                              console.log(apistructure);
                              audio = new Audio(data.tracks.items[0].preview_url);
                              callback(apistructure);
                              audio.play();
                      }
                  }
              };
              req.send(null);
          }

          function stop() {
              if (audio) {
                  audio.pause();
                  audio = null;
              }
          }

          // Add our commands to annyang
          annyang.addCommands(commands);

        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
        annyang.debug();

  });
};