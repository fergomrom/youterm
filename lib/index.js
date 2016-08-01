#!/usr/bin/env node

'use strict';

var program = require('commander');
var youterm = require('./youterm');

var songValue;

program
.option('-f, --first-result', 'Get the first result without asking')
.arguments('[song...]')
.action(function (song) {
    if (song) {
        songValue = song.join(" ");
    }
})
.parse(process.argv);

if (typeof songValue == 'undefined') {
    console.error('no song given!');
    process.exit(1);
}

youterm.start(songValue, program.firstResult);
