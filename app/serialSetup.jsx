import React from 'react';
import ReactDOM from "react-dom";
import classNames from 'classnames';
import Radium from 'radium';

@Radium
class SerialSetup extends React.Component {

    static propTypes = {
        ports: React.PropTypes.object
    };

    static defaultProps = {
        ports: new Set()
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleChange() {
        this.props.onUserInput && this.props.onUserInput(
            this.refs.portSelectInput.value,
            this.refs.baudrateSelectInput.value,
            this.refs.databitsSelectInput.value,
            this.refs.stopbitsSelectInput.value,
            this.refs.paritySelectInput.value
        )
    }

    render() {
        const {className, ports, ...others} = this.props;
        const cls = classNames({
            [className]: className
        });
        if (ports === null) {
            return;
        }
        return (
            <div {...others} className={cls} style={[styles.base, styles.primary]}>
                <form name="port" onChange={this.handleChange.bind(this) }>
                    <label>Port:
                        <select name="port_select" ref="portSelectInput">
                            {Array.from(ports).map((port) => {
                                return (
                                    <option value={port} key={port}>
                                        {port}
                                    </option>
                                );
                            }) }
                        </select>
                    </label>
                </form>
                <form name="config" onChange={this.handleChange.bind(this) } >
                    <label>Baudrate:
                        <select name = "baudrate_select" ref="baudrateSelectInput">
                            <option value={9600}>9600</option>
                            <option value={19200}>19200</option>
                            <option value={57600}>57600</option>
                            <option value={115200}>115200</option>
                        </select>
                    </label>
                    <label>Data Bits:
                        <select name = "databits_select" ref="databitsSelectInput">
                            <option value={8}>8</option>
                            <option value={7}>7</option>
                            <option value={6}>6</option>
                            <option value={5}>5</option>
                        </select>
                    </label>
                    <label>Stop Bits:
                        <select name = "stopbits_select" ref="stopbitsSelectInput">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </label>
                    <label>Parity:
                        <select name = "parity_select" ref="paritySelectInput">
                            <option value="none">none</option>
                            <option value="even">even</option>
                            <option value="odd">odd</option>
                        </select>
                    </label>
                </form>
            </div>
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