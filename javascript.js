
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

  //clear results view for new search
  var results = document.getElementById('results');
  results.innerHTML = '';


  var totalResults = jsonp._total

  var streams = jsonp.streams;

  var totalHTML = 'Total results: ' + totalResults;
  var total = divMaker('total', totalHTML);

  var leftArrow = document.createElement('div');
  leftArrow.id = 'leftArrow';

  var rightArrow = document.createElement('div');
  rightArrow.id = 'rightArrow';

  var self = jsonp._links.self;
  var curr = self.slice(self.indexOf('offset=') + 7, self.indexOf('&q'));
  var currPage = (curr / 10) + 1;
  var pages = Math.round(totalResults / 10);

  var pageHTML = currPage + '/' + pages
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

  var scroll = divMaker('scroll', '', [rightArrow, page, leftArrow]);

  // append number of results & scroll view
  var searchInfo = divMaker('searchInfo', '', [total, scroll]);

  results.appendChild(searchInfo);

  for (var i = 0; i < streams.length; i++) {
    streamView(streams[i]);
  }
  console.log(jsonp);
}

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

var streamView = function(streamObj) {

  // so that image can be resized with window
  var size = size || 'medium';

  var streamDisplay = divMaker('streamDisplay', streamObj.channel.display_name);


  if (streamObj.viewers === 1) {
    var viewers = ' viewer';
  } else {
    viewers = ' viewers';
  }

  var gameName = divMaker('gameName', viewers);

  var description = divMaker('description', streamObj.channel.status);


  var img = {
    small: streamObj.preview.small,
    medium: streamObj.preview.medium,
    large: streamObj.preview.large
  };

  var image = document.createElement('img');
  image.classList.add('preview');
  image.src = img[size];

  var info = divMaker('info', '', [streamDisplay, gameName, description]);

  var stream = divMaker('stream', '', [image, info]);

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

  var source = 'https://api.twitch.tv/kraken/search/streams?q=' + search + '&callback=twitchData';

  searchQuery(source)
});

document.getElementById("searchQuery").addEventListener('click', function() {
  this.value = '';
});





