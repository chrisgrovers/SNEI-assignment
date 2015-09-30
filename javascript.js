var app = {};

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

var request = function(search, callback) {
  
}



// $.ajax({
//   url: 'https://api.twitch.tv/kraken/search/streams?q=starcraft',
//   jsonp: 'callback',
//   dataType: 'jsonp',
//   success: function(data) {
//     console.log('search recieved', data);
//   },
//   error: function(data) {
//     console.error('we have an error retrieving data!');
//   }
// })

// app.fetch = function(search, callback) {
//   $.ajax({
//   url: 'https://api.twitch.tv/kraken/search/streams?q=' + search,
//   jsonp: 'callback',
//   dataType: 'jsonp',
//   success: function(data) {
//     console.log('search recieved', data);
//   },
//   error: function(data) {
//     console.error('we have an error retrieving data!');
//   }
// })
// }

// app.fetch('starcraft', function() {
//   console.log('hello');
// });
