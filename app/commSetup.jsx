import React from 'react';
import ReactDOM from "react-dom";
import muiThemeable from 'material-ui/styles/muiThemeable';
import SerialSelect from './serialSelect';
import TextOutput from './textOutput';

class CommunicationSetup extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            ports: new Set(),
            scanTimer: null,
            portMeter: null,
            portMeterRead: "",
            portPower: null,
            portPowerRead: ""
        };
    }

    portChanged(prev, current) {
        if (prev.size !== current.size) return true;
        for (var port of prev) if (!current.has(port)) return true;
        return false;
    }

    componentDidMount() {
        var serialport = window.require("serialport");
        serialport.list(
            (err, ports) => {
                var portSet = new Set();
                ports.forEach((port) => {
                    // console.log(port.comName);
                    // console.log(port.pnpId);
                    // console.log(port.manufacturer);
                    portSet.add(port.comName);
                });
                if (this.portChanged(this.state.ports, portSet)) {
                    this.setState({
                        ports: portSet
                    });
                }
            });
        this.state.scanTimer = setInterval(() => {
            this.scanSerial(serialport);
        }, 2000);
    }

    /**
     * Checks for changes after initial scan.
     */
    scanSerial(serial) {
        serial.list(
            (err, ports) => {
                var portSet = new Set();
                ports.forEach((port) => {
                    // console.log(port.comName);
                    // console.log(port.pnpId);
                    // console.log(port.manufacturer);
                    portSet.add(port.comName);
                });
                // console.log("==>", this.state.ports, "<==");
                if (this.portChanged(this.state.ports, portSet)) {
                    this.setState({
                        ports: portSet
                    });
                    // console.log("changed");
                }
            }
        );
    }

    componentWillUnmount() {
        this.state.scanTimer && clearInterval(this.state.scanTimer);
        this.state.portPower && this.state.portPower.isOpen() && this.state.portPower.close();
        this.state.portMeter && this.state.portMeter.isOpen() && this.state.portMeter.close();
        console.log("componentWillUnmount");
    }

    handlePortPowerChanged(port, baudrate, databits, stopbits, parity) {
        console.log("Port Power", port, baudrate, databits, stopbits, parity);
        this.state.portPower && this.state.portPower.isOpen() && this.state.portPower.close();
        var serialport = window.require("serialport");
        var SerialPort = serialport.SerialPort;
        var ptPower = new SerialPort(port, {
            parser: serialport.parsers.raw
        }, false);
        this.state.portPower = ptPower;
        
        ptPower.open((err) => {
            if (err) {
                return console.log('Error opening serial port: ', err.message);
            }
            ptPower.on('data', (data) => {
                console.log(data);
                console.log(data.toString('hex'));
                this.setState({
                    portPowerRead: this.state.portPowerRead + data.toString('utf8')
                });
            });
            let buffer = new Buffer(4);
            buffer[0] = 250;
            buffer[1] = 251;
            buffer[2] = 2;
            buffer[3] = 3;
            this.state.portPower.write(buffer);
        });
    }

    handlePortMeterChanged(port, baudrate, databits, stopbits, parity) {
        console.log("Port Meter", port, baudrate, databits, stopbits, parity);
        this.state.portMeter && this.state.portMeter.isOpen() && this.state.portMeter.close();
        var serialport = window.require("serialport");
        var SerialPort = serialport.SerialPort;
        var ptMeter = new SerialPort(port, {
            parser: serialport.parsers.readline('\n')
        }, false);
        this.state.portMeter = ptMeter;
        
        ptMeter.open((err) => {
            if (err) {
                return console.log('Error opening serial port: ', err.message);
            }
            ptMeter.on('data', (data) => {
                console.log(data);
                this.setState({
                    portMeterRead: this.state.portMeterRead + "\n" + data
                });
            });
        });
    }

    getStyles() {
        const styles = {
            base: {
                padding: '32px',
            },
        };
        return styles;
    }
    render() {
        const styles = this.getStyles();
        const {  ...others } = this.props;
        return (
            <div {...others} style={styles.base}>
                <SerialSelect {...others} onUserInput={this.handlePortPowerChanged.bind(this) } ports={this.state.ports} />
                <TextOutput {...others} value={this.state.portPowerRead}></TextOutput>
                <SerialSelect {...others} onUserInput={this.handlePortMeterChanged.bind(this) } ports={this.state.ports} />
                <TextOutput {...others} value={this.state.portMeterRead}></TextOutput>
            </div>
        );
    }
};

export default muiThemeable()(CommunicationSetup);