import React, {useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import { LineChart } from 'react-native-chart-kit'

import Styles from '../Styles'
import { Card, Row } from '../Components'

const IncomeChart = (props) => {
	console.log('props', props)
	const screenWidth = Dimensions.get("window").width
	const screenHeight = Dimensions.get("window").height

	const [x, setX] = useState(0)
	const [y, setY] = useState(0)
	const [amount, setAmount] = useState(0)
	const [date, setDate] = useState(undefined)
	const [showTooltip, toggleTooltip] = useState(false)

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

  showToolTip = ({ dataset, index, value, x, y }) => {
  	// {datasets, index, value, x, y}
  	console.log('into income popup', dataset)
  	setX(x+20)
  	setY(y-30)
  	setAmount(value)
  	setDate(dataset.xyz[index] + ' 2020')
  	toggleTooltip(true)
  }

    // const data = {
		  //   labels: props.route.params.labels,
		  //   datasets: [
		  //     {
		  //     	xyz: props.route.params.labels,
		  //       data: props.route.params.data,
		  //     },
		  //   ],
		  // }

	const data = {
		labels: props.lables,
		datasets: [
		  {
		  	xyz: props.lables,
		    data: props.data,
		  },
		],
	}

	console.log('data', data)

	return(
		<SafeAreaView>
			<ScrollView>
				<View>
					<View style={[ Styles.padding10, Styles.backgroundWhite ]} >
						<Text style={[ Styles.fontSize18 ]} >Last 20 Days Sale</Text>
					</View>
					<View style={[ Styles.alignCenter ]} >
						<LineChart
						  data={data}
						  width={screenWidth*0.9}
						  yAxisLabel={'\u20B9'+ '.'}
						  height={screenHeight*0.8}
						  chartConfig={chartConfig}
						  bezier
						  onDataPointClick={data => (this.showToolTip(data), console.log('point tap', data))}
						  style={{ padding: 10,  }}
						  style={{
						      marginVertical: 8,
						      borderRadius: 10
						    }}
						/>

						{
							(showTooltip)
							?
							<View style={[Styles.backgroundWhite, Styles.padding5, Styles.borderRadius5, Styles.elevation5, { position: 'absolute', top: y, left: x, zIndex: 99 }]} >
								<TouchableOpacity onPress={() => { toggleTooltip(false) }} >	
									<Text style={[ Styles.fontColorPaleRed, { position: 'relative', zIndex: 99 } ]} >
										Total Sales on {date} is {amount}
									</Text>
								</TouchableOpacity>
							</View>
							:
							null
						}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const ExpenseChart = (props) => {
	console.log('props', props)
	const screenWidth = Dimensions.get("window").width
	const screenHeight = Dimensions.get("window").height

	const [x, setX] = useState(0)
	const [y, setY] = useState(0)
	const [amount, setAmount] = useState(0)
	const [date, setDate] = useState(undefined)
	const [showTooltip, toggleTooltip] = useState(false)

	const chartConfig = {
		backgroundColor: "#e26a00",
		backgroundGradientFrom: "#EE5253",
		backgroundGradientFromOpacity: 1,
		backgroundGradientTo: "#fff",
		backgroundGradientToOpacity: 1,
		decimalPlaces: 2, // optional, defaults to 2dp
		color: (opacity = 1) => `rgba(255, 143, 143, ${opacity})`,
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

  showToolTip = ({ dataset, index, value, x, y }) => {
  	// {datasets, index, value, x, y}
  	console.log('into popup', dataset)
  	setX(x+20)
  	setY(y-30)
  	setAmount(value)
  	setDate(dataset.xyz[index] + ' 2020')
  	toggleTooltip(true)
  }

    // const data = {
		  //   labels: props.route.params.labels,
		  //   datasets: [
		  //     {
		  //     	xyz: props.route.params.labels,
		  //       data: props.route.params.data,
		  //     },
		  //   ],
		  // }

	const data = {
		labels: props.lables,
		datasets: [
		  {
		  	xyz: props.lables,
		    data: props.data,
		  },
		],
	}

	console.log('data', data)

	return(
		<SafeAreaView>
			<ScrollView>
				<View>
					<View style={[ Styles.padding10, Styles.backgroundWhite ]} >
						<Text style={[ Styles.fontSize18 ]} >Last 20 Days Expense</Text>
					</View>
					<View style={[ Styles.alignCenter ]} >
						<LineChart
						  data={data}
						  width={screenWidth*0.9}
						  yAxisLabel={'\u20B9'+ '.'}
						  height={screenHeight*0.8}
						  chartConfig={chartConfig}
						  bezier
						  onDataPointClick={data => (this.showToolTip(data), console.log('point tap', data))}
						  style={{ padding: 10,  }}
						  style={{
						      marginVertical: 8,
						      borderRadius: 10
						    }}
						/>

						{
							(showTooltip)
							?
							<View style={[Styles.backgroundWhite, Styles.padding5, Styles.borderRadius5, Styles.elevation5, { position: 'absolute', top: y, left: x, zIndex: 99 }]} >
								<TouchableOpacity onPress={() => { toggleTooltip(false) }} >	
									<Text style={[ Styles.fontColorPaleRed, { position: 'relative', zIndex: 99 } ]} >
										Total Expense on {date} is {amount}
									</Text>
								</TouchableOpacity>
							</View>
							:
							null
						}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export {IncomeChart, ExpenseChart}