var ApiUtil = {
  fetchDictionary: function(receiveDictionary, separateWordsByLength) {
    $.ajax ({
      url: 'https://raw.githubusercontent.com/sindresorhus/word-list/master/words.txt',
      type: 'GET',
      success: function(words) {
        var dictionary = separateWordsByLength(words);
        receiveDictionary(dictionary)
        }
    })
  },

  fetchSession: function(email, receiveSession) {
    $.ajax ({
      url: 'https://strikingly-hangman.herokuapp.com/game/on',
      type: 'POST',
      headers: {
                "content-type": "application/json"
               },
      dataType: 'json',
      data: "{\n    \"playerId\": " + "\"" + email + "\"" + ",\n    \"action\" : \"startGame\"\n}",
      success: function(response) {
        console.log(response.sessionId);
        receiveSession(response.sessionId);
      },
      error: function(response) {
        console.log(response)
      }
    })
  },

  fetchWord: function(session, receiveWord, receiveTotalWordCount, receiveWrongGuessCountOfCurrentWord) {
    $.ajax ({
      url: 'https://strikingly-hangman.herokuapp.com/game/on',
      type: 'POST',
      headers: {
                "content-type": "application/json"
               },
      dataType: 'json',
      data: "{\n    \"sessionId\": " + "\"" + session + "\"" + ",\n    \"action\" : \"nextWord\"\n}",
      success: function(response) {
        console.log(response.data);
        receiveWord(response.data.word);
        receiveTotalWordCount(response.data.totalWordCount);
        receiveWrongGuessCountOfCurrentWord(response.data.wrongGuessCountOfCurrentWord);
      },
      error: function(response) {
        console.log(response)
      }
    })
  },


  guessWord: function(session, letter, receiveWord, receiveTotalWordCount, receiveWrongGuessCountOfCurrentWord) {
    $.ajax ({
      url: 'https://strikingly-hangman.herokuapp.com/game/on',
      type: 'POST',
      headers: {
                "content-type": "application/json"
               },
      dataType: 'json',
      data: "{\n    \"sessionId\": " + "\"" + session + "\"" + ",\n    \"action\" : \"guessWord\",\n    \"guess\": " + "\"" + letter + "\"" + "\n}",
      success: function(response) {
        console.log(response.data);
        receiveWord(response.data.word);
        receiveTotalWordCount(response.data.totalWordCount);
        receiveWrongGuessCountOfCurrentWord(response.data.wrongGuessCountOfCurrentWord);
      },
      error: function(response) {
        console.log(response)
      }
    })
  },

  fetchResult: function(session, receiveTotalWordCountResult, receiveCorrectWordCountthis, receiveTotalWrongGuessCount, receiveScore) {
    $.ajax ({
      url: 'https://strikingly-hangman.herokuapp.com/game/on',
      type: 'POST',
      headers: {
        "content-type": "application/json"
      },
      dataType: 'json',
      data: "{\n    \"sessionId\": " + "\"" + session + "\"" + ",\n    \"action\" : \"getResult\"\n}",
      success: function(response) {
        console.log(response.data);
        receiveTotalWordCountResult(response.data.totalWordCount);
        receiveCorrectWordCountthis(response.data.correctWordCount);
        receiveTotalWrongGuessCount(response.data.totalWrongGuessCount);
        receiveScore(response.data.score);
      },
      error: function(response) {
        console.log(response)
      }
    })
  },

  gameSubmit: function(session) {
    $.ajax ({
      url: 'https://strikingly-hangman.herokuapp.com/game/on',
      type: 'POST',
      headers: {
        "content-type": "application/json"
      },
      dataType: 'json',
      data: "{\n    \"sessionId\": " + "\"" + session + "\"" + ",\n    \"action\" : \"submitResult\"\n}",
      success: function(response) {
        console.log(response.message);
        console.log(response.data);
      },
      error: function(response) {
        console.log(response)
      }
    })
  }
}
module.exports = ApiUtil;
