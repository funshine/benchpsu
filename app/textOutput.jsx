import React from 'react';
import ReactDOM from "react-dom";
import classNames from 'classnames';
import Radium from 'radium';

@Radium
class TextOutput extends React.Component {
    static propTypes = {
        value: React.PropTypes.string
    };

    static defaultProps = {
        value: ''
    };

    constructor(props) {
        super(props);
    }

    componentWillUpdate() {
        var node = ReactDOM.findDOMNode(this);
        // console.log(node.scrollTop,node.offsetHeight,node.scrollHeight);

        // if it's already at the bottom now, keep scrolling. otherwise, stay where it is.
        this.shouldScrollBottom = (node.scrollTop + node.offsetHeight === node.scrollHeight);
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            var node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        const {value, className, ...others} = this.props;
        const cls = classNames({
            [className]: className
        });
        return (
            <textarea value={value} readOnly={true} {...others} className={cls} style={[styles.base, styles.primary]}>
            </textarea>
        );
    }
};

var styles = {
    base: {
        background: 'rgba(37, 40, 48, 1)',
        borderTopStyle: "none",
        borderRightStyle: "none",
        borderLeftStyle: "none",
        borderBottomStyle: "none",
        color: "#fff",
        overflow: "auto",
        fontSize: "9pt",
        rows: 6,
        cols: 240,
        width: "60vw",
        padding: "20px"
    },
    primary: {
        background: 'rgba(40, 45, 54, 1)'
    }
};

export default TextOutput;