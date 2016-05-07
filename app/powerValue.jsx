import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class PowerValue extends React.Component {
    static propTypes = {
        value: React.PropTypes.number,
        digitNum: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        channel: React.PropTypes.number,
        name: React.PropTypes.string,
        errorMsg: React.PropTypes.string,
        type: React.PropTypes.string,
        size: React.PropTypes.string,
        width: React.PropTypes.string
    };

    static defaultProps = {
        value: NaN,
        digitNum: 4,
        disabled: false,
        channel: 0,
        name: 'name',
        errorMsg: null,
        width: '20vw',
        type: 'primary',
        size: 'normal'
    };

    constructor(props) {
        super(props);
    }

    getStyles(width) {
        const styles = {
            base: {
                display: 'block',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 1)',
                background: 'rgba(47, 201, 145, 1)',
                fontSize: 5,
                height: 15,
                lineHeight: '15px',
                width: '20vw',
                padding: '0px',
                margin: '0px',
                borderRadius: '0.5vw'
            },

            head: {
                display: 'inline',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 1)',
                background: 'rgba(47, 201, 145, 1)',
                fontSize: 10,
                height: 10,
                lineHeight: '10px',
                width: '30',
                paddingLeft: '3px',
                paddingRight: '3px',
                marginRight: '2px',
                borderRadius: '2px'
            },

            channel: {
                background: 'rgba(244, 147, 66, 1)'
            },

            name: {
                background: 'rgba(47, 168, 218, 1)'
            },

            error: {
                background: 'rgba(239, 79, 79, 1)'
            },
        };
        var pxHeight = Number(width.slice(0, -2)) * document.documentElement.clientWidth / (100 * 3);
        pxHeight = pxHeight.toFixed(0);
        styles.base.width = width;
        styles.base.height = pxHeight + 'px';
        styles.base.fontSize = pxHeight > 40 ? pxHeight - 20 : pxHeight > 20 ? pxHeight - 10 : 10;
        styles.base.lineHeight = pxHeight + 'px';

        styles.head.width = pxHeight + 'px'; // one third
        pxHeight = (pxHeight / 3).toFixed(0);
        styles.head.height = pxHeight + 'px';
        styles.head.fontSize = pxHeight - 5;
        styles.head.lineHeight = pxHeight + 'px';
        return styles;
    }
    render() {
        const {value, digitNum, channel, name, errorMsg, width, size, disabled, ...others} = this.props;
        const styles = this.getStyles(width);
        return (
            <div {...others}>
                <div style={Object.assign({}, styles.head, styles.channel) }>{channel}</div>
                <div style={Object.assign({}, styles.head, styles.name) }>{name}</div>
                {errorMsg === null ? null : (
                    <div style={Object.assign({}, styles.head, styles.error) }>{errorMsg}</div>
                ) }
                <div style={styles.base} >
                    {isNaN(value) ? ("O F F") : value.toFixed(digitNum) }
                </div>
            </div>
        );
    }
};

export default muiThemeable()(PowerValue);