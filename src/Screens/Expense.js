import React from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import moment from 'moment'
import {connect} from 'react-redux'

import {addExpense, postExpense, fetchExpense} from '../Components/Actions'
import Styles from '../Styles'

const {width, height} = Dimensions.get('window')

if ( Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Row = ({children, pressFunction}) => {
	return (
		<TouchableOpacity onPress={() => { pressFunction() }} >
			<View style={[ Styles.margin10, Styles.padding10, Styles.flexRow, Styles.borderRadius10, Styles.elevation5, Styles.alignCenter, { backgroundColor: '#eee' } ]} >
				{ children }
			</View>
		</TouchableOpacity>
	)
}

class RExpense extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			scene: 'none'
		}
	}

	onShowPopup = (route) => {
		let config = {
			"create": {
				"property": "scaleXY", 
				"type": "spring",
				"springDamping": 0.7,
			},

			"delete": {
				"property": "scaleXY", 
				"type": "spring",
				"springDamping": 0.7,
			}, 

			"duration": 400, 
			"update": {
				"springDamping": 0.4,
				"type": "spring"
			}
		}
		LayoutAnimation.configureNext(config);
		this.setState({ scene: route })
	}

	componentDidMount() {
		this.props.fetchExpense()
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(this.props.alert.reload && this.props.alert.reload !== prevProps.alert.reload) {
			this.props.fetchExpense()
		}
	}

	returnSection = (route) => {
		if(route === 'filter') {
			return (
				<View style={[Styles.backgroundWhite, Styles.padding10]} >
					<Text style={[ Styles.textAlignCenter ]} >This Option is currently not available for you</Text>
				</View>
			)
		}

		else if(route === 'add') {
			return (
				<View>
					<View>
						<Form>
							<Item>
								<Input placeholder='Title' onChangeText={text => this.props.addExpense('title', text)} />
							</Item>

							<Item>
								<Input placeholder='Amount' onChangeText={text => this.props.addExpense('amount', text)} />
							</Item>

							<Item>
								<Input placeholder='Description' multiline={true} onChangeText={text => this.props.addExpense('description', text)} />
							</Item>
						</Form>
						<View style={[Styles.flexRow, Styles.justifyCenter, Styles.padding10]} >
							<Button success rounded onPress={() => { this.props.postExpense(), this.setState({ screen: 'none' }) }} >
								<Icon type='MaterialCommunityIcons' name='file-plus' style={[Styles.fontColorWhite]} />
								<Text style={[Styles.margin10, Styles.fontColorWhite]} >File Expense</Text>
							</Button>
						</View>
					</View>
				</View>
			)
		}
	}

	render() {
		console.log(this.props.expense.expenses)
		return (
			<View style={[Styles.flex1, Styles.backgroundWhite]} > 
				<View style={[Styles.flexRow, Styles.justifySpaceAround, Styles.backgroundWhite]} >
					<Button style={[ Styles.flex1, Styles.margin5 ]} rounded onPress={() => (this.state.scene == 'none' || this.state.scene == 'add') ? this.onShowPopup('filter') : this.onShowPopup('none')} >
						<Text style={[Styles.fontColorWhite]} >Filter</Text>
					</Button>

					<Button style={[ Styles.flex1, Styles.margin5 ]} rounded onPress={() => (this.state.scene == 'none' || this.state.scene == 'filter') ? this.onShowPopup('add') : this.onShowPopup('none')} >
						<Text style={[Styles.fontColorWhite]} >Add Expense</Text>
					</Button>
				</View>
				<View>
					{
						(this.state.screen !== 'none')
						?
						this.returnSection(this.state.scene)
						:
						null
					}
				</View>
				<View style={[ Styles.flex1 ]} >
					<ScrollView>
					{
						this.props.expense.expenses.map(expense => {
							return (
								<Row key={expense.Title + expense.date + expense.amount} >
									<Text style={[ Styles.flex2 ]} >{expense.title}</Text>
									<Text style={[ Styles.flex1 ]} >{moment(expense.date).format('DD MMM YYYY')}</Text>
									<Text style={[ Styles.flex1 ]} >{expense.amount}</Text>

								</Row>
							)
						})
					}
					</ScrollView>
				</View>
			</View>
		)
	}
}

const mapStateToProps = ({ expense, alert }) => {
	return { expense, alert }
}

export const Expense = connect(mapStateToProps, { addExpense, postExpense, fetchExpense })(RExpense)