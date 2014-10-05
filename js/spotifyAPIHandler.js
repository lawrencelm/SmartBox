
        
  var tag = "kittens";
            
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
      'play (the song) *song': playSong,
      'play (the song) *song by *artist': playSong,
       'stop (the music)': stop, 
        'buy (me) *item' :buyOnEbay,
         'Bring (me) food' : bringFood,
  //    'show me (pictures of) *term' : requestKittens,
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
     function buyOnEbay(){
         
     }
            
     function bringFood(){
     document.getElementById('food').className="ordrin-embed";

     }
            
     function requestKittens(){
         
     }
        

    var audio = null;
    function playSong(song, artist) {
        var recognizedElement = document.getElementById('recognized');
        recognizedElement.innerText = 'Recognized "' + song + (artist ? ' by ' + artist : '') + '"';
        console.log("PlaySong", song);
        var req = new XMLHttpRequest();
        req.open('GET', 'https://api.spotify.com/v1/search?type=track&q=' + encodeURIComponent(song), true);
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200){
                var data = JSON.parse(req.responseText);
                var textField = document.getElementById('search').value;
                if (data.tracks.items[0]) {
                    stop();
                    var matchedElement = document.getElementById('matched');
                    console.log("reached");
                    matchedElement.innerHTML = '<div class="media"><img src="' + data.tracks.items[0].album.images[0].url + '" alt="Cover art of ' + data.tracks.items[0].album.name + '" width="300"><p>Playing ' + data.tracks.items[0].name + ' by ' + data.tracks.items[0].artists[0].name +'</p></div>';
                    audio = new Audio(data.tracks.items[0].preview_url);
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