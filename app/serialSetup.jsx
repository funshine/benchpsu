import React from 'react';
import ReactDOM from "react-dom";
import classNames from 'classnames';
import Radium from 'radium';

@Radium
class SerialSetup extends React.Component {

    static propTypes = {
        portPower: React.PropTypes.object
    };

    static defaultProps = {
        portPower: { port: '/dev/cu.usbmodem183', config: { baudRate: 115200, dataBits: 8, stopBits: 1, parity: "none" } }
    };

    constructor(props) {
        super(props);
        this.state = {
            ports: new Set("select"),
            scanTimer: null
        };
    }

    componentDidMount() {
        var serialport = window.require("serialport");
        let pParent = this;
        serialport.list(
            (err, ports) => {
                var portSet = new Set();
                ports.forEach(function (port) {
                    console.log(port.comName);
                    // console.log(port.pnpId);
                    // console.log(port.manufacturer);
                    portSet.add(port.comName);
                });
                pParent.setState({
                    ports: portSet
                });
            });
        this.state.scanTimer = setInterval(() => {
            pParent.scanSerial(serialport, pParent);
        }, 2000);
    }

    /**
     * Checks for changes after initial scan.
     */
    scanSerial(serial, pParent) {
        serial.list(
            (err, ports) => {
                var portSet = new Set();
                ports.forEach((port) => {
                    console.log(port.comName);
                    // console.log(port.pnpId);
                    // console.log(port.manufacturer);
                    portSet.add(port.comName);
                });
                pParent.setState({
                    ports: portSet
                });
                console.log("==>", pParent.state.ports, "<==");
            }
        );
    }

    componentWillUnmount() {
        this.state.scanTimer && clearInterval(this.state.scanTimer);
    }

    render() {
        const {className, ...others} = this.props;
        const cls = classNames({
            [className]: className
        });
        return (
            // <div {...others} className={cls} style={[styles.base, styles.primary]}>
            <select name="serial_select">
                {Array.from(this.state.ports).map((port) => {
                    return (
                        <option>
                            {port}
                        </option>
                    );
                }) }
            </select>
            // </div>
        );
    }
};

var styles = {
    base: {
        background: 'rgba(37, 40, 48, 1)',
        width: "60vw",
        padding: "20px"
    },
    primary: {
        background: 'rgba(40, 45, 54, 1)'
    }
};

export default SerialSetup;