import React from 'react';
import classNames from 'classnames';
import Radium from 'radium';

@Radium
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

    render() {
        const {value, digitNum, channel, name, errorMsg, width, type, size, disabled, className, ...others} = this.props;
        const cls = classNames({
            [className]: className
        });
        var pxHeight = 0.33 * Number(width.slice(0, -2)) * document.documentElement.clientWidth / 100;
        styles.base.width = width;
        styles.base.height = pxHeight;
        styles.base.fontSize = pxHeight > 40 ? pxHeight - 20 : pxHeight > 20 ? pxHeight - 10 : 10;
        styles.base.lineHeight = pxHeight.toFixed(0) + 'px';

        styles.head.width = pxHeight; // one third
        styles.head.height = pxHeight / 3;
        styles.head.fontSize = pxHeight / 3 - 5;
        styles.head.lineHeight = (pxHeight / 3).toFixed(0) + 'px';

        return (
            <div>
                <div {...others} className={cls} style={[styles.head, styles.channel]}>{channel}</div>
                <div {...others} className={cls} style={[styles.head, styles.name]}>{name}</div>
                {this.props.errorMsg === null ? null : (
                    <div {...others} className={cls} style={[styles.head, styles.error]}>{errorMsg}</div>
                ) }
                <div {...others} className={cls} style={[styles.base, styles[type]]} >
                    {isNaN(value) ? ("O F F") : value.toFixed(digitNum) }
                </div>
            </div>
        );
    }
};

var styles = {
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

    primary: {
        background: 'rgba(47, 201, 145, 1)'
    },

    warn: {
        background: 'rgba(227, 72, 91, 1)'
    }
};

export default PowerValue;