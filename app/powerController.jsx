import React from 'react';
import classNames from 'classnames';
import Radium from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import PowerDisplay from './powerDisplay';
import TextOutput from './textOutput';

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
            ni: [],
            serialRead: "serial"
        };
    }
    componentDidMount() {
        var serialport = window.require("serialport");
        var SerialPort = serialport.SerialPort;
        var port = new SerialPort('/dev/cu.usbmodem183', {
            parser: serialport.parsers.readline('\n')
        }, false);

        var pComponent = this;
        port.open(function (err) {
            if (err) {
                return console.log('Error opening serial port: ', err.message);
            }
            port.on('data', function (data) {
                console.log(data);
                pComponent.setState({
                    serialRead: pComponent.state.serialRead + "\\\n" + data
                });
            });
        });
    }
    componentWillUnmount() {
        this.state.repeatTimer && clearInterval(this.state.repeatTimer);
        port.close();
    }
    render() {
        return (
            <div style={[styles.base]}>
                <RaisedButton style={styles.button} primary={true} disabled={this.state.startButtonDisabled} onTouchTap={this.startRepeatTimer.bind(this) }>开始</RaisedButton>
                <RaisedButton style={styles.button} secondary={true} disabled={this.state.stopButtonDisabled} onTouchTap={this.stopRepeatTimer.bind(this) }>停止</RaisedButton>
                <RaisedButton style={styles.button} secondary={true} onTouchTap={this.clearPowerValue.bind(this) }>清除</RaisedButton>
                <RaisedButton style={styles.button} primary={true} onTouchTap={this.showSparkline.bind(this) }>{this.state.sparklineButtonValue}</RaisedButton>
                <TextOutput value={this.state.serialRead}></TextOutput>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <PowerDisplay channel={1} name={"正电压"} errorMsg={"过压"} sparklineDisabled = {this.state.sparklineDisabled} data={this.state.pv}> </PowerDisplay>
                            </td>
                            <td>
                                <PowerDisplay channel={1} name={"正电流"} errorMsg={"过流"} sparklineDisabled = {this.state.sparklineDisabled} data={this.state.pi}> </PowerDisplay>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <PowerDisplay channel={1} name={"负电压"} sparklineDisabled = {this.state.sparklineDisabled} data={this.state.nv}> </PowerDisplay>
                            </td>
                            <td>
                                <PowerDisplay channel={1} name={"负电流"} sparklineDisabled = {this.state.sparklineDisabled} data={this.state.ni}> </PowerDisplay>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <PowerDisplay channel={2} name={"电压"} sparklineDisabled = {this.state.sparklineDisabled} data={this.state.nv}> </PowerDisplay>
                            </td>
                            <td>
                                <PowerDisplay channel={2} name={"电流"} sparklineDisabled = {this.state.sparklineDisabled} data={this.state.ni}> </PowerDisplay>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
        padding: '30px'
    },
    button: {
        margin: 12
    }
};

export default PowerController;