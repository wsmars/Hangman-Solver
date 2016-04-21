var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var DictionaryStore = new Store(AppDispatcher);
var _dictionary = {};
var _possibleWords = [];
var _suggestLetters = [];
var _exist = [];

DictionaryStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case "RECEIVE_DICTIONARY":
    this.recieveDictionary(payload.dictionary);
    DictionaryStore.__emitChange();
    break;
  case "RECEIVE_WORDS_LENGTH":
    this.filterDictionaryByLength(payload.length);
    DictionaryStore.__emitChange();
    break;
  case "RECEIVE_GUESSED_LETTER":
    this.filterDictionaryByLetter(payload.letter);
    DictionaryStore.__emitChange();
    break;
  case "RECEIVE_PATTERN":
    this.filterWordsByPattern(payload.pattern);
    DictionaryStore.__emitChange();
    break;
  }
};

DictionaryStore.all = function () {
  return [_possibleWords, _suggestLetters];
};

DictionaryStore.recieveDictionary = function (dictionary) {
  _dictionary = dictionary;
};

DictionaryStore.filterDictionaryByLength = function (length) {
  _possibleWords = _dictionary[length];
  _exist = [];
  this.findMostCommonLetter();
};

DictionaryStore.filterDictionaryByLetter = function (letter) {
  var result = [];
  for (var i = 0; i < _possibleWords.length; i++) {
    if (!_possibleWords[i].includes(letter)) {
      result.push(_possibleWords[i]);
    }
  }
  _possibleWords = result;
  this.findMostCommonLetter();
};

DictionaryStore.filterWordsByPattern = function (pattern) {
  var result = [];
  for (var n = 0; n < pattern.length; n++) {
    if (pattern != "*" && !_exist.includes(pattern[n])) {
      _exist.push(pattern[n]);
    }
  }

  var samePattern = function (word1, word2) { // word1 = "abc", word2 = "*bc"
    var exist = [];
    for (var k = 0; k < word2.length; k++) {
      if (word2[k] != "*") {
        exist.push(word2[k]);
      }
    }
    for (var i = 0; i < word1.length; i++) {
      if ((word2[i] != word1[i]) && (word2[i] != "*")) {
        return false;
      }
      else if ((word2[i] === "*") && exist.includes(word1[i])) {
        return false;
      }
    }
    return true;
  };

  for (var j = 0; j < _possibleWords.length; j++) {
    if (samePattern(_possibleWords[j], pattern)) {
      result.push(_possibleWords[j]);
    }
  }
  _possibleWords = result;
  this.findMostCommonLetter();
};

DictionaryStore.findMostCommonLetter = function () {
  var result = {};

  for (var i = 0; i < _possibleWords.length; i++) {
    for (var j = 0; j < _possibleWords[i].length; j++) {
      if (!_exist.includes(_possibleWords[i][j]) && result[_possibleWords[i][j]]) {
        result[_possibleWords[i][j]] += 1;
      }
      else if (!_exist.includes(_possibleWords[i][j])) {
        result[_possibleWords[i][j]] = 1;
      }
    }
  }

  return _suggestLetters = result;
};

module.exports = DictionaryStore;
