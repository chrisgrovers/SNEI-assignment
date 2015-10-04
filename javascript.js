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
  // TODO: Fix borders with correct color.
  //TODO: add error handling
    // handle zero results

  //clear results view for new search
  var results = document.getElementById('results');
  results.innerHTML = '';
  // debugger;

  var totalResults = jsonp._total

  var streams = jsonp.streams;
  var total = document.createElement('div');
  total.classList.add('total');
  total.innerHTML = 'Total results: ' + totalResults;

  var leftArrow = document.createElement('div');
  leftArrow.id = 'leftArrow';

  var rightArrow = document.createElement('div');
  rightArrow.id = 'rightArrow';

  var page = document.createElement('div');
  page.classList.add('page');
  var self = jsonp._links.self;
  var curr = self.slice(self.indexOf('offset=') + 7, self.indexOf('&q'));
  var currPage = (curr / 10) + 1;
  var pages = Math.round(totalResults / 10);

  page.innerHTML = currPage + '/' + pages

  leftArrow.addEventListener('click', function() {
    // console.log('leftArrow clicked');
    var prev = jsonp._links.prev ? jsonp._links.prev + '&callback=twitchData' : null;
    if (prev) {
      searchQuery(prev);
    } else {
      console.log('har har, nice try!')
    }
  });

  rightArrow.addEventListener('click', function() {
    // console.log('rightArrow clicked');
    var next = jsonp._links.next + '&callback=twitchData';
    debugger;
    if (currPage < pages) {
      searchQuery(next);
    } else {
      console.log('har har, nice try!')
    }
  });

  var scroll = document.createElement('div');
  scroll.classList.add('scroll');
  scroll.appendChild(rightArrow);
  scroll.appendChild(page)
  scroll.appendChild(leftArrow);

  // append number of results & scroll view
  var searchInfo = document.createElement('div');
  searchInfo.classList.add('searchInfo');
  searchInfo.appendChild(total);
  searchInfo.appendChild(scroll);

  results.appendChild(searchInfo);

  for (var i = 0; i < streams.length; i++) {
    streamView(streams[i]);
  }
  console.log(jsonp);
}


var streamView = function(streamObj) {
  // TODO: fix description to be indented

  // so that image can be resized with window
  var size = size || 'medium';

  var streamDisplay = document.createElement('div');
  streamDisplay.classList.add('streamDisplay');
  streamDisplay.innerHTML =  streamObj.channel.display_name;


  var gameName = document.createElement('div');
  gameName.classList.add('gameName');
  gameName.innerHTML = streamObj.game + ' - ';
  if (streamObj.viewers === 1) {
    gameName.innerHTML += streamObj.viewers + ' viewer';
  } else {
    gameName.innerHTML += streamObj.viewers + ' viewers';
  }

  var description = document.createElement('div');
  description.classList.add('description');
  description.innerHTML = streamObj.channel.status;

  var img = {
    small: streamObj.preview.small,
    medium: streamObj.preview.medium,
    large: streamObj.preview.large
  };

  var image = document.createElement('img');
  image.classList.add('preview');
  image.src = img[size];

  var info = document.createElement('div');
  info.classList.add('info');
  info.appendChild(streamDisplay);
  info.appendChild(gameName);
  info.appendChild(description);
  var stream = document.createElement('div');
  stream.classList.add('stream');
  stream.appendChild(image);
  stream.appendChild(info);

  //append stream view to 'results' 
  var results = document.getElementById('results');
  results.appendChild(stream);
}

var searchQuery = function(source) {

  var api = document.createElement('script');

  api.src = source;

  document.body.appendChild(api);
}

document.getElementById("searchBox").addEventListener("submit", function(e){
  e.preventDefault();
  var search = escape(document.getElementById('searchQuery').value);

  // console.log('search is', search);
  var source = 'https://api.twitch.tv/kraken/search/streams?q=' + search + '&callback=twitchData';

  searchQuery(source)
});

document.getElementById("searchQuery").addEventListener('click', function() {
  this.value = '';
});





