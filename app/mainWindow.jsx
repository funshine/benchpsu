'use strict';
import React from "react";
import ReactDOM from "react-dom";
import PowerController from './powerController';

class MainWindow extends React.Component {
    render() {
        return (
            <PowerController/>
        );
    }
}

ReactDOM.render(
    <MainWindow/>,
    document.getElementById('container')
);