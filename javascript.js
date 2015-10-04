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

  // TODO: add clickable arrows
  // TODO: fix results number
  // TODO: play with jsonp._links.self and jsonp._links.next for scroll view

var calculatePages = function(curr, total) {
  currPage = (curr / 10) + 1;

  var pages = jsonp._total / 10;
  if (jsonp._total % 10 !== 0) {
    pages++;
  }

  return currPage + '/' + pages;
} 

var scrollPage = function(direction) {
  console.log(direction);
}

var twitchData = function(jsonp) {
  // TODO: Fix borders with correct color.
  //TODO: add error handling
    // handle zero results

  //clear results view for new search
  var results = document.getElementById('results');
  results.innerHTML = '';

  debugger;
  var totalResults = jsonp._total

  // var offset = jsonp._links

  // console.log('twitchData function entered');
  var streams = jsonp.streams;
  var total = document.createElement('div');
  total.classList.add('total');
  total.innerHTML = 'Total results: ' + totalResults;
  // console.log('total is', total);

  var leftArrow = document.createElement('div');
  leftArrow.id = 'leftArrow';

  var rightArrow = document.createElement('div');
  rightArrow.id = 'rightArrow';


  leftArrow.addEventListener('click', function() {
    console.log('hello!');
    scrollPage(leftArrow);
  });

  rightArrow.addEventListener('click', function() {
    console.log('hello!');
  });

  var page = document.createElement('div');
  page.classList.add('page');
  // page.innerHTML = calculatePages(, totalResults)

  var scroll = document.createElement('div');
  scroll.classList.add('scroll');
  scroll.appendChild(rightArrow);
  // scroll.appendChild(page)
  scroll.appendChild(leftArrow);


  // console.log('streams are', streams);
  // console.log('first stream is', streams[0]);

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

var searchQuery = function(search) {

  search = search.split(' ').join('+');
  console.log('search is', search);
  var api = document.createElement('script');

  api.src = 'https://api.twitch.tv/kraken/search/streams?q=' + search + '&callback=twitchData'; 

  document.body.appendChild(api);
}

document.getElementById("searchBox").addEventListener("submit", function(e){
  e.preventDefault();
  var search = document.getElementById('searchQuery').value;
  searchQuery(search)
});

document.getElementById("searchQuery").addEventListener('click', function() {
  this.value = '';
});





