var inquirer = require('inquirer');
var youtube = require('./youtube');

function start (query, firstResult) {
    youtube.search(query, 10, function (err, resultados) {
        if (err) {
            console.error('Error: ' + err);
            process.exit(1);
        }

        var results = parseResults (resultados);
        var finalId;

        if (firstResult) {
            youtube.openVideo(results.videosId[0], results.videosTitle[0]);
        } else {
            var firstQuestion = {
                type: 'list',
                name: 'confirmation',
                message: 'Do you want to listen to...',
                choices: [
                    '\"'+results.videosTitle[0]+'\"',
                    'See more results'
                ]
            };
            askQuestion(firstQuestion, function (firstAnswer) {
                if(firstAnswer.confirmation.includes('See more results')) {

                    var secondQuestion = {
                        type: 'list',
                        name: 'moreResults',
                        message: 'Choose another one ...',
                        choices: results.videosTitle
                    };

                    askQuestion(secondQuestion, function (secondAnswer) {
                        finalId = results.videosId[results.videosTitle.indexOf(secondAnswer.moreResults)];
                        youtube.openVideo(finalId, secondAnswer.moreResults);
                    });
                } else {
                    finalId = results.videosId[0];
                    youtube.openVideo(finalId, results.videosTitle[0]);
                }
            });
        }
    });
}

function parseResults (results) {
    var videosTitle = []; 
    var videosId = []; 

    results.items.forEach(function (item) {
        videosTitle.push(item.snippet.title);
        videosId.push(item.id.videoId);
    });

    return {
        videosTitle: videosTitle,
        videosId: videosId
    };
}

function askQuestion (question, callback) {
    inquirer.prompt(question).then(callback);
}

module.exports = {
    start: start
};
