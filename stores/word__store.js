var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var WordStore = new Store(AppDispatcher);
var _word = "";
var _totalWordCount = 0;
var _wrongGuessCountOfCurrentWord = 0;

WordStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case "RECEIVE_WORD":
    this.receiveWord(payload.word);
    WordStore.__emitChange();
    break;
  case "RECEIVE_TOTAL_WORD_COUNT":
    this.receiveTotalWordCount(payload.totalWordCount);
    WordStore.__emitChange();
    break;
  case "RECEIVE_WRONG_GUESS_COUNT_OF_CURRENT_WORD":
    this.receiveWrongGuessCountOfCurrentWord(payload.wrongGuessCountOfCurrentWord);
    WordStore.__emitChange();
    break;
  }
};

WordStore.all = function () {
  return [_word, _totalWordCount, _wrongGuessCountOfCurrentWord]
};

WordStore.receiveWord = function (word) {
  _word = word;
};

WordStore.receiveTotalWordCount = function (totalWordCount) {
  _totalWordCount = totalWordCount;
};

WordStore.receiveWrongGuessCountOfCurrentWord = function (wrongGuessCountOfCurrentWord) {
  _wrongGuessCountOfCurrentWord = wrongGuessCountOfCurrentWord;
};

module.exports = WordStore;
