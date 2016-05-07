import React from 'react';
import ReactDOM from "react-dom";
import muiThemeable from 'material-ui/styles/muiThemeable';
import SerialSelect from './serialSelect';

class CommunicationSetup extends React.Component {

    static propTypes = {
        portPower: React.PropTypes.object,
        portMeter: React.PropTypes.object
    };

    static defaultProps = {
        portPower: { port: '/dev/cu.usbmodem183', config: { baudRate: 115200, dataBits: 8, stopBits: 1, parity: "none" } },
        portMeter: null
    };

    constructor(props) {
        super(props);
        this.state = {
            ports: new Set(),
            scanTimer: null
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
    }
    handleUserInput(port, baudrate, databits, stopbits, parity) {
        console.log(port, baudrate, databits, stopbits, parity);
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
                <SerialSelect onUserInput={this.handleUserInput} ports={this.state.ports} />
                <SerialSelect onUserInput={this.handleUserInput} ports={this.state.ports} />
            </div>
        );
    }
};

export default muiThemeable()(CommunicationSetup);