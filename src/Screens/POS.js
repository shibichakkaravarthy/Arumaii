import React, {Component} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'

import Styles from '../Styles'
import { Card } from '../Components'
import products from '../products.json'

const {width, height} = Dimensions.get('window')

class POS extends Component {
	constructor() {
		super();
		this.state = {}
	}

	render() {
		return (
			<SafeAreaView style={ Styles.flex1 } >
				<View style={[ Styles.flexRow, Styles.justifyCenter, Styles.padding10, Styles.backgroundWhite, Styles.borderColorPaleRed, { borderBottomWidth: 1 } ]} >
					<Form style={Styles.flex1} >
						<Item floatingLabel>
							<Label>Search</Label>
							<Input style={{ width: width*0.8 }} />
						</Item>
					</Form>
				</View>

				<ScrollView style={[ Styles.backgroundWhite, Styles.padding10 ]} >
					<Card>
						<Text>Product</Text>						
					</Card>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
					<Text>Product</Text>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

export {POS}