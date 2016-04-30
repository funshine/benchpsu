'use strict';
import React from "react";
import ReactDOM from "react-dom";
import WeUI from 'react-weui';
import 'weui';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import PowerValue from './powerValue';
var update = require('react-addons-update');
const {Button, Toast, ActionSheet, ButtonArea, Input} = WeUI;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            showMenus: false,
            timer: null,
            repeatTimer: null,
            startButtonDisabled: false,
            stopButtonDisabled: true,
            pv: [],
            pi: [],
            nv: [],
            ni: [],
            value: 0.0,
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
                    <Button type="primary" disabled={this.state.startButtonDisabled} size="small" onClick={this.startRepeatTimer.bind(this) }>开始</Button>
                    <Button type="warn" size="small" disabled={this.state.stopButtonDisabled} onClick={this.stopRepeatTimer.bind(this) }>停止</Button>
                    <Button type="warn" size="small" onClick={this.clearPowerValue.bind(this) }>清除</Button>
                </ButtonArea>
                <ButtonArea>
                    <Button type="primary" size="small" onClick={this.showToast.bind(this) }>确认</Button>
                    <Button type="warn" size="small">注意</Button>
                    <Button type="primary" size="small" plain={true}>注意</Button>
                    <Button type="primary" size="small" disabled={true}>注意</Button>
                    <Button type="default" size="small" onClick={this.showMenus.bind(this) }>选择</Button>
                </ButtonArea>
                <PowerValue value={this.state.value}>6.66</PowerValue>
                <PowerValue value={this.state.pv[this.state.pv.length - 1]}>pv</PowerValue>

                <Sparklines data={this.state.pv} limit={200} width={200} height={100} margin={10}>
                    <SparklinesLine color="#56b45d" style={{ strokeWidth: 1, stroke: "#336aff", fill: "#56b45d" }} />
                    <SparklinesSpots size={2}
                        style={{ stroke: "#56b45d", strokeWidth: 1, fill: "#56b45d" }} />
                    <SparklinesReferenceLine style={{ stroke: "#56b400" }} type="mean" />
                </Sparklines>

                <PowerValue type="warn" value={this.state.pi[this.state.pi.length - 1]}>pi</PowerValue>
                <PowerValue value={this.state.nv[this.state.nv.length - 1]}>nv</PowerValue>
                <PowerValue value={this.state.ni[this.state.ni.length - 1]}>ni</PowerValue>
                <Input type="number" placeholder="请输入电压值" onChange={this.changeValue.bind(this) }/>
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

    changeValue(e) {
        this.setState({ value: Number(e.target.value) });
    }
    startRepeatTimer() {
        if (this.state.startButtonDisabled) {
            return;
        }
        this.state.repeatTimer = setInterval(() => {
            var newValue = Math.random() * 0.01;
            this.setState({
                pv: this.state.pv.concat([5.095 + newValue]),
                pi: this.state.pi.concat([1.495 + newValue]),
                nv: this.state.nv.concat([-5.095 - newValue]),
                ni: this.state.ni.concat([-0.495 - newValue])
            });
        }, 1000);
        this.setState({ startButtonDisabled: true, stopButtonDisabled: false });
    }
    stopRepeatTimer() {
        if (this.state.stopButtonDisabled) {
            return;
        }
        clearInterval(this.state.repeatTimer);
        this.setState({ startButtonDisabled: false, stopButtonDisabled: true });
    }
    clearPowerValue() {
        this.setState({ pv: [0], pi: [0], nv: [0], ni: [0] });
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