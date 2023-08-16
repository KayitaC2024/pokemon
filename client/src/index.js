// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {Provider} from 'react-redux';
// import store from './store/index';


// ReactDOM.render(
//   <Provider store={store}>
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   </Provider>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { BrowserRouter } from "react-router-dom";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

//axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"; ya estaba/quimbay
axios.defaults.baseURL ="http://localhost:3001";// es avisarle a axios que todas las peticiones empiezen o tengan una misma base url(front)para trabajar con el proyecto de forma local utilizamos este para las peticiones
//axios.defaults.baseURL = 'https://pokemonback-production.up.railway.app/';// conectar front con el back que ya deployamos// cuando queramos puchear o actualizar nuestro deploy del front  lo hacemos aca 


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();