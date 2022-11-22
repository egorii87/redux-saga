import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {reducer} from './components/reducer'
import {requestTable, requestTableSuccess, requestTableError, fetchTable} from './components/actionCreators'


// Sagas
function* watchFetchTable() {
  yield takeEvery('FETCHED_TABLE', fetchTableAsync);
}

function* fetchTableAsync() {
  try {
    yield put(requestTable());
    const data = yield call(() => {
      return axios.get(`http://users.bugred.ru/tasks/rest/list`).then((res) => res.data);
    });
    console.log(data);

    yield put(requestTableSuccess(data));
  } catch (error) {
    yield put(requestTableError());
  }
}

// Component
class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchTable())}>Show Table</button>
        {this.props.loading ? (
          <p>Loading...</p>
        ) : this.props.error ? (
          <p>Error, try again</p>
        ) : (
          <div>
            {typeof this.props.url == typeof ' '
              ? null
              : this.props.url.map((employee, index) => {
                  return (
                    <div key={index}>
                      <h3>
                        name_method: {employee.name_method}, url: {employee.url}
                      </h3>
                    </div>
                  );
                })}
          </div>
        )}
      </div>
    );
  }
}

// Store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchFetchTable);

const ConnectedApp = connect((state) => {
  console.log(state);
  return state;
})(App);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
);
