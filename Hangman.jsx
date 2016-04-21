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
            dictionary: {},
            possibleWords: [],
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
    this.setState({dictionary: DictionaryStore.all()});
  },

  updateWord: function() {
    this.setState({guessWord: WordStore.all()});
    this.setState({result: WordStore.result()});
  },

  componentDidMount: function() {
    this.token1 = SessionStore.addListener(this.updateSession);
    this.token2 = DictionaryStore.addListener(this.updateDictionary);
    this.token3 = WordStore.addListener(this.updateWord);
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
    WordActions.fetchWord(this.state.session);
  },

  clickGuess: function (e) {
    e.preventDefault();
    WordActions.guessWord(this.state.session, this.state.guessLetter);
  },

  clickResult: function (e) {
    e.preventDefault();
    WordActions.fetchResult(this.state.session);
  },

  clickSubmit: function (e) {
    e.preventDefault();
    WordActions.gameSubmit(this.state.session);
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
