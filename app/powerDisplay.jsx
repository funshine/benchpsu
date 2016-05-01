import React from 'react';
import classNames from 'classnames';
import Radium from 'radium';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import PowerValue from './powerValue';

@Radium
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

    render() {
        const { data, sparklineLimit, sparklineDisabled, width, margin, ...others } = this.props;
        //if (data.length === 0) return null;
        var sparklineWidth = Number(width.slice(0, -2)) * document.documentElement.clientWidth / 100;
        var sparklineHeight = sparklineWidth * 0.33;
        return (
            <div style={[styles.base]}>
                <PowerValue {...others} value={data.length === 0 ? NaN : data[data.length - 1]} width={width}>value</PowerValue>
                {sparklineDisabled ? null : (
                    <Sparklines data={sparklineDisabled ? null : data} limit={sparklineLimit} width={sparklineWidth} height={sparklineHeight} margin={2}>
                        <SparklinesLine color="#56b45d" style={{ strokeWidth: 1, stroke: "#336aff", fill: "#56b45d" }} />
                        <SparklinesSpots size={2}
                            style={{ stroke: "#56b45d", strokeWidth: 1, fill: "#56b45d" }} />
                        <SparklinesReferenceLine style={{ stroke: "#56b400" }} type="mean" />
                    </Sparklines>
                ) }
            </div>
        );
    }
}

var styles = {
    base: {
        display: 'block',
        background: 'rgba(37, 40, 48, 1)',
        padding: '10px'
    }
};

export default PowerDisplay;