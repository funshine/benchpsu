import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import PowerValue from './powerValue';

class PowerDisplay extends React.Component {
    static propTypes = {
        data: React.PropTypes.array,
        sparklineDisabled: React.PropTypes.bool,
        sparklineLimit: React.PropTypes.number,
        width: React.PropTypes.string,
        type: React.PropTypes.string,
        size: React.PropTypes.string
    };

    static defaultProps = {
        data: [],
        sparklineDisabled: false,
        sparklineLimit: 10,
        width: '30vw',
        type: 'primary',
        size: 'normal'
    };

    constructor(props) {
        super(props);
    }

    getStyles() {
        const styles = {
            base: {
                padding: '10px'
            },
        };
        return styles;
    }
    render() {
        const styles = this.getStyles();
        const { data, sparklineLimit, sparklineDisabled, width, margin, ...others } = this.props;
        //if (data.length === 0) return null;
        var sparklineWidth = Number(width.slice(0, -2)) * document.documentElement.clientWidth / 100;
        var sparklineHeight = sparklineWidth * 0.33;
        return (
            <div {...others} style={styles.base}>
                <PowerValue {...others} value={data.length === 0 ? NaN : data[data.length - 1]} width={width}>value</PowerValue>
                {sparklineDisabled ? null : (
                    <Sparklines data={sparklineDisabled ? null : data} limit={sparklineLimit} width={sparklineWidth} height={sparklineHeight} margin={2}>
                        <SparklinesLine color="#00bcd4" style={{ strokeWidth: 1, stroke: "#336aff", fill: "#00bcd4" }} />
                        <SparklinesSpots size={2}
                            style={{ stroke: "#00bcd4", strokeWidth: 1, fill: "#00bcd4" }} />
                        <SparklinesReferenceLine style={{ stroke: "#00bcd4" }} type="mean" />
                    </Sparklines>
                ) }
            </div>
        );
    }
}

export default muiThemeable()(PowerDisplay);