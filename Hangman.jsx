var React = require('react');
var ReactDOM = require('react-dom');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var SessionActions = require('./actions/session_actions');
var DictionaryActions = require('./actions/dictionary_actions');
var WordActions = require('./actions/word_actions');

var SessionStore = require('./stores/session_store');
var DictionaryStore = require('./stores/dictionary_store');

var MyComponent = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
            session: '',
            email: 'mszhang0220@gmail.com',
            dictionary: {},
            possibleWords: [],
            existLetter: [],
            word: ""
           };
  },

  updateSession: function() {
    this.setState({session: SessionStore.all()});
  },

  updateDictionary: function() {
    this.setState({dictionary: DictionaryStore.all()});
  },

  componentDidMount: function() {
    this.token1 = SessionStore.addListener(this.updateSession);
    this.token2 = DictionaryStore.addListener(this.updateDictionary);
  },

  componentWillUnmount: function() {
    this.token1.remove();
    this.token2.remove();
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

  render: function () {
    return(
      <div>
        <input placeholder="Email" type="text" value={this.state.email} />
        <button onClick={this.clickStart}>Start</button><br/>
        <button onClick={this.clickGetAWord}>Get A Word</button>
        <h2>Session: {this.state.session}</h2>
        <h2>Word: {this.state.word}</h2>
        <h3>Possible Words: {this.state.possibleWords.length}</h3>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
