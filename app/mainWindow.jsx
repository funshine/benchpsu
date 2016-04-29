'use strict';
import React from "react";
import ReactDOM from "react-dom";
import WeUI from 'react-weui';
import 'weui';
const {Button} = WeUI;

var App = React.createClass({
    render() {
        return (
            <Button>hello wechat</Button>
        );
    }
});

var MainWindow = React.createClass({
    getInitialState: function () {
        return {
            message: '',
        };
    },
    handleTextChange: function (event) {
        this.setState({ message: event.target.value });
    },
    render: function () {
        return (
            <App />
        );
    }
});

ReactDOM.render(
    <MainWindow/>,
    document.getElementById('content')
);