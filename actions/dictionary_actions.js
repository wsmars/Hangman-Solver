var AppDispatcher = require('../dispatcher/dispatcher');
var ApiUtil = require('../util/api_util');

var DictionaryActions = {
  receiveDictionary: function(dictionary){
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_DICTIONARY',
      dictionary: dictionary
    });
  },

  separateWordsByLength: function (words) {
    var result = {};
    var dictionaryArray = words.split("\n");
    for (var i = 0; i < dictionaryArray.length; i++) {
      var l = dictionaryArray[i].length
      if (result[l]) {
        result[l].push(dictionaryArray[i]);
      }
      else {
        result[l] = [dictionaryArray[i]];
      }
    }
    return result;
  },

  fetchDictionary: function() {
    ApiUtil.fetchDictionary(this.receiveDictionary, this.separateWordsByLength);
  }
}

module.exports = DictionaryActions;
