import React from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import moment from 'moment'
import {connect} from 'react-redux'
import { getDashboardData } from '../Components/Actions'

import Styles from '../Styles'
import { Card, Row, IncomeChart, ExpenseChart } from '../Components'

class RDashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			totalIncome: 0,
			totalExpense: 0,
			totalPoints: 0,
			showChart: false,
			incomeChartData: [],
			incomeChartLabel: [],
			expenseChartData: [],
		}
	}

	prepareChartData = async () => {
		const { bills, products, members, expenses } = this.props.dashboard
		let label = []
		let data = []
		let expenseData = []

		const currentMonthBills = bills.filter(bill => {
			return moment(bill.date).isSame(moment(), 'month')
		})

		const currentMonthExpense = expenses.filter(expense => {
			return moment(expense.date).isSame(moment(), 'month')
		})

		for(var i = 0; i < 14; i++) {
			label.push(moment().subtract(i, 'd').format('DD MMM'))
			let currentDate = moment().subtract(i, 'd').format('DD-MM-YYYY')
			let currentDateSale = 0
			let currentDateExpense = 0

			currentMonthBills.map(bill => {
				let billDate = moment(bill.date).format('DD-MM-YYYY')
				if(bill.totalAmount && moment(billDate).isSame(currentDate)) {
					// console.log('Goyyala', bill.totalAmount, currentDateSale, currentDateSale + bill.totalAmount)
					currentDateSale += bill.totalAmount
				}
			})

			currentMonthExpense.map(expense => {
				let billDate = moment(expense.date).format('DD-MM-YYYY')
				if(expense.amount && moment(billDate).isSame(currentDate)) {
					// console.log('Goyyala', bill.totalAmount, currentDateSale, currentDateSale + bill.totalAmount)
					currentDateExpense += expense.amount
				}
			})
			data.push(currentDateSale)
			expenseData.push(currentDateExpense)
		}

		this.setState({ incomeChartLabel: label, incomeChartData: data, expenseChartData: expenseData, showChart: true })
	}

	setTotalValues = () => {
		const { bills, products, members, expenses } = this.props.dashboard
		let totalIncome = 0
		let totalExpense = 0
		let totalPoints = 0

		const currentMonthBills = bills.filter(bill => {
			return moment(bill.date).isSame(moment(), 'month')
		})

		const currentMonthExpense = expenses.filter(expense => {
			return moment(expense.date).isSame(moment(), 'month')
		})

		console.log('current expense', currentMonthExpense)

		currentMonthBills.map(bill => {
			if(bill.totalAmount && bill.totalPoints) {
				totalIncome += bill.totalAmount
				totalPoints += bill.totalPoints
			}
			return null
		})

		currentMonthExpense.map(expense => {
			if(expense.amount) {
				totalExpense += expense.amount
			}
			console.log('totalExpense', totalExpense)
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

		if(!this.state.incomeChartData.length) {
			this.prepareChartData()
		}
	}

	render() {
		const { bills, products, members } = this.props.dashboard
		if(this.state.incomeChartData.length) {	
			console.log('state', this.state.incomeChartData.length)
			console.log('chart', this.state.incomeChartLabel.length)
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
							<Text style={[ Styles.fontColorWhite, Styles.fontSize24 ]} >{'\u20B9'}.{ this.state.totalIncome }</Text>
						</View>
						<View style={[ Styles.flex1, Styles.padding5, Styles.alignCenter, { backgroundColor: '#ee52a1' } ]} >
							<Text style={[ Styles.fontColorWhite ]} >Expense</Text>
							<Text style={[ Styles.fontColorWhite, Styles.fontSize24 ]} >{'\u20B9'}.{ this.state.totalExpense }</Text>
						</View>
					</View>

					<View>
						{
							(this.state.incomeChartLabel.length !== 0 && this.state.incomeChartData.length !== 0)
							?
							<View>
								<IncomeChart lables={this.state.incomeChartLabel} data={this.state.incomeChartData} />
								<ExpenseChart lables={this.state.incomeChartLabel} data={this.state.expenseChartData} />
							</View>
							:
							null
						}
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