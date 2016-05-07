'use strict';
import React from "react";
import ReactDOM from "react-dom";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DarkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppComponent from './appComponent';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// Note that with the injector, you will probably need to use only onTouchTap (and not onClick anymore).
injectTapEventPlugin();

class MainWindow extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(DarkBaseTheme) }>
                <AppComponent/>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <MainWindow/>,
    document.getElementById('container')
);