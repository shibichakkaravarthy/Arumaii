import React, {Component} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import ToggleSwitch from 'toggle-switch-react-native'
import {connect} from 'react-redux'

import { getProducts, addProduct, postProduct, feedProductData, updateProduct, deleteProduct } from '../Components/Actions'
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
				<Text>{props.item.name}</Text>
				<Text>Rs.{props.item.price}</Text>
				<Text>{props.item.points} Points</Text>
				<View style={[ Styles.flexRow, Styles.justifyFlexEnd ]} >
					<TouchableOpacity onPress={() => props.editFunction(props.item)} style={[ Styles.margin5, Styles.padding5, Styles.borderRadius5 ]} >
						<Icon style={[ Styles.fontSize16, Styles.fontColor, { color: 'orange' } ]} type='MaterialIcons' name='edit' />
					</TouchableOpacity>

					<TouchableOpacity onPress={() => props.deleteFunction(props.item._id)} style={[ Styles.margin5, Styles.padding5, Styles.borderRadius5 ]} >
						<Icon style={[ Styles.fontSize16, Styles.fontColorPaleRed ]} type='MaterialIcons' name='delete' />
					</TouchableOpacity>
				</View>
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
		this.setState({ addProduct: !this.state.addProduct, popupMode: 'add' })
	}

	onEditProduct = (product) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.props.feedProductData(product)
		this.setState({ addProduct: !this.state.addProduct, popupMode: 'edit', productId: product._id })
	}

	componentDidMount() {
		this.props.getProducts()
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('componentDidUpdate', this.props.alert.reload)
		if(this.props.alert.reload && this.props.alert.reload !== prevProps.alert.reload) {
			this.props.getProducts()
		}
	}

	render() {
		const filtered = this.props.product.products.filter(item => {
			console.log('filter', item, this.props.product)
			return item.name.toLowerCase().includes(this.state.filter.toLowerCase())
		})
		console.log('props', this.props)

		const { product, products } = this.props.product
		console.log('destructured', product)
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
								<Input value={product.name} style={{ width: width*0.8 }} onChangeText={text => this.props.addProduct('name', text)} />
							</Item>
							<Item inlineLabel>
								<Label>Price</Label>
								<Input value={(product.price)?product.price.toString():null}  style={{ width: width*0.8 }} onChangeText={text => this.props.addProduct('price', parseInt(text))} />
							</Item>
							<Item inlineLabel>
								<Label>Points</Label>
								<Input  value={(product.points)?product.points.toString():null}  style={{ width: width*0.8 }} onChangeText={text => this.props.addProduct('points', parseInt(text))} />
							</Item>

							<View style={[Styles.margin10]} >
								<ToggleSwitch isOn={product.isInven} onColor="green" offColor="grey" label="Inventory" labelStyle={{ color: "black", fontWeight: "900" }} size="small" onToggle={isOn => this.props.addProduct('isInven', isOn)} />
							</View>
							{
								(product.isInven)
								?
								<Item inlineLabel>
									<Label>Stock</Label>
									<Input style={{ width: width*0.8 }} onChangeText={text => this.props.addProduct('stock', parseInt(text))} />
								</Item>
								:
								null
							}

							<View style={[ Styles.flexRow, Styles.justifyFlexEnd, Styles.padding5 ]} >
								{
									(this.state.popupMode === 'add')
									?
									<Button success small onPress={ () => {this.props.postProduct(), this.setState({ addProduct: false })} } >
										<Text style={[ Styles.fontColorWhite, Styles.padding5 ]} >OK</Text>
									</Button>
									:
									<Button success small onPress={ () => {this.props.updateProduct(this.state.productId), this.setState({ addProduct: false })} } >
										<Text style={[ Styles.fontColorWhite, Styles.padding5 ]} >Update</Text>
									</Button>
								}
								<Button success small onPress={ () => { this.setState({ addProduct: false }), this.props.feedProductData({ name: '', price: '', stock: '', points: '', isInven: false }) } } style={{ marginLeft: 10 }} >
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
							filtered.map(item => <ProductCard editFunction={this.onEditProduct} deleteFunction={this.props.deleteProduct} key={item.name} item={item} pressFunction={this.props.addItem} longPressFunction={this.onProductLongPress} />)
						}
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

const mapStateToProps = ({ product, alert }) => {
	return {product, alert}
}

const Products = connect(mapStateToProps, { addProduct, getProducts, postProduct, feedProductData, updateProduct, deleteProduct })(RProducts)

export {Products}