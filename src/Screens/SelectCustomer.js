import React, {useState} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, TouchableWithoutFeedback, FlatList, Animated, Modal } from 'react-native'
import { Form, Item, Input, Label, Button, Icon, Header, Body, Left, Right, Title } from 'native-base'
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux'

import Styles from '../Styles'

const {width, height} = Dimensions.get('window')

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const Row = ({children}) => {
	const [isSelected, select] = useState(false)
	return (
		<TouchableOpacity onPress={() => select(!isSelected)} >
			<View style={[ Styles.margin10, Styles.padding10, Styles.flexRow, Styles.borderRadius10, Styles.elevation5, Styles.alignCenter, { backgroundColor: isSelected ? 'green' : '#fff' } ]} >
				{ children }
			</View>
		</TouchableOpacity>
	)
}

class SelectCustomer extends React.Component {

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

	onModalShow = () => {
		this.setState({ showModal: true })
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
		// setTimeout(() => {
		// 	console.log('this.card', this.card.current)
		// 	this.card.current.flipInX(800)
		// }, 3000)
	}

	render() {
		console.log('card', this.card)
		return (
			<View style={[Styles.flex1]} >
				<Modal visible={this.state.showModal} animationType='fade' transparent={true} >
					<TouchableWithoutFeedback onPress={ () => { this.onModalHide() }} >
						<View>
							{
								(this.state.showCard)
								?
								<View style={[ Styles.backgroundColorTranslucent, Styles.justifyCenter, Styles.alignCenter, { width, height } ]} >
									<Animatable.View ref={this.card} style={[{ width: width*0.7, height: height*0.7}, Styles.backgroundColorPaleRed, Styles.borderRadius10, Styles.padding10]} >
										<View style={[ Styles.alignCenter ]} >
											<Text style={[ Styles.fontSize18, Styles.fontBold, Styles.fontColorWhite ]} >Arumaii Foods and Icecreams</Text>
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
									<Input placeholder='Name' />
								</Item>

								<Item>
									<Input placeholder='Card No' />
								</Item>

								<Item>
									<Input placeholder='Mobile' />
								</Item>
							</Form>
							<View style={[Styles.flexRow, Styles.justifyCenter, Styles.padding10]} >
								<Button success rounded onPress={() => console.log('Add Member')} >
									<Icon type='Ionicons' name='md-person-add' style={[Styles.fontColorWhite]} />
									<Text style={[Styles.margin10, Styles.fontColorWhite]} >Add Member</Text>
								</Button>
							</View>
						</View>
						:
						null
					}
				</View>

				<View>
					<Row>
						<Text style={[Styles.flex2]} >Mobile Number</Text>
						<Text style={[Styles.flex3]} >Name</Text>
						<Text style={[Styles.flex1]} >Points</Text>
						<Text style={[Styles.flex1]} >Date Joined</Text>
						<View style={[Styles.flex1, Styles.flexRow, Styles.justifyCenter]} >
							<TouchableOpacity onPress={ () => { this.onModalShow() }} style={[ Styles.padding10, Styles.backgroundColorPaleRed, Styles.borderRadius5 ]} >
								<Text style={[ Styles.fontColorWhite ]} >View</Text>
							</TouchableOpacity>
						</View>
					</Row>
				</View>

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

export {SelectCustomer}