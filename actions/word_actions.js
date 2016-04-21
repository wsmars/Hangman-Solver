var AppDispatcher = require('../dispatcher/dispatcher');
var ApiUtil = require('../util/api_util');

var WordActions = {
  receiveWord: function(word){
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_WORD',
      word: word
    });
  },

  receiveWordLength: function(length){
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_WORDS_LENGTH',
      length: length
    });
  },

  receiveGuessedLetter: function(letter){
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_GUESSED_LETTER',
      letter: letter
    });
  },

  receivePattern: function(pattern){
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_PATTERN',
      pattern: pattern
    });
  },

  receiveTotalWordCount: function(totalWordCount) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_TOTAL_WORD_COUNT',
      totalWordCount: totalWordCount
    });
  },

  receiveWrongGuessCountOfCurrentWord: function(wrongGuessCountOfCurrentWord) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_WRONG_GUESS_COUNT_OF_CURRENT_WORD',
      wrongGuessCountOfCurrentWord: wrongGuessCountOfCurrentWord
    });
  },

  receiveTotalWordCountResult: function(totalWordCountResult) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_TOTAL_WORD_COUNT_RESULT',
      totalWordCountResult: totalWordCountResult
    });
  },

  receiveCorrectWordCount: function(correctWordCount) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_CORRECT_WORD_COUNT',
      correctWordCount: correctWordCount
    });
  },

  receiveTotalWrongGuessCount: function(totalWrongGuessCount) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_TOTAL_WRONG_GUESS_COUNT',
      totalWrongGuessCount: totalWrongGuessCount
    });
  },

  receiveScore: function(score) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_SCORE',
      score: score
    });
  },

  fetchWord: function(session) {
    ApiUtil.fetchWord(session, this.receiveWord, this.receiveWordLength, this.receiveTotalWordCount, this.receiveWrongGuessCountOfCurrentWord);
  },

  guessWord: function(session, letter, wrongGuessCount) {
    ApiUtil.guessWord(session, letter, wrongGuessCount, this.receivePattern, this.receiveGuessedLetter, this.receiveWord, this.receiveTotalWordCount, this.receiveWrongGuessCountOfCurrentWord);
  },

  fetchResult: function(session) {
    ApiUtil.fetchResult(session, this.receiveTotalWordCountResult, this.receiveCorrectWordCount, this.receiveTotalWrongGuessCount, this.receiveScore);
  },

  gameSubmit: function(session) {
    ApiUtil.gameSubmit(session);
  }
}

module.exports = WordActions;
