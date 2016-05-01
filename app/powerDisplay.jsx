import React from 'react';
import classNames from 'classnames';
import Radium from 'radium';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import PowerValue from './powerValue';

@Radium
class PowerDisplay extends React.Component {
    static propTypes = {
        data: React.PropTypes.array,
        digit_num: React.PropTypes.number,
        sparklineDisabled: React.PropTypes.bool,
        sparklineLimit: React.PropTypes.number,
        width: React.PropTypes.number,
        type: React.PropTypes.string,
        size: React.PropTypes.string
    };

    static defaultProps = {
        data: [],
        digit_num: 4,
        sparklineDisabled: false,
        sparklineLimit: 10,
        width: 200,
        type: 'primary',
        size: 'normal'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { data, sparklineLimit, sparklineDisabled, width, margin } = this.props;
        //if (data.length === 0) return null;
        return (
            <div style={[styles.base]}>
                <PowerValue value={data.length===0?NaN:data[data.length - 1]} width={width}>value</PowerValue>
                {sparklineDisabled ? null : (
                    <Sparklines data={sparklineDisabled ? null : data} limit={sparklineLimit} width={width} margin={margin}>
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