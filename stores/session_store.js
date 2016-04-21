var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SessionStore = new Store(AppDispatcher);
var _session = "";

SessionStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case "RECEIVE_SESSION":
    this.receiveSession(payload.session);
    SessionStore.__emitChange();
    break;
  }
};

SessionStore.all = function () {
  return _session;
};

SessionStore.receiveSession = function (session) {
  _session = session;
};

module.exports = SessionStore;
