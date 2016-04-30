import React from 'react';
import classNames from 'classnames';
var Radium = require('radium');

@Radium
class PowerValue extends React.Component {
    static propTypes = {
        value: React.PropTypes.number,
        digit_num: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string,
        size: React.PropTypes.string
    };

    static defaultProps = {
        value: 0.0,
        digit_num: 4,
        disabled: false,
        type: 'primary',
        size: 'normal'
    };

    render() {
        const {value, digit_num, type, size, disabled, plain, className, children, ...others} = this.props;
        const cls = classNames({
            [className]: className
        });

        return (
            <div {...others} className={cls} style={[
                styles.base,
                styles[type]
            ]} >{value.toFixed(digit_num) }</div>
        );
    }
};

// You can create your style objects dynamically or share them for
// every instance of the component.
var styles = {
    base: {
        display: 'block',
        textAlign: 'center',
        color: '#fff',
        background: '#56b45d',
        fontSize: '9vh',
        height: '10vh',
        lineHeight: '10vh',
        width: '40vw',
        padding: '0px',
        margin: '1vh',
        borderRadius: '1vw'
    },

    primary: {
        background: '#56b45d'
    },

    warn: {
        background: '#FF4136'
    }
};

export default PowerValue;