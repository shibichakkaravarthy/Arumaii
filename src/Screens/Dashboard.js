import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import moment from 'moment'
import { connect,  useDispatch, useSelector } from 'react-redux'
import { getDashboardData, membersOfTheMonth, getMemberData, clearMemberData } from '../Components/Actions'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import Styles from '../Styles'
import { Card, IncomeChart, ExpenseChart, MemberChart, IncomeToPointsChart } from '../Components'

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const Row = ({children, bill}) => {
	const [isSelected, select] = useState(false)
	const [dataFetched, fetchData] = useState(false)
	const dashboardData = useSelector(state => state.dashboard)
	const dispatch = useDispatch()

	useEffect(() => {
		if(isSelected && !dataFetched) {
			dispatch(getMemberData(bill.memberId))
			fetchData(true)
		}

		if(!isSelected && dataFetched) {
			fetchData(false)
			dispatch(clearMemberData())
		}
	})

	return (
		<TouchableOpacity onPress={() => { select(!isSelected) }} >
			<View style={[ Styles.margin10, Styles.padding10, Styles.borderRadius10, Styles.elevation5, { backgroundColor: '#eee' } ]} >
				<View style={[ Styles.flexRow, Styles.alignCenter, { backgroundColor: '#eee' } ]} >
					{ children }
				</View>
			{
				(isSelected)
				?
				<View style={[ Styles.margin10, { backgroundColor: '#35CE8D' } ]} >
					<View style={[ Styles.flexRow, Styles.padding5, Styles.margin5, {borderBottomWidth: 1, borderBottomColor: '#fff'} ]} >
						<Text style={[ Styles.flex1 ]} >Name</Text>
						<Text style={[ Styles.flex1 ]} >Quantity</Text>
						<Text style={[ Styles.flex1 ]} >Price</Text>
						<Text style={[ Styles.flex1 ]} >Points</Text>
					</View>
					{
						bill.items.map(item => {
							return (
								<View style={[ Styles.flexRow, Styles.padding5, Styles.margin5 ]} >
									<Text style={[ Styles.flex1 ]} >{item.name}</Text>
									<Text style={[ Styles.flex1 ]} >{item.quantity}</Text>
									<Text style={[ Styles.flex1 ]} >{item.price}</Text>
									<Text style={[ Styles.flex1 ]} >{item.points}</Text>
								</View>
							)
						})
					}

					<View style={[ Styles.flex1, Styles.flexRow ]} >
						<View style={Styles.flex1} ></View>
						<View style={[ Styles.margin10, Styles.padding5, Styles.flex2, {borderTopWidth: 1, borderTopColor: '#fff'} ]} >
							<View style={[ Styles.flex1, Styles.flexRow ]} >
								<Text style={{ color: '#26547C', flex: 1 }} >Customer Name</Text>
								<Text style={{ color: '#26547C', flex: 1 }} >: {dashboardData.billMember.name}</Text>
							</View>

							<View style={[ Styles.flex1, Styles.flexRow ]} >
								<Text style={{ color: '#26547C', flex: 1 }} >Customer Mobile</Text>
								<Text style={{ color: '#26547C', flex: 1 }} >: {dashboardData.billMember.mobile}</Text>
							</View>

							<View style={[ Styles.flex1, Styles.flexRow ]} >
								<Text style={{ color: '#26547C', flex: 1 }} >Customer Card Number</Text>
								<Text style={{ color: '#26547C', flex: 1 }} >: {dashboardData.billMember.cardNo}</Text>
							</View>

							<View style={[ Styles.flex1, Styles.flexRow ]} >
								<Text style={{ color: '#26547C', flex: 1 }} >Customer Points</Text>
								<Text style={{ color: '#26547C', flex: 1 }} >: {dashboardData.billMember.points}</Text>
							</View>
						</View>
						<View style={Styles.flex1} ></View>
					</View>
				</View>
				:
				null
			}
			</View>
		</TouchableOpacity>
	)
}

const mapToProps = ({ dashboard }) => {
	return { dashboard }
}

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
			pieChartData: [],
			todayStats: {},
			incomeToPointsChart: []
		}
	}

	prepareTodayStats = async () => {
		const { bills, products, members, expenses } = this.props.dashboard
		let todayStats = { todayBills: 0, todayPoints: 0, lastWeekBills: 0,  todayExpenses: 0 }

		todayBills = bills.filter(bill =>{
			return moment(bill.date).isSame(moment(), 'day')
		})

		todayExpenses = expenses.filter(expense => {
			return moment(expense.date).isSame(moment(), 'day')
		})

		lastWeekBills = bills.filter(bill =>{
			return moment(bill.date).isSame(moment().subtract(7, 'd'), 'day')			
		})

		todayBills.map(bill => {
			todayStats.todayBills += bill.totalAmount
			todayStats.todayPoints += bill.totalPoints
			return null
		})

		lastWeekBills.map(bill => {
			todayStats.lastWeekBills += bill.totalAmount
			return null
		})

		todayExpenses.map(expense => {
			todayStats.todayExpenses += expense.amount
			return null
		})

		console.log('today stats', todayStats, todayBills, lastWeekBills)
		let incomeToPointsChart = [ { name: 'Income in Rupees', color: '#20A39E', legendFontColor: "#FFF", count: todayStats.todayBills }, { name: 'Points in Rupees', color: '#FFBA49', legendFontColor: "#FFF", count: todayStats.todayPoints/16 } ]

		this.setState({ todayStats, incomeToPointsChart })
	}

	prepareChartData = async () => {
		const { bills, products, members, expenses } = this.props.dashboard
		let label = []
		let data = []
		let expenseData = []
		let premiumMemberData = { name: 'Premium', color: '#318f8f', legendFontColor: "#318f8f", count: 0 }
		let regularMemberData = { name: 'Regular', color: '#EE5253', legendFontColor: "#EE5253", count: 0 }

		members.map(member => {
			if(member.isPremium) {
				premiumMemberData.count += 1
			}
			else {
				regularMemberData.count += 1
			}

			return null
		})

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

		this.setState({ incomeChartLabel: label, incomeChartData: data, expenseChartData: expenseData, showChart: true, pieChartData: [ premiumMemberData, regularMemberData ] })
		console.log('pie chart', premiumMemberData, regularMemberData)
		this.props.membersOfTheMonth()
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
			this.prepareTodayStats()
		}
	}

	render() {
		const { bills, products, members, topMembers } = this.props.dashboard
		let filteredBills = bills

		if(this.state.selectedDate && this.state.selectedDate.dateString) {
			filteredBills = bills.filter(bill => {
				let billDate = moment(bill.date).format('YYYY-MM-DD')

				return moment(billDate).isSame(moment(this.state.selectedDate.dateString))
			})
		}

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
								<MemberChart pieData={this.state.pieChartData} />
							</View>
							:
							null
						}
					</View>

					{
						(this.state.incomeChartLabel.length !== 0 && this.state.incomeChartData.length !== 0)
						?
						<View>
							<View style={[ Styles.backgroundWhite, Styles.flexRow, Styles.padding15, Styles.margin10 ]} >
								<View style={[ Styles.flex3, Styles.borderRadius10, Styles.padding20, Styles.margin15, { backgroundColor: '#EE5253' } ]} >
									<View style={[ Styles.flexRow ]} >
										<Text style={[ Styles.flex2, Styles.fontBold, Styles.fontSize18, Styles.fontColorWhite ]} >Today Income</Text>
										<Text style={[ Styles.flex1, Styles.fontColorWhite, Styles.fontBold ]} >{'\u20B9'} {this.state.todayStats.todayBills}</Text>
									</View>

									<View style={[ Styles.flexRow ]} >
										<Text style={[ Styles.flex2, Styles.fontBold, Styles.fontSize18, Styles.fontColorWhite ]} >Today Points</Text>
										<Text style={[ Styles.flex1, Styles.fontColorWhite, Styles.fontBold ]} >{this.state.todayStats.todayPoints}</Text>
									</View>

									<View style={[ Styles.flexRow ]} >
										<Text style={[ Styles.flex2, Styles.fontBold, Styles.fontSize18, Styles.fontColorWhite ]} >Same Day Last Week</Text>
										<Text style={[ Styles.flex1, Styles.fontColorWhite, Styles.fontBold ]} >{'\u20B9'} {this.state.todayStats.lastWeekBills}</Text>
									</View>

									<View>
										<IncomeToPointsChart pieData={this.state.incomeToPointsChart} />
									</View>
								</View>

								<View style={[ Styles.flex2, Styles.margin5 ]} >
									<View style={[{ backgroundColor: '#FFBA49' }, Styles.flex1, Styles.borderRadius10, Styles.padding10, Styles.margin5]} >
										<Text style={[ Styles.textAlignCenter, Styles.fontSize20, Styles.fontColorWhite ]} >Members of the Month</Text>
										<View>
											{
												topMembers.map(member => {
													return (
														<View style={[ Styles.flexRow ]} >
															<Text style={[Styles.flex1, Styles.fontColorWhite]} >{member.name}</Text>
															<Text style={[Styles.flex1, Styles.fontColorWhite, Styles.textAlignCenter]} >{member.points}</Text>
															<Text style={[Styles.flex1, Styles.fontColorWhite]} >{member.mobile}</Text>
														</View>
													)
												})
											}
										</View>
									</View>
									<View style={[{ backgroundColor: '#20A39E' }, Styles.flex1, Styles.borderRadius10, Styles.padding10, Styles.margin5]} >
										<Text style={[ Styles.textAlignCenter, Styles.fontSize20, Styles.fontColorWhite ]} >Today Expense</Text>
										<View style={[ Styles.flexRow ]} >
											<Text style={[Styles.flex2, Styles.fontColorWhite]} >Today Expense Amount</Text>
											<Text style={[Styles.flex1, Styles.fontColorWhite]} >{this.state.todayStats.todayExpenses}</Text>
										</View>
										<View style={[ Styles.flexRow ]} >
											<Text style={[Styles.flex2, Styles.fontColorWhite]} >Contribution to Total Expense</Text>
											<Text style={[Styles.flex1, Styles.fontColorWhite]} >{((this.state.todayStats.todayExpenses/this.state.totalExpense)*100).toFixed(2)}%</Text>
										</View>
									</View>
								</View>
							</View>

							<View>
								<View style={[ Styles.padding10, Styles.backgroundWhite, Styles.flexRow, Styles.alignCenter, Styles.justifySpaceBetween ]} >
									<Text style={[ Styles.fontSize18 ]} >Get Bill by Date</Text>
									<View>
										<Form style={[ Styles.flex1, Styles.alignCenter ]} >
											<Button style={[ Styles.flex1, Styles.margin5, Styles.flexRow, Styles.padding10 ]} rounded onPress={() => this.setState({ viewCalendar: !this.state.viewCalendar })} >
												<Icon type='SimpleLineIcons' name='calendar' />
												<Text style={[Styles.fontColorWhite]} >{(this.state.selectedDate && this.state.selectedDate.dateString) ? this.state.selectedDate.dateString : 'Select a Date'}</Text>
											</Button>
										</Form>
									</View>
								</View>
								
								<View>	
									{
										(this.state.viewCalendar)
										?
										<View style={[ Styles.margin10, { position: 'absolute', zIndex: 99, bottom: 50, right: 50 }, Styles.alignCenter ]} >
											<Calendar style={{ width: screenWidth*0.5, borderRadius: 10, elevation: 5, borderWidth: 1, borderColor: '#bbb', alignSelf: 'center' }} theme={{ todayTextColor: '#EE5253' }} markedDates={(this.state.selectedDate && this.state.selectedDate.dateString) ? {[this.state.selectedDate.dateString]: {selected: true, marked: false, selectedColor: '#EE5253'}} : null} maxDate={new Date()} onDayPress={day => { console.log('day', day), this.setState({ selectedDate: day, viewCalendar: false }) }} />
										</View>
										:
										null
									}
								</View>

								<View style={[ Styles.backgroundWhite ]} >
									<Row bill={[]} >
										<Text style={[Styles.flex2]} >Bill ID</Text>
										<Text style={[Styles.flex1]} >Date</Text>
										<Text style={[Styles.flex1]} >Amount</Text>
										<Text style={[Styles.flex1]} >Points</Text>
										<Text>Member ID</Text>
									</Row>
									{
										filteredBills.map(bill => {
											return (
												<Row bill={bill} >
													<Text style={[Styles.flex2]} >{bill._id}</Text>
													<Text style={[Styles.flex1]} >{moment(bill.date).format('DD MMM YYYY')}</Text>
													<Text style={[Styles.flex1]} >{bill.totalAmount}</Text>
													<Text style={[Styles.flex1]} >{bill.totalPoints}</Text>
													<Text>{bill.memberId}</Text>
												</Row>
											)
										})
									}
								</View>
							</View>
						</View>
						:
						null
					}
				</ScrollView>
			</SafeAreaView>
		)
	}
}

const mapStateToProps = ({ dashboard }) => {
	return { dashboard }
}

export const Dashboard = connect(mapStateToProps, { getDashboardData, membersOfTheMonth })(RDashboard)