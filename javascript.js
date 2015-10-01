// var app = {};

/*
Rules:
- Write a simple web app that hits the Twitch API URL shown at the top (there are API docs online)
- Use JSONP when utilizing the Twitch API's
- Build the URL based on the query entered by the user in the search box shown in the mock
- Build out the list as shown in the mock. 
- All UI elements are mandatory and self-explanatory
- Feel free to add more/better UI, as long as you include the mandatory elements
- No frameworks like jQuery/AngularJS.  Just vanilla JS with XHR to hit the API.
 
Submit your code to a github repo and send us the link.  You can host the running app on github.io.
*/

var twitchData = function(jsonp) {
  console.log('twitchData function entered');
  var streams = jsonp.streams;
  var total = jsonp._total;


  console.log('streams are', streams);
  console.log('first stream is', streams[0]);

  for (var i = 0; i < streams.length; i++) {
    streamView(streams[i]);
  }
  console.log(jsonp);
}

var streamView = function(streamObj) {
  // so that image can be resized with window
  var size = size || 'medium';


  var gameName = document.createElement('div');
  gameName.classList.add('gameName');
  gameName.innerHTML = streamObj.game;
  console.log('gameName is ' + gameName);

  var description = document.createElement('div');
  description.classList.add('description');
  description.innerHTML = streamObj.channel.status;

  var viewers = document.createElement('div');
  viewers.classList.add('viewers');
  if (streamObj.viewers === 1) {
  viewers.innerHTML = streamObj.viewers + ' viewer';
  } else {
    viewers.innerHTML = streamObj.viewers + ' viewers';
  }

  var img = {
    small: streamObj.preview.small,
    medium: streamObj.preview.medium,
    large: streamObj.preview.large
  };

  var image = document.createElement('img');
  image.classList.add('preview');
  image.src = img[size];
  console.log('image is', image);

  var stream = document.createElement('div');
  stream.classList.add('stream');
  stream.appendChild(image);
  stream.appendChild(gameName);
  stream.appendChild(viewers);
  stream.appendChild(description);
  console.log('stream is', stream);

  //append stream view to 'results' 

  var results = document.getElementById('results');
  results.appendChild(stream);
}


var api = document.createElement('script');
api.src = 'https://api.twitch.tv/kraken/search/streams?q=csgo&callback=twitchData';

document.body.appendChild(api);




