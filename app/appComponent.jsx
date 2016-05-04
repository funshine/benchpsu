'use strict';
import React from "react";
import ReactDOM from "react-dom";
import classNames from 'classnames';
import Radium from 'radium';
import PowerController from './powerController';
import CommSetup from './commSetup';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

@Radium
class AppComponent extends React.Component {
    render() {
        return (
            <div style={[styles.base, styles.primary]}>
                <AppBar title="BenchPSU" />
                <RaisedButton label="Default" />
                <RaisedButton label="确认" />
                <RaisedButton label="取消" />
                <section>
                    <PowerController/>
                    <CommSetup/>
                </section>
            </div>
        );
    }
}

var styles = {
    base: {
        background: 'rgba(48, 48, 48, 1)'
    },
    primary: {
        background: 'rgba(48, 48, 48, 1)'
    }
};

export default AppComponent;