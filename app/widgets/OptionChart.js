import React, { useContext, useRef, useState } from 'react';
import {
    PanResponder,
    View,
    Dimensions
} from 'react-native';
import { AreaChart } from 'react-native-svg-charts';
import {
    Circle,
    Defs,
    G,
    Line,
    LinearGradient,
    Rect,
    Stop,
    Text as SvgText,
} from 'react-native-svg';
import color from '../color';
import { OptionCalculator } from '../functions/optionCalculator'

const OptionChart = () => {
    try {
        const { range, returns } = useContext(OptionCalculator)
        const windowWidth = Dimensions.get('window').width;
        const size = useRef(range.length);
        const [positionX, setPositionX] = useState(10);// The currently selected X coordinate position
        const panResponder = useRef(
            PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
                onMoveShouldSetPanResponder: (evt, gestureState) => true,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
                onPanResponderTerminationRequest: (evt, gestureState) => true,

                onPanResponderGrant: (evt, gestureState) => {
                    updatePosition(evt.nativeEvent.locationX);
                    return true;
                },
                onPanResponderMove: (evt, gestureState) => {
                    updatePosition(evt.nativeEvent.locationX);
                    return true;
                },
                onPanResponderRelease: () => {
                    setPositionX(1);
                },
            })
        );

        const updatePosition = (x) => {
            const x0 = 0;// x0 position
            const chartWidth = 600 * windowWidth / 844 - x0;
            const xN = x0 + chartWidth;//xN position
            const xDistance = chartWidth / size.current;// The width of each coordinate point
            if (x <= x0) {
                x = x0;
            }
            if (x >= xN) {
                x = xN;
            }
            let value = ((x - x0) / xDistance).toFixed(0);
            if (value >= size.current - 1) {
                value = size.current - 1; // Out of chart range, automatic correction
            }
            setPositionX(Number(value));
        };

        // PAINTING
        const min = Math.abs(Math.min(...returns))
        const max = Math.max(...returns)
        const y2 = (100 * (max - min) / (max + min)) + 100 + '%'
        const CustomGradient = () => (
            <Defs key={"gradient"}>
                <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={y2}>
                    <Stop offset={'0%'} stopColor={color.green} stopOpacity={1} />
                    <Stop offset={'100%'} stopColor={color.red} stopOpacity={1} />
                </LinearGradient>
            </Defs>
        );
        ///

        const Tooltip = ({ x, y }) => {
            if (positionX < 0) {
                return null;
            }
            const xValue = range[positionX];

            return (
                <G x={x(positionX)} key="tooltip">
                    <G
                        x={positionX > size.current / 2 ? -105 : 5}
                        y={150}>
                        <Rect
                            y={-34}
                            rx={6} // borderRadius
                            ry={6} // borderRadius
                            width={100}
                            height={48}
                            fill={color.darkBlue}
                        />

                        <SvgText x={10} y={-20} fill={color.cream} opacity={1} fontSize={12}>
                            {xValue}
                        </SvgText>
                        <SvgText
                            x={10}
                            y={0}
                            fontSize={12}
                            fontWeight="bold"
                            fill={returns[positionX] > 0 ? color.green : color.red}>
                            ${Math.round(returns[positionX] * 100) / 100}
                        </SvgText>
                    </G>

                    <G x={x}>
                        <Circle
                            cy={y(returns[positionX])}
                            r={5}
                            stroke={color.darkBlue}
                            strokeWidth={2}
                            fill={color.lightBlue}
                        />
                    </G>
                </G>
            );
        };
        const verticalContentInset = { top: windowWidth * 25 / 844, bottom: windowWidth * 25 / 844, left: windowWidth * 25 / 844, right: windowWidth * 25 / 844 }
        if (returns) {
            return (
                <View
                    style={{
                        backgroundColor: color.honey,

                        left: '-10%'
                    }}>
                    <View
                        style={{
                            width: windowWidth * 600 / 844,
                            height: windowWidth * 250 / 844,
                            bottom: windowWidth * 5 / 844,
                        }}>
                        <View style={{ flex: 1 }} {...panResponder.current.panHandlers}>
                            <AreaChart
                                style={{ flex: 1 }}
                                data={returns}
                                svg={{ fill: 'url(#gradient)' }}
                                contentInset={{ ...verticalContentInset }}
                                animate>
                                <CustomGradient />
                                <Tooltip />
                            </AreaChart>
                        </View>
                    </View>
                </View>
            );
        }
    } catch { console.log('Chart Error') }
}

export default OptionChart;