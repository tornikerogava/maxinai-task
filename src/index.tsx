import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reducer from "./store/reducers/reducer";

import { Provider } from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
export const reducers = combineReducers({ reducer });


const store = createStore(reducers, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

