var youtubeApi = require('googleapis').youtube({version: 'v3'});
var opn = require('opn');
var API_KEY = require('./secrets.json').keys.api_key;   

function search (song, results, callback) {
    youtubeApi.search.list({
        part: 'snippet',
        q: song, 
        maxResults: results,
        key: API_KEY
    }, function (err, data) {
        callback (err, data);
    });
}

function getLink (songId) {
    return 'https://youtube.com/watch?v=' + songId;
}

function openVideo (videoId, videoName) {
    console.log('Opening \"'+videoName+'\"... ');
    opn(getLink(videoId));
}

module.exports = {
    search: search,
    openVideo: openVideo
};
