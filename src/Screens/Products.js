import React, {Component} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import ToggleSwitch from 'toggle-switch-react-native'
import {connect} from 'react-redux'

import { getProducts, addProduct, postProduct } from '../Components/Actions'
import { Card, Row } from '../Components'
import Styles from '../Styles'

const {width, height} = Dimensions.get('window')

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
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

class RProducts extends Component {
	constructor() {
		super();
		this.state = {
			filter:''
		}
	}

	onAddProduct = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ addProduct: !this.state.addProduct })
	}

	componentDidMount() {
		this.props.getProducts()
	}

	render() {
		const filtered = this.props.product.products.filter(item => {
			console.log('filter', item, this.props.product)
			return item.name.toLowerCase().includes(this.state.filter.toLowerCase())
		})
		console.log('props', this.props)
		return (
			<SafeAreaView style={ Styles.flex1 } >
				<View style={{ width: width, position: 'absolute', top:0, left: 0, zIndex: 99, alignItems: 'center' }} >
				{
					(this.state.addProduct)
					?
					<View style={[Styles.borderRadius5, Styles.backgroundWhite, Styles.padding10, Styles.elevation5, Styles.justifyFlexEnd, { width: width*0.6 }]} >
						<Form style={Styles.flex1} >
							<Item inlineLabel>
								<Label>Name</Label>
								<Input style={{ width: width*0.8 }} onChangeText={text => this.props.addProduct('name', text)} />
							</Item>
							<Item inlineLabel>
								<Label>Price</Label>
								<Input style={{ width: width*0.8 }} onChangeText={text => this.props.addProduct('price', parseInt(text))} />
							</Item>
							<Item inlineLabel>
								<Label>Points</Label>
								<Input style={{ width: width*0.8 }} onChangeText={text => this.props.addProduct('points', parseInt(text))} />
							</Item>

							<View style={[Styles.margin10]} >
								<ToggleSwitch isOn={this.state.isInven} onColor="green" offColor="grey" label="Inventory" labelStyle={{ color: "black", fontWeight: "900" }} size="small" onToggle={isOn => this.setState({ isInven: isOn })} />
							</View>
							{
								(this.state.isInven)
								?
								<Item inlineLabel>
									<Label>Stock</Label>
									<Input style={{ width: width*0.8 }} onChangeText={text => this.props.addProduct('stock', parseInt(text))} />
								</Item>
								:
								null
							}

							<View style={[ Styles.flexRow, Styles.justifyFlexEnd, Styles.padding5 ]} >
								<Button success small onPress={ () => {this.props.postProduct(), this.setState({ addProduct: false })} } >
									<Text style={[ Styles.fontColorWhite, Styles.padding5 ]} >OK</Text>
								</Button>
								<Button success small onPress={ () => this.setState({ addProduct: false }) } style={{ marginLeft: 10 }} >
									<Text style={[ Styles.fontColorWhite, Styles.padding5, ]} >Cancel</Text>
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
							<TouchableOpacity onPress={() => { this.onAddProduct() }} >
							{
								(!this.state.addCustomer)
								?
								<Icon type='MaterialCommunityIcons' name='file-plus' style={[Styles.fontColorPaleRed]} />
								:
								<Icon type='AntDesign' name='closesquare' style={[Styles.fontColorPaleRed]} />
							}
							</TouchableOpacity>
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
			</SafeAreaView>
		)
	}
}

const mapStateToProps = ({ product }) => {
	return {product}
}

const Products = connect(mapStateToProps, { addProduct, getProducts, postProduct })(RProducts)

export {Products}