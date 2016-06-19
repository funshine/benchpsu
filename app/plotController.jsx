import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Dygraph from 'react-dygraphs';
import util from 'util';

class PlotController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnackbar: false,
            zoom: null,
            clicked: null,
            displayName: "DygraphDemo",
            repeatTimer: null,
            dataLables: ["Seconds", "PV", "NV"],
            dataIndex: 1,
            data: [[1, 0.5, -0.5]],
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        this.state.repeatTimer && clearInterval(this.state.repeatTimer);
    }

    handleZoom = (min, max, yranges) => this.setState({
        zoom: { min, max, yranges },
        openSnackbar: true,
    });
    handlePointClick = (e, point) => this.setState({ clicked: point.idx });
    handleRequestClose = () => this.setState({ openSnackbar: false, });

    getStyles() {
        const styles = {
            base: {
                padding: '30px'
            },
            button: {
                margin: 12
            },
            dygraphs: {
                color: 'rgba(0, 0, 0, 1)',
            },
        };
        return styles;
    }

    render() {
        const styles = this.getStyles();
        const {  ...others } = this.props;
        return (
            <Paper {...others} style={styles.base}>
                <RaisedButton style={styles.button} primary={true} disabled={this.state.startButtonDisabled} onTouchTap={this.startRepeatTimer.bind(this) }>开始</RaisedButton>
                <RaisedButton style={styles.button} secondary={true} disabled={this.state.stopButtonDisabled} onTouchTap={this.stopRepeatTimer.bind(this) }>停止</RaisedButton>
                <RaisedButton style={styles.button} secondary={true} onTouchTap={this.clearPowerValue.bind(this) }>清除</RaisedButton>
                <Dygraph style={styles.dygraphs}
                    data={this.state.data}
                    onPointClick={this.handlePointClick}
                    onZoom={this.handleZoom}
                    strokeWidth={1}
                    labels={this.state.dataLables}
                    width={document.documentElement.clientWidth - 100}
                    showRangeSelector={true}
                    />
                <Dygraph style={styles.dygraphs}
                    data={this.state.data}
                    onPointClick={this.handlePointClick}
                    onZoom={this.handleZoom}
                    strokeWidth={1}
                    labels={this.state.dataLables}
                    width={document.documentElement.clientWidth - 100}
                    showRangeSelector={true}
                    />
                <Snackbar {...others}
                    open={this.state.openSnackbar}
                    message={this.state.zoom ? util.inspect(this.state.zoom) : "zoom"}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                    />
                <RaisedButton style={styles.button} primary={true} >{this.state.dataIndex}</RaisedButton>
                <RaisedButton style={styles.button} primary={true} >{this.state.clicked ? this.state.clicked : "index"}</RaisedButton>
            </Paper>
        );
    }
    startRepeatTimer() {
        if (this.state.startButtonDisabled) {
            return;
        }
        for (let i = 0; i < 10000; i++) {
            this.state.dataIndex++;
            this.state.data.push([this.state.dataIndex, Math.random(), -1 + Math.random()]);
        }

        this.state.repeatTimer = setInterval(() => {
            let index = this.state.dataIndex;
            index++;
            let newValue1 = Math.random();
            let newValue2 = Math.random();
            this.state.data.push([index, newValue1, -1 + newValue2]);
            this.setState({
                dataIndex: index,
                // data: this.state.data.concat([[index, newValue1, -1 + newValue2]]),
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
            dataIndex: 1,
            data: [[1, 0.5, -0.5]],
        });
    }
    clearPowerValue() {
        this.setState({
            dataIndex: 1,
            data: [[1, 0.5, -0.5]],
        });
    }
}

export default muiThemeable()(PlotController);