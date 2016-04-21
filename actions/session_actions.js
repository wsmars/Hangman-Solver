var AppDispatcher = require('../dispatcher/dispatcher');
var ApiUtil = require('../util/api_util');

var SessionActions = {
  receiveSession: function(session){
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_SESSION',
      session: session
    });
  },

  fetchSession: function(email) {
    ApiUtil.fetchSession(email, this.receiveSession);
  }
}

module.exports = SessionActions;
