import React from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import moment from 'moment'
import {connect} from 'react-redux'
import { getDashboardData } from '../Components/Actions'
import { LineChart } from 'react-native-chart-kit'

import Styles from '../Styles'
import { Card, Row } from '../Components'

class RDashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			totalIncome: 0,
			totalExpense: 0,
			totalPoints: 0,
			showChart: false,
			chartData: {
				labels: [],
				datasets: {
					data: []
				}
			}
		}
	}

	prepareChartData = async () => {
		const { bills, products, members } = this.props.dashboard
		let label = []
		let data = []

		const currentMonthBills = bills.filter(bill => {
			return moment(bill.date).isSame(moment(), 'month')
		})

		for(var i = 0; i < 14; i++) {
			label.push(moment().subtract(i, 'd').format('DD MMM'))
			let currentDate = moment().subtract(i, 'd').format('DD-MM-YYYY')
			let currentDateSale = 0

			currentMonthBills.map(bill => {
				let billDate = moment(bill.date).format('DD-MM-YYYY')
				if(bill.totalAmount && moment(billDate).isSame(currentDate)) {
					// console.log('Goyyala', bill.totalAmount, currentDateSale, currentDateSale + bill.totalAmount)
					currentDateSale = currentDateSale + bill.totalAmount
				}
			})
			data.push(currentDateSale)
		}

		this.setState({ chartLabel: label, chartData: data, showChart: true })
	}

	setTotalValues = () => {
		const { bills, products, members } = this.props.dashboard
		let totalIncome = 0
		let totalExpense = 0
		let totalPoints = 0

		const currentMonthBills = bills.filter(bill => {
			return moment(bill.date).isSame(moment(), 'month')
		})

		currentMonthBills.map(bill => {
			if(bill.totalAmount && bill.totalPoints) {
				totalIncome = totalIncome + bill.totalAmount
				totalPoints = totalPoints + bill.totalPoints
			}
			return null
		})



		if(this.state.totalIncome != totalIncome || this.state.totalExpense != totalExpense || this.state.totalPoints != totalPoints ) {
			this.setState({ totalPoints, totalIncome, totalExpense })
		}
	}

	componentDidMount() {
		this.props.getDashboardData()
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.dashboard !== prevProps.dashboard) {
			this.setTotalValues()
		}

		if(!this.state.chartData.length) {
			this.prepareChartData()
		}
	}

	render() {
		const { bills, products, members } = this.props.dashboard
		if(this.state.chartData.length) {	
			console.log('state', this.state.chartData.length)
			console.log('chart', this.state.chartLabel.length)
		}
		return(
			<SafeAreaView>
				<ScrollView>
					<View style={[ Styles.margin10, Styles.borderRadius5, Styles.flexRow ]} >
						<View style={[ Styles.flex1, Styles.padding5, Styles.alignCenter, { backgroundColor: '#ee9f52' } ]} >
							<Text style={[ Styles.fontColorWhite ]} >Members</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize24 ]} >{ members.length }</Text>
						</View>
						<View style={[ Styles.flex1, Styles.padding5, Styles.alignCenter, { backgroundColor: '#ee5253' } ]} >
							<Text style={[ Styles.fontColorWhite ]} >Income</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize24 ]} >{ this.state.totalIncome }</Text>
						</View>
						<View style={[ Styles.flex1, Styles.padding5, Styles.alignCenter, { backgroundColor: '#ee52a1' } ]} >
							<Text style={[ Styles.fontColorWhite ]} >Points</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize24 ]} >{ this.state.totalPoints }</Text>
						</View>
					</View>

					<View>
						<TouchableOpacity onPress={() => { this.props.navigation.navigate('ChartData', { labels: this.state.chartLabel, data: this.state.chartData }) }} >
							<Text>Chart</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

const mapStateToProps = ({ dashboard }) => {
	return { dashboard }
}

export const Dashboard = connect(mapStateToProps, { getDashboardData })(RDashboard)