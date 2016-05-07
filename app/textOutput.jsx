import React from 'react';
import ReactDOM from "react-dom";
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';

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

    getStyles() {
        const styles = {
            textarea: {
                color: "#303030",
                padding: "20px",
            },
        };
        return styles;
    }
    render() {
        const {value, ...others} = this.props;
        const styles = this.getStyles();
        return (
            <TextField
                {...others}
                style={styles.textarea}
                floatingLabelText="Serial Output"
                multiLine={true}
                fullWidth={true}
                underlineShow={false}
                rows={5}
                rowsMax={5}
                readOnly={true}
                value={value}
                />
        );
    }
};

export default muiThemeable()(TextOutput);