import React from 'react';
import ReactDOM from 'react-dom';
import { mart } from "./data";
import App from './App';
//import reportWebVitals from './reportWebVitals';

// props => 속성값으로 데이터 전송 : 고정 데이터
// 생성자 매개변수
// constructor(props)
ReactDOM.render(
    <React.StrictMode>
        <App mart={mart}/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
