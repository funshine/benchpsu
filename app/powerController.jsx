import React from 'react';
import classNames from 'classnames';
import Radium from 'radium';
import WeUI from 'react-weui';
import 'weui';
import PowerDisplay from './powerDisplay';

const {Button, Toast, ActionSheet, ButtonArea, Input} = WeUI;

@Radium
class PowerController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repeatTimer: null,
            startButtonDisabled: false,
            stopButtonDisabled: true,
            sparklineDisabled: false,
            sparklineButtonValue: "隐藏图形",
            pv: [],
            pi: [],
            nv: [],
            ni: []
        };
    }
    componentWillUnmount() {
        this.state.repeatTimer && clearInterval(this.state.repeatTimer);
    }
    render() {
        return (
            <section style={[styles.base]}>
                <ButtonArea>
                    <Button type="primary" disabled={this.state.startButtonDisabled} size="small" onClick={this.startRepeatTimer.bind(this) }>开始</Button>
                    <Button type="warn" size="small" disabled={this.state.stopButtonDisabled} onClick={this.stopRepeatTimer.bind(this) }>停止</Button>
                    <Button type="warn" size="small" onClick={this.clearPowerValue.bind(this) }>清除</Button>
                    <Button type="primary" size="small" onClick={this.showSparkline.bind(this) }>{this.state.sparklineButtonValue}</Button>
                </ButtonArea>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <PowerDisplay sparklineDisabled = {this.state.sparklineDisabled} data={this.state.pv}> </PowerDisplay>
                            </td>
                            <td>
                                <PowerDisplay sparklineDisabled = {this.state.sparklineDisabled} data={this.state.pi}> </PowerDisplay>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <PowerDisplay sparklineDisabled = {this.state.sparklineDisabled} data={this.state.nv}> </PowerDisplay>
                            </td>
                            <td>
                                <PowerDisplay sparklineDisabled = {this.state.sparklineDisabled} data={this.state.ni}> </PowerDisplay>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <PowerDisplay sparklineDisabled = {this.state.sparklineDisabled} data={this.state.nv}> </PowerDisplay>
                            </td>
                            <td>
                                <PowerDisplay sparklineDisabled = {this.state.sparklineDisabled} data={this.state.ni}> </PowerDisplay>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        );
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
        this.setState({ 
            startButtonDisabled: false, 
            stopButtonDisabled: true,
            pv: [],
            pi: [],
            nv: [],
            ni: [] 
        });
    }
    clearPowerValue() {
        this.setState({
            pv: this.state.pv.slice(-1),
            pi: this.state.pi.slice(-1),
            nv: this.state.nv.slice(-1),
            ni: this.state.ni.slice(-1)
        });
    }
    showSparkline() {
        if (this.state.sparklineDisabled) {
            this.setState({ sparklineDisabled: false, sparklineButtonValue: "隐藏图形" });
        } else {
            this.setState({ sparklineDisabled: true, sparklineButtonValue: "显示图形" });
        }
    }
}

var styles = {
    base: {
        background: 'rgba(37, 40, 48, 1)',
        padding: '30px'
    }
};

export default PowerController;