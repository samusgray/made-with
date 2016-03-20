#!/usr/bin/env node

var chalk = require('chalk')

var chalkStyles = require('./chalkStyles.json')
var phrases = require('./phrases.json');

var util = {
  getRandomIndex: function (arr) {
    return Math.floor(Math.random() * arr.length);
  },

  getItem: function (arr, index, ignoreItem) {
    var arrCopy = arr.slice(),
        selection = arrCopy[index];

    if (selection === ignoreItem) {
      arrCopy.splice(arrCopy.indexOf(ignoreItem), 1);
      return arrCopy[index];
    }
    return selection;
  }
}

var phrase = {
  choose: function (ignorePhrase) {
    var index = util.getRandomIndex(phrases);
    return util.getItem(phrases, index);
  },

  build: function (first, second) {
    var firstIndex = util.getRandomIndex(chalkStyles),
        secondIndex = util.getRandomIndex(chalkStyles),
        firstStyle = util.getItem(chalkStyles, firstIndex),
        secondStyle = util.getItem(chalkStyles, secondIndex, firstStyle);

    return 'Made with ' + chalk[firstStyle](first) + ' and ' + chalk[secondStyle](second) + '.';
  },

  format: function (phrase) {
    return '\n\t' + phrase + '\n';
  }
}

var phraseOne = phrase.choose();
var phraseTwo = phrase.choose(phraseOne);
var finalPhrase = phrase.build(phraseOne, phraseTwo);
var formattedPhrase = phrase.format(finalPhrase);

console.log(formattedPhrase);

module.exports = formattedPhrase
