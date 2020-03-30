import React, {useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import { LineChart } from 'react-native-chart-kit'

import Styles from '../Styles'
import { Card, Row } from '../Components'

const ChartData = (props) => {
	console.log('props', props.route)
	const screenWidth = Dimensions.get("window").width

	const [x, setX] = useState(0)
	const [y, setY] = useState(0)
	const [amount, setAmount] = useState(0)
	const [date, setDate] = useState(undefined)

	const chartConfig = {
		backgroundColor: "#e26a00",
		backgroundGradientFrom: "#EE5253",
		backgroundGradientFromOpacity: 1,
		backgroundGradientTo: "#fff",
		backgroundGradientToOpacity: 1,
		decimalPlaces: 2, // optional, defaults to 2dp
		color: (opacity = 1) => `rgba(49, 143, 143, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		style: {
			borderRadius: 16
		},
		propsForDots: {
			r: "4",
			strokeWidth: "1",
			stroke: "#fff"
		}
  }

  showToolTip = () => {
  	
  }

    const data = {
		    labels: props.route.params.labels,
		    datasets: [
		      {
		      	xyz: props.route.params.labels,
		        data: props.route.params.data,
		      },
		    ],
		  }
	
	console.log('data', data)

	return(
		<SafeAreaView>
			<ScrollView>
				<View>
				<Text>Chart</Text>
				<View style={[ Styles.alignCenter ]} >
					<LineChart
					  data={data}
					  width={screenWidth*0.9}
					  yAxisLabel={'\u20B9'+ '.'}
					  height={400}
					  chartConfig={chartConfig}
					  bezier
					  onDataPointClick={get => console.log('dataPoint Click', get )}
					  style={{ padding: 10,  }}
					  style={{
					      marginVertical: 8,
					      borderRadius: 10
					    }}
					/>
				</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export {ChartData}