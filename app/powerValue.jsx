import React from 'react';
import classNames from 'classnames';
import Radium from 'radium';

@Radium
class PowerValue extends React.Component {
    static propTypes = {
        value: React.PropTypes.number,
        digit_num: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string,
        size: React.PropTypes.string,
        width: React.PropTypes.number
    };

    static defaultProps = {
        value: NaN,
        digit_num: 4,
        disabled: false,
        width: 40,
        type: 'primary',
        size: 'normal'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {value, digit_num, width, type, size, disabled, className, children, ...others} = this.props;
        const cls = classNames({
            [className]: className
        });
        styles.base.width = width;
        return (
            <div {...others} className={cls} style={[
                styles.base,
                styles[type]
            ]} >{isNaN(value)?("O F F"):value.toFixed(digit_num) }</div>
        );
    }
};

var styles = {
    base: {
        display: 'block',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 1)',
        background: 'rgba(47, 201, 145, 1)',
        fontSize: '9vh',
        height: '10vh',
        lineHeight: '10vh',
        width: 40,
        padding: '0px',
        margin: '0px',
        borderRadius: '0.5vw'
    },

    primary: {
        background: 'rgba(47, 201, 145, 1)'
    },

    warn: {
        background: 'rgba(227, 72, 91, 1)'
    }
};

export default PowerValue;