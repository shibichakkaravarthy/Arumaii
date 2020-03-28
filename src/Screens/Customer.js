import React, {Component} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, TouchableWithoutFeedback, FlatList, Animated, Modal } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import ToggleSwitch from 'toggle-switch-react-native'
import * as Animatable from 'react-native-animatable';
import moment from 'moment'
import {connect} from 'react-redux'

import { fetchCustomer, addCustomer, postCustomer, feedCustomerData, updateCustomer } from '../Components/Actions'
import Styles from '../Styles'

const {width, height} = Dimensions.get('window')

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
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

class RCustomer extends React.Component {
	constructor() {
		super()
		this.state = {
			filter: '',
			customers: [],
			customerId: '',
			showModal: false,
			viewCustomer: {},
			showCard: false
		}

		this.card = React.createRef()
	}

	onShowPopup = (route, customer) => {
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

		if(customer) {
			this.props.feedCustomerData(customer)
			this.setState({customerId: customer._id})
		}

		this.setState({ scene: !this.state.scene, inputMode: route })
	}

	onModalShow = (customer) => {
		this.setState({ showModal: true, viewCustomer: customer })
		setTimeout(() => {
			this.setState({ showCard: true })
			console.log('this.card', customer)
			this.card.current.flipInX(800)
		})
	}

	onModalHide = () => {
		this.card.current.flipOutX(800)
		setTimeout(() => {
			this.setState({ showCard: false, showModal: false })
			console.log('card close')
		}, 801)
	}

	componentDidMount() {
		this.props.fetchCustomer()
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('componentDidUpdate', this.props.alert)

		if(this.props.alert.reload && this.props.alert.reload != prevProps.alert.reload) {
			console.log('componentDidUpdate reload true', this.props.alert)
			this.props.fetchCustomer()
			this.setState({ customers: this.props.customer.customers })
		}

		if(this.props.customer.customers !== prevProps.customer.customers) {
			this.setState({ customers: this.props.customer.customers })
		}
	}

	render() {
		console.log('customer', this.props.alert)
		const filtered = this.state.customers.filter(customer => {
			let filtered = customer.mobile.toString().includes(this.state.filter.toString()) || customer.cardNo.toString().includes(this.state.filter.toString())
			console.log('filtered', filtered)
			return filtered
		})
		return (
			<SafeAreaView style={ Styles.flex1 } >
				<Modal visible={this.state.showModal} animationType='fade' transparent={true} >
					<TouchableWithoutFeedback onPress={ () => { this.onModalHide() }} >
						<View>
							{
								(this.state.showCard)
								?
								<View style={[ Styles.backgroundColorTranslucent, Styles.justifyCenter, Styles.alignCenter, { width, height } ]} >
									<Animatable.View ref={this.card} style={[{ width: width*0.7, height: height*0.75}, Styles.backgroundColorPaleRed, Styles.borderRadius10, Styles.padding10, Styles.justifySpaceBetween]} >
										<View style={[ Styles.alignCenter, Styles.flex1 ]} >
											<Text style={[ Styles.fontSize24, Styles.fontBold, Styles.fontColorWhite, { borderBottomWidth: 2, borderBottomColor: '#fff', paddingLeft: 10, paddingRight: 10 } ]} >Arumaii Foods and Icecreams</Text>
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite ]} >Gift Card</Text>
										</View>
										<View style={[ Styles.margin10, Styles.padding10, Styles.flex2 ]} >
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Card Number: {this.state.viewCustomer.cardNo}</Text>
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Premium Eligible: {(this.state.viewCustomer.isPremium) ? 'Yes' : 'No'}</Text>
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Name: {this.state.viewCustomer.name}</Text>
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Mobile: +91 {this.state.viewCustomer.mobile}</Text>
											<View style={[Styles.flexRow, Styles.justifySpaceBetween, Styles.alignCenter]} >
												<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Current Points: {(this.state.viewCustomer.points) ? this.state.viewCustomer.points : 0}</Text>
												<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Joined On: {moment(this.state.viewCustomer.joined).format('DD MMM YYYY')}</Text>
											</View>
										</View>
									</Animatable.View>
								</View>
								:
								null
							}
						</View>
					</TouchableWithoutFeedback>
				</Modal>
				<View style={[ Styles.flexRow, Styles.justifyCenter, Styles.padding10, Styles.backgroundWhite, Styles.borderColorPaleRed, { borderBottomWidth: 1 } ]} >
					<Form style={Styles.flex1} >
						<Item inlineLabel>
							<Label>Search</Label>
							<Input style={{ width: width*0.8 }} onChangeText={text => this.setState({filter: text})} />
							<View>
							{
								(!this.state.scene)
								?
								<TouchableOpacity onPress={() => { this.onShowPopup('add') }} >
									<Icon type='Ionicons' name='md-person-add' style={[Styles.fontColorPaleRed]} />
								</TouchableOpacity>
								:
								<TouchableOpacity onPress={() => { this.onShowPopup('', { name: '', mobile: '', cardNo: '' }) }} >
									<Icon type='AntDesign' name='closesquare' style={[Styles.fontColorPaleRed]} />
								</TouchableOpacity>
							}

							</View>
						</Item>
					</Form>
				</View>
				<View>
					{
						(this.state.scene)
						?
						<View>
							<Form>
								<Item>
									<Input placeholder='Name' value={this.props.customer.customerName} onChangeText={text => this.props.addCustomer('customerName', text)} />
								</Item>

								<Item>
									<Input placeholder='Card No' value={this.props.customer.customerCardNo} onChangeText={text => this.props.addCustomer('customerCardNo', text)} />
								</Item>

								<Item>
									<Input placeholder='Mobile' value={this.props.customer.customerMobile} onChangeText={text => this.props.addCustomer('customerMobile', text)} />
								</Item>
							</Form>
							<View style={[Styles.flexRow, Styles.justifyCenter, Styles.padding10]} >
								{
									(this.state.inputMode === 'edit')
									?
									<Button success rounded onPress={() => { this.props.updateCustomer(this.state.customerId), this.setState({ scene: false }) }} >
										<Icon type='Ionicons' name='md-person-add' style={[Styles.fontColorWhite]} />
										<Text style={[Styles.margin10, Styles.fontColorWhite]} >Update Member</Text>
									</Button>
									:
									<Button success rounded onPress={() => { this.props.postCustomer(), this.setState({ scene: false }) }} >
										<Icon type='Ionicons' name='md-person-add' style={[Styles.fontColorWhite]} />
										<Text style={[Styles.margin10, Styles.fontColorWhite]} >Add Member</Text>
									</Button>
								}
							</View>
						</View>
						:
						null
					}
				</View>

				<ScrollView>
					<View style={[Styles.backgroundWhite]} >
						{
							filtered.map(item => {
								console.log(item)
								return (
									<Row key={item.name} pressFunction={() => {}} >
											<Text style={[Styles.flex1]} >{item.name}</Text>
											<Text style={[Styles.flex1]} >{item.mobile}</Text>
											<Text style={[Styles.flex1]} >{item.cardNo}</Text>
											<View style={[ Styles.flexRow, Styles.justifySpaceAround ]} >
												<TouchableOpacity onPress={ () => this.onModalShow(item) } style={[ Styles.margin5, Styles.padding5, Styles.backgroundColorPaleRed, Styles.borderRadius5 ]} >
													<Text style={[Styles.fontColorWhite]} >View More</Text>
												</TouchableOpacity>
												<TouchableOpacity onPress={() => this.onShowPopup('edit', item)} style={[ Styles.margin5, Styles.padding5, Styles.backgroundColorPaleRed, Styles.borderRadius5 ]} >
													<Text style={[Styles.fontColorWhite]} >Edit</Text>
												</TouchableOpacity>
											</View>
									</Row>
								)
							})
						}
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

const mapStateToProps = ({ customer, alert }) => {
	return { customer, alert }
}

const Customer = connect(mapStateToProps, { fetchCustomer, addCustomer, postCustomer, feedCustomerData, updateCustomer })(RCustomer)

export {Customer}