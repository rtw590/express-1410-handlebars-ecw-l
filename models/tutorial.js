var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var TutorialSchema = new Schema({
    title: {
        type: String
    },
    imgPath: {
        type: String
    },
    youtubeID: {
        type: String
    },
    shortDesc: {
        type: String
    },
    longDesc: {
        type: String
    },
    filesNeeded1: {
        type: String
    },
    filesNeeded2: {
        type: String
    },
    filesNeeded3: {
        type: String
    },
    filesNeeded4: {
        type: String
    },
    filesNeeded5: {
        type: String
    },
    filesNeeded1Title: {
        type: String
    },
    filesNeeded2Title: {
        type: String
    },
    filesNeeded3Title: {
        type: String
    },
    filesNeeded4Title: {
        type: String
    },
    filesNeeded5Title: {
        type: String
    },
    ecwid: {
        type: String
    }
});

module.exports = mongoose.model('Tutorial', TutorialSchema);
