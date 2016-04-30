'use strict';
import React from "react";
import ReactDOM from "react-dom";
import WeUI from 'react-weui';
import 'weui';
import PowerValue from './powerValue';
const {Button, Toast, ActionSheet, ButtonArea} = WeUI;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            showMenus: false,
            timer: null,
            menus: [{
                label: '拍照',
                onClick: () => {
                    alert('点击拍照');
                }
            }, {
                    label: '相册',
                    onClick: () => {
                        alert('点击相册');
                    }
                }],
            actions: [{
                label: '取消',
                onClick: this.hide.bind(this)
            }]
        };
    }
    componentWillUnmount() {
        this.state.timer && clearTimeout(this.state.timer);
    }
    render() {
        return (
            <section style={{ padding: `35px` }}>
                <ButtonArea>
                    <Button type="primary" size="small" onClick={this.showToast.bind(this) }>确认</Button>
                    <Button type="warn" size="small">注意</Button>
                    <Button type="primary" size="small" plain={true}>注意</Button>
                    <Button type="primary" size="small" disabled={true}>注意</Button>
                    <Button type="default" size="small" onClick={this.showMenus.bind(this) }>选择</Button>
                </ButtonArea>
                <PowerValue>6.66</PowerValue>
                <PowerValue>-6.66</PowerValue>
                <PowerValue>6.66</PowerValue>
                <Toast show={this.state.showToast}>loading...</Toast>
                <ActionSheet show={this.state.showMenus} menus={this.state.menus} actions={this.state.actions} onRequestClose={this.hide.bind(this) } />
            </section>
        );
    }
    showToast() {
        this.setState({ showToast: true });
        this.state.timer = setTimeout(() => {
            this.setState({ showToast: false });
        }, 3000);
    }
    showMenus() {
        this.setState({ showMenus: true });
    }

    hide() {
        this.setState({ showMenus: false });
    }
}

class MainWindow extends React.Component {
    render() {
        return (
            <App />
        );
    }
}

ReactDOM.render(
    <MainWindow/>,
    document.getElementById('container')
);