var AppDispatcher = require('../dispatcher/dispatcher');
var ApiUtil = require('../util/api_util');

var WordActions = {
  receiveWord: function(word){
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_WORD',
      word: word
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
    ApiUtil.fetchWord(session, this.receiveWord, this.receiveTotalWordCount, this.receiveWrongGuessCountOfCurrentWord);
  },

  guessWord: function(session, letter) {
    ApiUtil.guessWord(session, letter, this.receiveWord, this.receiveTotalWordCount, this.receiveWrongGuessCountOfCurrentWord);
  },

  fetchResult: function(session) {
    ApiUtil.fetchResult(session, this.receiveTotalWordCountResult, this.receiveCorrectWordCount, this.receiveTotalWrongGuessCount, this.receiveScore);
  },

  gameSubmit: function(session) {
    ApiUtil.gameSubmit(session);
  }
}

module.exports = WordActions;
