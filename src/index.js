import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducer/myReducer";
import adminReducer from './reducer/adminReducer';
export const store = createStore(rootReducer);
export const adminStore = createStore(adminReducer);
const root = ReactDOM.createRoot(document.getElementById('myroot'));

root.render(<Provider store={store} ><App/></Provider>);
