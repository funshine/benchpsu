import React from 'react';
import ReactDOM from "react-dom";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';

class SerialSelect extends React.Component {

    static propTypes = {
        ports: React.PropTypes.object
    };

    static defaultProps = {
        ports: new Set()
    };

    constructor(props) {
        super(props);
        this.state = {
            port: '',
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none'
        }
    }

    componentDidUpdate() {
        this.onUserInput();
    }

    componentWillUnmount() {
    }

    onUserInput() {
        this.props.onUserInput && this.state.port && this.props.onUserInput(
            this.state.port,
            this.state.baudrate,
            this.state.databits,
            this.state.stopbits,
            this.state.parity
        )
    }
    handlePortChange = (event, index, value) => this.setState({ port: value });
    handleBaudrateChange = (event, index, value) => this.setState({ baudrate: value });
    handleDatabitsChange = (event, index, value) => this.setState({ databits: value });
    handleStopbitsChange = (event, index, value) => this.setState({ stopbits: value });
    handleParityChange = (event, index, value) => this.setState({ parity: value });

    getStyles() {
        const styles = {
            base: {
            },
            primary: {
            },
        };
        return styles;
    }
    render() {
        const styles = this.getStyles();
        const {ports, ...others} = this.props;
        if (ports === null) {
            return;
        }
        return (
            <div {...others} style={styles.base}>
                <SelectField
                    fullWidth={true}
                    value={this.state.port}
                    onChange={this.handlePortChange.bind(this) }
                    floatingLabelText="Port"
                    >
                    {
                        Array.from(ports).map((port) => {
                            return (
                                <MenuItem key={port} value={port} primaryText={port} />
                            );
                        })
                    }
                </SelectField>
                <SelectField
                    autoWidth = {true}
                    value={this.state.baudrate}
                    onChange={this.handleBaudrateChange.bind(this) }
                    floatingLabelText="Baudrate"
                    >
                    <MenuItem key={9600} value={9600} primaryText={"9600"} />
                    <MenuItem key={19200} value={19200} primaryText={"19200"} />
                    <MenuItem key={57600} value={57600} primaryText={"57600"} />
                    <MenuItem key={115200} value={115200} primaryText={"115200"} />
                </SelectField>
                <SelectField
                    autoWidth = {true}
                    value={this.state.databits}
                    onChange={this.handleDatabitsChange.bind(this) }
                    floatingLabelText="Data Bits"
                    >
                    <MenuItem key={5} value={5} primaryText={"5"} />
                    <MenuItem key={6} value={6} primaryText={"6"} />
                    <MenuItem key={7} value={7} primaryText={"7"} />
                    <MenuItem key={8} value={8} primaryText={"8"} />
                </SelectField>
                <SelectField
                    autoWidth = {true}
                    value={this.state.stopbits}
                    onChange={this.handleStopbitsChange.bind(this) }
                    floatingLabelText="Stop Bits"
                    >
                    <MenuItem key={1} value={1} primaryText={"1"} />
                    <MenuItem key={2} value={2} primaryText={"2"} />
                </SelectField>
                <SelectField
                    autoWidth = {true}
                    value={this.state.parity}
                    onChange={this.handleParityChange.bind(this) }
                    floatingLabelText="Parity"
                    >
                    <MenuItem key={'none'} value={'none'} primaryText={"none"} />
                    <MenuItem key={'even'} value={'even'} primaryText={"even"} />
                    <MenuItem key={'odd'} value={'odd'} primaryText={"odd"} />
                </SelectField>
            </div>
        );
    }
};

export default muiThemeable()(SerialSelect);