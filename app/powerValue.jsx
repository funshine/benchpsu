import React from 'react';
import classNames from 'classnames';

class PowerValue extends React.Component {
    static propTypes = {
        value: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string,
        size: React.PropTypes.string
    };

    static defaultProps = {
        value: 0.0,
        disabled: false,
        type: 'primary',
        size: 'normal'
    };

    render() {
        const {value, type, size, disabled, plain, className, children, ...others} = this.props;
        const Component = this.props.href ? 'a' : 'button';
        const cls = classNames({
            weui_btn: true,

            weui_btn_primary: type === 'primary' && !plain,
            weui_btn_default: type === 'default' && !plain,
            weui_btn_warn: type === 'warn',

            weui_btn_plain_primary: type === 'primary' && plain,

            weui_btn_plain_default: type === 'default' && plain,

            weui_btn_mini: size === 'small',

            weui_btn_disabled: disabled,

            [className]: className
        });

        return (
            <Component {...others} className={cls}>{value}</Component>
        );
    }
};

export default PowerValue;