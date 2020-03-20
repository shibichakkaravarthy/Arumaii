import React, {useState} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon, Header, Body, Left, Right, Title } from 'native-base'
import {connect} from 'react-redux'

import Styles from '../Styles'

const {width, height} = Dimensions.get('window')

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

const SelectCustomer = (props) => {

	const [mobile, mobileFeed] = useState('')

	return (
		<View style={[Styles.flex1]} >
			<View style={[ Styles.flexRow, Styles.justifyCenter, Styles.padding10, Styles.backgroundWhite, Styles.borderColorPaleRed, { borderBottomWidth: 1 } ]} >
				<Form style={Styles.flex1} >
					<Item inlineLabel>
						<Label>Customer Mobile</Label>
						<Input style={{ width: width*0.8 }} onChangeText={text => mobileFeed(text)} />
					</Item>
				</Form>
			</View>

			<View>
				<Row>
					<Text style={[Styles.flex2]} >Mobile Number</Text>
					<Text style={[Styles.flex3]} >Name</Text>
					<Text style={[Styles.flex1]} >Points</Text>
					<Text style={[Styles.flex1]} >Date Joined</Text>
					<View style={[Styles.flex1, Styles.flexRow, Styles.justifyCenter]} >
						<TouchableOpacity style={[ Styles.padding10, Styles.backgroundColorPaleRed, Styles.borderRadius5 ]} >
							<Text style={[ Styles.fontColorWhite ]} >View</Text>
						</TouchableOpacity>
					</View>
				</Row>
			</View>

			<View style={[Styles.elevation10, { position: 'absolute', right: 30, bottom: 30 }]} >
				<Button rounded onPress={() => props.navigation.navigate('BillDesk')} >
					<Text style={[Styles.margin10, Styles.fontColorWhite]} >Go to BillDesk</Text>
					<Icon type='MaterialCommunityIcons' name='cart-arrow-right' />
				</Button>
			</View>
		</View>
	)
}

export {SelectCustomer}