#!/usr/bin/env node

'use strict';

var program = require('commander');
var google = require('googleapis');
var secrets = require('./secrets.json');
var util = require('util');
var opn = require('opn');

var inquirer = require('inquirer');

var API_KEY = secrets.keys.api_key;   
var youtube = google.youtube({version: 'v3'});
var songValue;

program
.arguments('<song>')
.option('-f, --first-result', 'Get the first result without asking')
.action(function (song) {
    songValue = song;
})
.parse(process.argv);

if (typeof songValue === 'undefined') {
    console.error('no song given!');
    process.exit(1);
}

function runSamples () {
    youtube.search.list({
        part: 'snippet',
        q: songValue, 
        maxResults: 10,
        key: API_KEY
    }, function (err, data) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            var videos_array_title = new Array(); 
            var videos_array_id = new Array(); 
            data.items.forEach(function (item) {
                videos_array_title.push(item.snippet.title);
                videos_array_id.push(item.id.videoId);
            });

            var video_link = 'https://youtube.com/watch?v=' + videos_array_id[0];

            var first_choice = {
                type: 'list',
                name: 'confirmation',
                message: 'Do you want to listen to...',
                choices: [
                    '\"'+videos_array_title[0]+'\"',
                    'See more results'
                ]
            };
           
            inquirer.prompt(first_choice).then(function (answers) {
                if(answers.confirmation.includes('See more results')) {

                    var second_choice = {
                        type: 'list',
                        name: 'second',
                        message: 'Choose another one ...',
                        choices: videos_array_title
                    };

                    inquirer.prompt(second_choice).then(function (answers) {
                        var video_link = 'https://youtube.com/watch?v=' +videos_array_id[videos_array_title.indexOf(answers.second)];
                        console.log('Opening video... '+video_link);
                        opn(video_link);
                    });
                } else {
                    console.log('Opening video...');
                    opn(video_link);
                }
            });
        }
    });
}
runSamples();
