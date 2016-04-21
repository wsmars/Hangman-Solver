var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var WordStore = new Store(AppDispatcher);
var _word = "";
var _totalWordCount = 0;
var _wrongGuessCountOfCurrentWord = 0;
var _totalWordCountResult = 0;
var _correctWordCount = 0;
var _totalWrongGuessCount = 0;
var _score = 0;

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
    case "RECEIVE_TOTAL_WORD_COUNT_RESULT":
    this.receiveTotalWordCountResult(payload.totalWordCountResult);
    WordStore.__emitChange();
    break;
  case "RECEIVE_CORRECT_WORD_COUNT":
    this.receiveCorrectWordCount(payload.correctWordCount);
    WordStore.__emitChange();
    break;
  case "RECEIVE_TOTAL_WRONG_GUESS_COUNT":
    this.receiveTotalWrongGuessCount(payload.totalWrongGuessCount);
    WordStore.__emitChange();
    break;
  case "RECEIVE_SCORE":
    this.receiveScore(payload.score);
    WordStore.__emitChange();
    break;
  }
};

WordStore.all = function () {
  return [_word, _totalWordCount, _wrongGuessCountOfCurrentWord];
};

WordStore.result = function () {
  return [_totalWordCountResult, _correctWordCount, _totalWrongGuessCount, _score];
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

WordStore.receiveTotalWordCountResult = function (totalWordCountResult) {
  _totalWordCountResult = totalWordCountResult;
};

WordStore.receiveCorrectWordCount = function (correctWordCount) {
  _correctWordCount = correctWordCount;
};

WordStore.receiveTotalWrongGuessCount = function (totalWrongGuessCount) {
  _totalWrongGuessCount = totalWrongGuessCount;
};

WordStore.receiveScore = function (score) {
  _score = score;
};

module.exports = WordStore;
