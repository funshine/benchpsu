'use strict';
import React from "react";
import ReactDOM from "react-dom";
import PowerController from './powerController';
import CommSetup from './commSetup';

class MainWindow extends React.Component {
    render() {
        return (
            <sectrion>
                <PowerController/>
                <CommSetup/>
            </sectrion>
        );
    }
}

ReactDOM.render(
    <MainWindow/>,
    document.getElementById('container')
);