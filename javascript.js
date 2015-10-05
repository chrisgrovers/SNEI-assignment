
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

// helper function to create a div with necessary elements
var divMaker = function(className, html, children) {
  var newDiv = document.createElement('div');
  newDiv.classList.add(className);
  newDiv.innerHTML = html;
  if (children) {
    for (var i = 0; i < children.length; i++) {
      newDiv.appendChild(children[i]);
    }
  }
  return newDiv;
}

// callback function to correctly display jsonp information in results div
var twitchData = function(jsonp) {

  //clear results view for new search
  var results = document.getElementById('results');
  results.innerHTML = '';
  var self = jsonp._links.self;
  var curr = self.slice(self.indexOf('offset=') + 7, self.indexOf('&q'));
  var currPage = (curr / 10) + 1;
  var pages = Math.round(totalResults / 10);

  var totalResults = jsonp._total
  var streams = jsonp.streams;
  var totalHTML = 'Total results: ' + totalResults;
  var total = divMaker('total', totalHTML);

  var leftArrow = document.createElement('div');
  leftArrow.id = 'leftArrow';

  var rightArrow = document.createElement('div');
  rightArrow.id = 'rightArrow';

  var pageHTML = currPage + '/' + pages
  // information on what page of streams you are currently viewing
  var page = divMaker('page', pageHTML);

  leftArrow.addEventListener('click', function() {
    var prev = jsonp._links.prev ? jsonp._links.prev + '&callback=twitchData' : null;
    if (prev) {
      searchQuery(prev);
    } else {
      console.log('har har, nice try!')
    }
  });

  rightArrow.addEventListener('click', function() {
    var next = jsonp._links.next + '&callback=twitchData';
    debugger;
    if (currPage < pages) {
      searchQuery(next);
    } else {
      console.log('har har, nice try!')
    }
  });

  // creates div with information on what page you are on, along with clickable arrows
  var scroll = divMaker('scroll', '', [rightArrow, page, leftArrow]);

  // append number of results & scroll view
  var searchInfo = divMaker('searchInfo', '', [total, scroll]);

  results.appendChild(searchInfo);

  for (var i = 0; i < streams.length; i++) {
    streamView(streams[i]);
  }
  console.log(jsonp);
}

var streamView = function(streamObj) {
  var size = 'medium';

  var img = {
    small: streamObj.preview.small,
    medium: streamObj.preview.medium,
    large: streamObj.preview.large
  };

  if (streamObj.viewers === 1) {
    var viewers = ' viewer';
  } else {
    viewers = ' viewers';
  }

  // so that image can be resized with window

  // child divs for info div
  var streamDisplay = divMaker('streamDisplay', streamObj.channel.display_name);
  var gameName = divMaker('gameName', viewers);
  var description = divMaker('description', streamObj.channel.status);

  // creates div for the preview image
  var image = document.createElement('img');
  image.classList.add('preview');
  image.src = img[size];

  // child divs for stream div
  var info = divMaker('info', '', [streamDisplay, gameName, description]);
  var stream = divMaker('stream', '', [image, info]);

  // append stream view to 'results' 
  var results = document.getElementById('results');
  results.appendChild(stream);
}

// takes in a source which will be the link to the api we will be using
var searchQuery = function(source) {

  var api = document.createElement('script');

  api.src = source;

  document.body.appendChild(api);
}

// add a listener to the searchbox, so when a search is queried, the results view will populate with results
document.getElementById("searchBox").addEventListener("submit", function(e){
  e.preventDefault();
  var search = escape(document.getElementById('searchQuery').value);

  var source = 'https://api.twitch.tv/kraken/search/streams?q=' + search + '&callback=twitchData';

  searchQuery(source)
});

// automatically clears search query input box on click
document.getElementById("searchQuery").addEventListener('click', function() {
  this.value = '';
});





