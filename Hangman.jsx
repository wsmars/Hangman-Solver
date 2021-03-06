var React = require('react');
var ReactDOM = require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var SessionActions = require('./actions/session_actions');
var DictionaryActions = require('./actions/dictionary_actions');
var WordActions = require('./actions/word_actions');

var SessionStore = require('./stores/session_store');
var DictionaryStore = require('./stores/dictionary_store');
var WordStore = require('./stores/word_store');

var MyComponent = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
            session: '',
            email: 'mszhang0220@gmail.com',
            possibleWords: [],
            suggestLetters: {},
            existLetter: [],
            guessWord: [],
            guessLetter: "",
            result: []
           };
  },

  updateSession: function() {
    this.setState({session: SessionStore.all()});
  },

  updateDictionary: function() {
    var newDictionary = DictionaryStore.all()
    this.setState({possibleWords: newDictionary[0]});
    this.setState({suggestLetters: newDictionary[1]});
    // debugger;
  },

  updateWord: function() {
    this.setState({guessWord: WordStore.all()});
    this.setState({result: WordStore.result()});
  },

  componentDidMount: function() {
    this.token1 = SessionStore.addListener(this.updateSession);
    this.token2 = WordStore.addListener(this.updateWord);
    this.token3 = DictionaryStore.addListener(this.updateDictionary);
  },

  componentWillUnmount: function() {
    this.token1.remove();
    this.token2.remove();
    this.token3.remove();
  },

  clickStart: function (e) {
    e.preventDefault();
    DictionaryActions.fetchDictionary();
    SessionActions.fetchSession(this.state.email);
  },

  clickGetAWord: function (e) {
    e.preventDefault();
    this.setState({existLetter: []});
    WordActions.fetchWord(this.state.session);
  },

  clickGuess: function (e) {
    e.preventDefault();
    if (this.state.existLetter.includes(this.state.guessLetter)) {
      alert("This letter has been guessed!")
    }
    else {
      this.state.existLetter.push(this.state.guessLetter);
      WordActions.guessWord(this.state.session, this.state.guessLetter, this.state.guessWord[2]);
    }
  },

  clickResult: function (e) {
    e.preventDefault();
    WordActions.fetchResult(this.state.session);
  },

  clickSubmit: function (e) {
    e.preventDefault();
    WordActions.gameSubmit(this.state.session);
  },

  mostCommonLetter: function (obj) {
    var keys = Object.keys(obj);
    var largest = 0;
    var result = "";

    for (var i = 0; i < keys.length; i++) {
      if (obj[keys[i]] > largest) {
        result = keys[i];
        largest = obj[keys[i]];
      }
    }
    return result.toUpperCase();
  },

  renderSuggestLetters: function() {
    var suggest = this.state.suggestLetters;
    var letters = Object.keys(suggest);
    var result = [];
    if (letters.length < 1) {
      return null;
    }
    else {
      for (var i = 0; i < letters.length; i++) {
        result.push(letters[i].toUpperCase() + "(" + suggest[letters[i]] + ")" + "," + " ")
      }
      return (
        <div>{result}</div>
      )
    }
  },

  render: function () {
    return(
      <div>
        <input placeholder="Email" type="text" valueLink={this.linkState('email')}/>
        <button onClick={this.clickStart}>Start</button><br/>
        <h2>Session: {this.state.session}</h2>

        <h2>----------------------------------------------</h2>
        <button onClick={this.clickGetAWord}>Get A Word</button>
        <h2>Word: {this.state.guessWord[0]}</h2>
        <h2>Total Word Count: {this.state.guessWord[1]}</h2>
        <h2>Wrong Guess Count of Current Word: {this.state.guessWord[2]}</h2>
        <h2>Possible Words Count: {this.state.possibleWords.length}</h2>
        <h2>Suggest Words: {this.renderSuggestLetters()}</h2>
        <h2>Most Common Words: {this.mostCommonLetter(this.state.suggestLetters)}</h2>

        <h2>----------------------------------------------</h2>
        <input placeholder="Guess A letter" type="text" valueLink={this.linkState('guessLetter')}/>
        <button onClick={this.clickGuess}>Guess</button><br/>

        <h2>----------------------------------------------</h2>
        <button onClick={this.clickResult}>Result</button><br/>
        <h2>Total Word Count: {this.state.result[0]}</h2>
        <h2>Correct Word Count: {this.state.result[1]}</h2>
        <h2>Total Wrong Guess Count: {this.state.result[2]}</h2>
        <h2>Score: {this.state.result[3]}</h2>
        <h2>----------------------------------------------</h2>
        <button onClick={this.clickSubmit}>Submit</button>
        <h2>----------------------------------------------</h2>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
