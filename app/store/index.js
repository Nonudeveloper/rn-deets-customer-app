import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import devTools from 'remote-redux-devtools';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import createSagaMiddleware from 'redux-saga';
import sagas from '../redux/sagas';
import reducers, { gotMessages, gotUsers, gotNewUser, gotNewMessage } from '../redux/reducers';
import socket from '../socket.io';
import { gotUser } from '../redux/chat/user';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
let navigate;
const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

export default function configureStore(onComplete) {
  const engine = createEngine('AppTree');
  const storeMiddleware = storage.createMiddleware(engine);
  const sagaMiddleware = createSagaMiddleware();

  let store = createStore(
    storage.reducer(reducers), //Apply redux-storage so we can persist Redux state to disk
    compose(
      applyMiddleware(
        sagaMiddleware,
        // storeMiddleware,
        logger,
      ),
      devTools(),
    ),
  );

  socket.on('priorMessages', messages => {
    store.dispatch(gotMessages(messages));
  });
  socket.on('userCreated', response => {
    const { user, users } = response;
    store.dispatch(gotUser(user));
    store.dispatch(gotUsers(users));
    navigate('users');
    console.log('navigate');
  });
  socket.on('newUser', user => {
    store.dispatch(gotNewUser(user));
  });
  socket.on('incomingMessage', message => {
    store.dispatch(gotNewMessage(message));
  });

  if (isDebuggingInChrome) {
    window.store = store;
  }

  // const load = storage.createLoader(engine);
  // load(store)
  //   .then(onComplete)
  //   .catch(() => console.log('Failed to load previous state'));

  sagaMiddleware.run(sagas);

  return store;
}

export const login = (credentials, navigation) => {
  socket.emit('newUser', credentials);
  navigate = navigation.navigate;
};
export const openChat = users => {
  socket.emit('chat', users);
};
export const sendMessage = (text, sender, receiver) => {
  socket.emit('message', { text, sender, receiver });
};
