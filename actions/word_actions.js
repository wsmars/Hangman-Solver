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

  fetchWord: function(session) {
    ApiUtil.fetchWord(session, this.receiveWord, this.receiveTotalWordCount, this.receiveWrongGuessCountOfCurrentWord);
  }
}

module.exports = WordActions;
