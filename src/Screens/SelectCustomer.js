import React, {useState} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, TouchableWithoutFeedback, FlatList, Animated, Modal } from 'react-native'
import { Form, Item, Input, Label, Button, Icon, Header, Body, Left, Right, Title } from 'native-base'
import * as Animatable from 'react-native-animatable';
import moment from 'moment'
import FlashMessage from "react-native-flash-message";
import {connect} from 'react-redux'

import Styles from '../Styles'
import { addCustomer, fetchCustomer, postCustomer, selectCustomer } from '../Components/Actions'

const {width, height} = Dimensions.get('window')

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const Row = ({children, pressFunction, customer, selected}) => {
	const [isSelected, select] = useState(false)
	return (
		<TouchableOpacity onPress={() => { pressFunction() }} >
			<View style={[ Styles.margin10, Styles.padding10, Styles.flexRow, Styles.borderRadius10, Styles.elevation5, Styles.alignCenter, { backgroundColor: (selected.mobile == customer.mobile) ? 'green' : '#fff' } ]} >
				{ children }
			</View>
		</TouchableOpacity>
	)
}

class RSelectCustomer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mobile: '',
			showModal: false,
			showCard: false,
			addCustomer: false
		}

		this.card = React.createRef()
	}

	onAddCustomer = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

		this.setState({ addCustomer: !this.state.addCustomer })
	}

	onModalShow = (customer) => {
		this.setState({ showModal: true, viewCustomer: customer })
		setTimeout(() => {
			this.setState({ showCard: true })
			console.log('this.card', this.card.current)
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

	render() {
		console.log('props here', this.props)
		return (
			<View style={[Styles.flex1]} >
				<Modal visible={this.state.showModal} animationType='fade' transparent={true} >
					<TouchableWithoutFeedback onPress={ () => { this.onModalHide() }} >
						<View>
							{
								(this.state.showCard)
								?
								<View style={[ Styles.backgroundColorTranslucent, Styles.justifyCenter, Styles.alignCenter, { width, height } ]} >
									<Animatable.View ref={this.card} style={[{ width: width*0.7, height: height*0.7}, Styles.backgroundColorPaleRed, Styles.borderRadius10, Styles.padding10, Styles.justifySpaceBetween]} >
										<View style={[ Styles.alignCenter, Styles.flex1 ]} >
											<Text style={[ Styles.fontSize24, Styles.fontBold, Styles.fontColorWhite, { borderBottomWidth: 2, borderBottomColor: '#fff', paddingLeft: 10, paddingRight: 10 } ]} >Arumaii Foods and Icecreams</Text>
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite ]} >Gift Card</Text>
										</View>
										<View style={[ Styles.margin10, Styles.padding10, Styles.flex2 ]} >
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Card Number: {this.state.viewCustomer.cardNo}</Text>
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Name: {this.state.viewCustomer.name}</Text>
											<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Mobile: +91 {this.state.viewCustomer.mobile}</Text>
											<View style={[Styles.flexRow, Styles.justifySpaceBetween, Styles.alignCenter]} >
												<Text style={[ Styles.fontSize20, Styles.fontBold, Styles.fontColorWhite, Styles.margin10 ]} >Current Points: {(this.state.viewCustomer.ponits) ? this.state.viewCustomer.points : 0}</Text>
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
							<Label>Customer Mobile</Label>
							<Input style={{ width: width*0.8 }} onChangeText={text => mobileFeed(text)} />
							<TouchableOpacity onPress={() => { this.onAddCustomer() }} >
							{
								(!this.state.addCustomer)
								?
								<Icon type='Ionicons' name='md-person-add' style={[Styles.fontColorPaleRed]} />
								:
								<Icon type='AntDesign' name='closesquare' style={[Styles.fontColorPaleRed]} />
							}
							</TouchableOpacity>
						</Item>
					</Form>
				</View>

				<View style={[ Styles.backgroundWhite, Styles.padding20 ]} >
					{
						(this.state.addCustomer)
						?
						<View>
							<Form>
								<Item>
									<Input placeholder='Name' onChangeText={text => this.props.addCustomer('customerName', text)} />
								</Item>

								<Item>
									<Input placeholder='Card No' onChangeText={text => this.props.addCustomer('customerCardNo', text)} />
								</Item>

								<Item>
									<Input placeholder='Mobile' onChangeText={text => this.props.addCustomer('customerMobile', text)} />
								</Item>
							</Form>
							<View style={[Styles.flexRow, Styles.justifyCenter, Styles.padding10]} >
								<Button success rounded onPress={() => this.props.postCustomer()} >
									<Icon type='Ionicons' name='md-person-add' style={[Styles.fontColorWhite]} />
									<Text style={[Styles.margin10, Styles.fontColorWhite]} >Add Member</Text>
								</Button>
							</View>
						</View>
						:
						null
					}
				</View>

				<ScrollView>
				{
					(this.props.customer.customers.length)
					?
					this.props.customer.customers.map(customer => {
						return (
							<Row key={customer.name} customer={customer} selected={this.props.cart.customer} pressFunction={() => this.props.selectCustomer(customer)} >
								<Text style={[Styles.flex2]} >{customer.mobile}</Text>
								<Text style={[Styles.flex3]} >{customer.name}</Text>
								<Text style={[Styles.flex1]} >{(customer.ponits) ? customer.points : 0}</Text>
								<View style={[Styles.flex2, Styles.flexRow, Styles.justifyCenter]} >
									<TouchableOpacity onPress={ () => { this.onModalShow(customer) }} style={[ Styles.padding10, Styles.backgroundColorPaleRed, Styles.borderRadius5 ]} >
										<Text style={[ Styles.fontColorWhite ]} >View</Text>
									</TouchableOpacity>
								</View>
							</Row>
						)
					})
					:
					console.log('Ayyoyo')
				}
				</ScrollView>

				<View style={[Styles.elevation10, { position: 'absolute', right: 30, bottom: 30 }]} >
					<Button rounded onPress={() => this.props.navigation.navigate('BillDesk')} >
						<Text style={[Styles.margin10, Styles.fontColorWhite]} >Go to BillDesk</Text>
						<Icon type='MaterialCommunityIcons' name='cart-arrow-right' />
					</Button>
				</View>
			</View>
		)
	}
}

const mapStateToProps = ({ customer, cart }) => {
	return { customer, cart }
}

const SelectCustomer = connect(mapStateToProps, { addCustomer, fetchCustomer, postCustomer, selectCustomer })(RSelectCustomer)

export {SelectCustomer}