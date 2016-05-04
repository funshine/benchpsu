'use strict';
import React from "react";
import ReactDOM from "react-dom";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DarkRawTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppComponent from './appComponent';

class MainWindow extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(DarkRawTheme) }>
                <AppComponent/>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <MainWindow/>,
    document.getElementById('container')
);