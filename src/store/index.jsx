/**
 * store
 */

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import rootSaga from './sagas';
import { history } from '../utils/history';

const routersMiddleware = routerMiddleware(history);
// create the saga middlewar
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware, routersMiddleware);

export default function configureStore() {
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
  )
  sagaMiddleware.run(rootSaga);
  return store;
}