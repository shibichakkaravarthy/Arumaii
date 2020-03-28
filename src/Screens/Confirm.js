import React, {useState} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon, Header, Body, Left, Right, Title } from 'native-base'
import moment from 'moment'
import {connect} from 'react-redux'

import Styles from '../Styles'
import { Card, Row } from '../Components'
import { addItem, removeItem, payBill } from '../Components/Actions'

const RConfirm = (props) => {

	const reRoute = () => {
		props.navigation.navigate('SelectCustomer')
	}
	console.log('props', props)
	return (
		<View style={[Styles.flex1]} >
			<View style={[Styles.flex1, Styles.flexRow]} >
				<View style={[Styles.flex3, Styles.margin5, Styles.borderRadius10, Styles.backgroundWhite, Styles.elevation10]} >
					<ScrollView>
						{
							props.cart.cart.map((item, index) => {
								return <Row removeItem={() => props.removeItem(index) } key={item.name} index={index} name={item.name} price={item.price} quantity={item.quantity} points={item.points} />
							})
						}
					</ScrollView>
				</View>

				<View style={[Styles.flex2, Styles.margin5, Styles.borderRadius10, Styles.backgroundWhite, Styles.elevation10, Styles.padding10]} >
					<View style={[ Styles.padding10, Styles.elevation10 ]} >
						<Text style={[ Styles.fontSize16, Styles.fontColorPaleRed, Styles.margin5 ]} >Card Number: {props.cart.customer.cardNo}</Text>
						<Text style={[ Styles.fontSize16, Styles.fontColorPaleRed, Styles.margin5 ]} >Name: {props.cart.customer.name}</Text>
						<Text style={[ Styles.fontSize16, Styles.fontColorPaleRed, Styles.margin5 ]} >Mobile: +91 {props.cart.customer.mobile}</Text>
						<View style={[Styles.flexRow, Styles.justifySpaceBetween, Styles.alignCenter]} >
							<Text style={[ Styles.fontSize16, Styles.fontColorPaleRed, Styles.margin5 ]} >Current Points: {(props.cart.customer.ponits) ? props.cart.customer.points : 0}</Text>
							<Text style={[ Styles.fontSize16, Styles.fontColorPaleRed, Styles.margin5 ]} >Joined On: {moment(props.cart.customer.joined).format('DD MMM YYYY')}</Text>
						</View>
					</View>
				</View>
			</View>
			<View>
				<Button block onPress={ () => props.payBill(reRoute) } >
					<Text style={[Styles.fontColorWhite]} >Pay</Text>
				</Button>
			</View>
		</View>
	)
}

const mapStateToProps = ({ cart }) => {
	return { cart }
}

console.log(Confirm)

const Confirm = connect(mapStateToProps, { removeItem, payBill })(RConfirm)

export {Confirm}