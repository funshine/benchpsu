'use strict';
import React from "react";
import ReactDOM from "react-dom";
import PowerController from './powerController';
import PlotController from './plotController';
import CommSetup from './commSetup';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem'
import SvgIcon from 'material-ui/SvgIcon';
import ActionMonitor from 'material-ui/svg-icons/action/visibility';
import ActionSetting from 'material-ui/svg-icons/action/settings';
import ActionCali from 'material-ui/svg-icons/action/build';
import ActionTimeLine from 'material-ui/svg-icons/action/timeline';
import ActionHelp from 'material-ui/svg-icons/action/help';
import RaisedButton from 'material-ui/RaisedButton';
import Tabs from 'material-ui/Tabs'
import Tab from 'material-ui/Tabs/Tab'
import SelectField from 'material-ui/SelectField';
import muiThemeable from 'material-ui/styles/muiThemeable';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'monitor',
            helpDialogOpen: false
        };
    }
    handleCloseHelpDialog = () => this.setState({ helpDialogOpen: false });
    handleOpenHelpDialog = () => this.setState({ helpDialogOpen: true });
    changeToMonitor = () => this.setState({ value: "monitor" });
    changeToSetup = () => this.setState({ value: "setup" });
    changeToCalibration = () => this.setState({ value: "calibration" });
    changeToPlot = () => this.setState({ value: "plot" });
    handleChange = (value) => this.setState({ value: value });
    handleCose = () => {
        var remote = require('remote');
        var window = remote.getCurrentWindow();
        window.close();
    };

    getStyles() {
        const canvasColor = this.props.muiTheme.baseTheme.palette.canvasColor;
        const styles = {
            paperContainer: {
                backgroundColor: canvasColor,
                overflow: 'hidden',
            },
        };
        return styles;
    }

    render() {
        const styles = this.getStyles();
        const {  ...others } = this.props;
        const helpDialogActions = [
            <RaisedButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleCloseHelpDialog}
                />
        ];
        return (
            <Paper {...others} style={styles.paperContainer}>
                <AppBar
                    title="BenchPSU"
                    iconElementLeft={
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
                            <MenuItem primaryText="监控" leftIcon={ <ActionMonitor/> } onTouchTap={this.changeToMonitor}/>
                            <MenuItem primaryText="设置" leftIcon={ <ActionSetting/> } onTouchTap={this.changeToSetup}/>
                            <MenuItem primaryText="校准" leftIcon={ <ActionCali/> } onTouchTap={this.changeToCalibration}/>
                            <MenuItem primaryText="图形" leftIcon={ <ActionTimeLine/> } onTouchTap={this.changeToPlot}/>
                            <MenuItem primaryText="帮助" leftIcon={ <ActionHelp/> } onTouchTap={this.handleOpenHelpDialog}/>
                        </IconMenu>
                    }
                    iconElementRight={<IconButton onTouchTap={this.handleCose}><NavigationClose /></IconButton>}
                    />

                <Tabs value={this.state.value} onChange={this.handleChange}>
                    <Tab label="监控" value="monitor">
                        <PowerController/>
                    </Tab>
                    <Tab label="设置" value="setup">
                        <CommSetup />
                    </Tab>
                    <Tab label="校准" value="calibration">
                        <div>
                            <RaisedButton label="确认" />
                            <RaisedButton label="取消" />
                        </div>
                    </Tab>
                    <Tab label="图形" value="plot">
                        <PlotController/>
                    </Tab>
                </Tabs>

                <Dialog
                    title="BenchPSU V1.0"
                    actions={helpDialogActions}
                    modal={false}
                    open={this.state.helpDialogOpen}
                    onRequestClose={this.handleCloseHelpDialog}
                    >
                    BenchPSU 高精度电源控制软件。
                </Dialog>
            </Paper>
        );
    }
}

AppComponent.propTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default muiThemeable()(AppComponent);