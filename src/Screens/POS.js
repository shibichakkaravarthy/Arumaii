import React, {Component} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import {connect} from 'react-redux'

import Styles from '../Styles'
import { Card, Row } from '../Components'
import { addItem, removeItem } from '../Components/Actions'
import products from '../products.json'

const {width, height} = Dimensions.get('window')

const ProductCard = (props) => {
	return (
		<TouchableOpacity onPress={() => { props.pressFunction(props.item, props.quantity ) }} style={[Styles.margin10]} >
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
			quantity: 1
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

	render() {
		const filtered = products.products.filter(item => {
			return item.name.toLowerCase().includes(this.state.filter.toLowerCase())
		})

		let total = 0

		this.props.cart.map(item => {
			total = total + parseInt(item.price)
		})

		console.log('width', total)
		return (
			<SafeAreaView style={ Styles.flex1 } >
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
							filtered.map(item => <ProductCard key={item.name} item={item} name={item.name} quantity={this.state.quantity} price={item.price} pressFunction={this.props.addItem} />)
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
								this.props.cart.map((item, index) => {
									return <Row removeItem={this.onRemoveItem} key={item.name} index={index} name={item.name} price={item.price} quantity={item.quantity} points={item.points} />
								})
							}
							</ScrollView>
						</View>
						:
						null
					}

					<View style={[Styles.elevation10, { position: 'absolute', right: 30, bottom: 70 }]} >
						<Button rounded onPress={() => this.props.navigation.navigate('Confirm')} >
							<Text style={[Styles.margin10, Styles.fontColorWhite]} >Grand Total: {total}</Text>
							<Icon type='MaterialCommunityIcons' name='cart-arrow-right' />
						</Button>
					</View>
				</Animated.View>
					
			</SafeAreaView>
		)
	}
}

const mapStateToProps = ({ cart }) => {
	return {cart}
}

const POS = connect(mapStateToProps, { addItem, removeItem })(RPOS)

export {POS}