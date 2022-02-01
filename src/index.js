import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import { createMiddleware } from 'redux-api-middleware';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { movieReducer } from './ducks/movies/MovieReducer'
import { userReducer } from './ducks/users/UserReducer'
import logger from './middlewares/Logger';
import { directorReducer } from './ducks/directors/DirectorReducer';
import { actorReducer } from './ducks/actors/ActorReducer';
import { chatReducer } from './ducks/chats/ChatReducer';


let store = createStore(
  combineReducers(
    {
      movies: movieReducer,
      users: userReducer,
      directors: directorReducer,
      actors: actorReducer,
      chats: chatReducer
    }
  ), applyMiddleware(thunk,createMiddleware(), logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
