var express = require('express');
var request = require("request");

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'Tq8jY0yQah6YBOarmMkm5Z8Cf',
  consumer_secret: 'vklKPQ9HG0iAHRuFP7LBSlJDvykYpr4x3brdkZrJFXdkEEN7jA',
  access_token_key: '1355972767-LjhAn1PIgfxK7EYq1F9iQs6gTivt9vr8rW38AzL',
  access_token_secret: '7ZcA1PMjFiLV62tozquohtZ4tVEN7gltA15E6SQBJE5XT'
});

client.stream('statuses/filter', {track: 'ISIS'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});