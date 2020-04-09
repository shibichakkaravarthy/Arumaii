import React, {Component} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import { showMessage, hideMessage } from "react-native-flash-message";
import {connect} from 'react-redux'

import Styles from '../Styles'
import { Card, Row } from '../Components'
import { addItem, removeItem, getProducts } from '../Components/Actions'
import products from '../products.json'

const {width, height} = Dimensions.get('window')

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
 }

const ProductCard = (props) => {
	return (
		<TouchableOpacity onPress={() => { props.pressFunction(props.item, props.quantity ) }} onLongPress={() => { props.longPressFunction(props.item) }} style={[Styles.margin10]} >
			<Card>
				<Text>{props.name}</Text>
				<Text>{props.price}</Text>
			</Card>
		</TouchableOpacity>
	)
}

class RPOS extends Component {
	constructor() {
		super();
		this.state = {
			filter: '',
			showCart: false,
			quantity: 1,
			manualQuantity: 1,
			showQuantityPopup: false,
			selectedItem: {}
		}
		
		this.width = new Animated.Value(0)
	}

	onViewCart = () => {
		this.setState({ showCart: !this.state.showCart }, () => {
			console.log('this.state.showCart', this.state.showCart)
			Animated.timing(this.width, {
				toValue: this.state.showCart ? width : 0,
				duration: 500
			}).start()
		})
	}

	onRemoveItem = (index) => {
		this.props.removeItem(index)
		this.render()
	}

	onProductLongPress = (item) => {
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
		this.setState({ showQuantityPopup: !this.state.showQuantityPopup, selectedItem: item })
	}

	onQuantityConfirm = () => {
		this.props.addItem(this.state.selectedItem, this.state.manualQuantity)
		this.setState({ manualQuantity: 0, selectedItem: {}, showQuantityPopup: false })
	}

	componentDidMount() {
		this.props.getProducts()
	}

	render() {
		const filtered = this.props.product.products.filter(item => {
			return item.name.toLowerCase().includes(this.state.filter.toLowerCase())
		})

		console.log('width', this.props.product)
		return (
			<SafeAreaView style={ Styles.flex1 } >
				<View style={{ width: width, position: 'absolute', top:0, left: 0, zIndex: 99, alignItems: 'center' }} >
				{
					(this.state.showQuantityPopup)
					?
					<View style={[Styles.borderRadius5, Styles.backgroundWhite, Styles.padding10, Styles.elevation5, Styles.justifyFlexEnd, { width: width*0.6 }]} >
						<Form style={Styles.flex1} >
							<Item inlineLabel>
								<Label>Quantity</Label>
								<Input style={{ width: width*0.8 }} onChangeText={text => this.setState({manualQuantity: parseInt(text)})} />
							</Item>
							<View style={[ Styles.flexRow, Styles.justifyFlexEnd, Styles.padding5 ]} >
								<Button success small onPress={ () => this.onQuantityConfirm() } >
									<Text style={[ Styles.fontColorWhite, Styles.padding5 ]} >OK</Text>
								</Button>
							</View>
						</Form>
					</View>
					:
					null
				}
				</View>
				<View style={[ Styles.flexRow, Styles.justifyCenter, Styles.padding10, Styles.backgroundWhite, Styles.borderColorPaleRed, { borderBottomWidth: 1 } ]} >
					<Form style={Styles.flex1} >
						<Item inlineLabel>
							<Label>Search</Label>
							<Input style={{ width: width*0.8 }} onChangeText={text => this.setState({filter: text})} />
						</Item>
					</Form>
				</View>

				<ScrollView>
					<View style={[Styles.backgroundWhite, Styles.flexRow, Styles.flexWrap]} >
						{
							filtered.map(item => <ProductCard key={item.name} item={item} name={item.name} quantity={this.state.quantity} price={item.price} pressFunction={this.props.addItem} longPressFunction={this.onProductLongPress} />)
						}
					</View>
				</ScrollView>

				<View style={[{position: 'absolute', top: height/2, right: 0, elevation: 2, zIndex: 50}, Styles.padding10, Styles.backgroundWhite, Styles.borderRadius5]} >
					<TouchableOpacity onPress={() => this.onViewCart()} >
						<Icon type="Ionicons" name="ios-cart" style={[Styles.fontColorPaleRed]} />
					</TouchableOpacity>
				</View>

				<Animated.View style={[Styles.backgroundWhite, {position: 'absolute', top: 0, left: 0, height: height-75, width: this.width, alignSelf: 'flex-end'}]} >
					{
						(this.state.showCart)
						?
						<View>
							<ScrollView>
							{
								this.props.cart.cart.map((item, index) => {
									return <Row removeItem={this.onRemoveItem} key={item.name} index={index} name={item.name} price={item.price} quantity={item.quantity} points={item.points} />
								})
							}
							</ScrollView>
						</View>
						:
						null
					}

					<View style={[Styles.elevation10, { position: 'absolute', right: 30, bottom: 70 }]} >
						<Button rounded onPress={() => { (this.props.cart.totalAmount > 0) ? this.props.navigation.navigate('Confirm') : showMessage({ message: "Sorry", type: "danger", description: 'Cannot Bill Empty Cart' }) }} >
							<Text style={[Styles.margin10, Styles.fontColorWhite]} >Grand Total: {this.props.cart.totalAmount}</Text>
							<Icon type='MaterialCommunityIcons' name='cart-arrow-right' />
						</Button>
					</View>
				</Animated.View>
					
			</SafeAreaView>
		)
	}
}

const mapStateToProps = ({ cart, product }) => {
	return {cart, product}
}

const POS = connect(mapStateToProps, { addItem, removeItem, getProducts })(RPOS)

export {POS}