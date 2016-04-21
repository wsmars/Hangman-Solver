var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var DictionaryStore = new Store(AppDispatcher);
var _dictionary = {};
var _possibleWords = [];

DictionaryStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case "RECEIVE_DICTIONARY":
    this.recieveDictionary(payload.dictionary);
    DictionaryStore.__emitChange();
    break;
  }
};

DictionaryStore.all = function () {
  return _dictionary;
};

DictionaryStore.recieveDictionary = function (dictionary) {
  _dictionary = dictionary;
};

DictionaryStore.filterWordsByLength = function (length) {
  return _possibleWords = _dictionary[length];
};

DictionaryStore.filterWordsByLetter = function (letter) {
  var result = [];
  for (var i = 0; i < _possibleWords.length; i++) {
    if (!_possibleWords[i].includes(letter)) {
      result.push(_possibleWords[i]);
    }
  }
  _possibleWords = result;
};

DictionaryStore.filterWordsByPattern = function (word) {
  var result = [];

  var samePattern = function (word1, word2) { // word1 = "abc", word2 = "*bc"
    for (var i = 0; i < word1.length; i++) {
      if ((word2[i] != word1[i]) && (word2[i] != "*")) {
        return false;
      }
    }
    return true;
  };

  for (var j = 0; j < _possibleWords.length; j++) {
    if (samePattern(_possibleWords[j], word)) {
      result.push(_possibleWords[j]);
    }
  }

  _possibleWords = result;
};

DictionaryStore.findMostCommonLetter = function (possibleWords, existLetter) {
  var obj = {}
  var l = possibleWords[0].length; //all possibleWords are same length
  var currentCount = 1;
  var result = "";

  for (var i = 0; i < possibleWords.length; i++) {
    for (var j = 0; j < l; j++) {
      if (obj[possibleWords[i][j]]) {
        obj[possibleWords[i][j]] ++;
        if (currentCount < obj[possibleWords[i][j]] && !existLetter.includes(possibleWords[i][j])) {
          currentCount = obj[possibleWords[i][j]];
          result = possibleWords[i][j];
        }
      }
      else {
        obj[possibleWords[i][j]] = 1;
      }
    }
  }

  return result.toUpperCase();
};

module.exports = DictionaryStore;
