import React, {useState} from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon, Header, Body, Left, Right, Title } from 'native-base'
import {connect} from 'react-redux'

import Styles from '../Styles'
import { Card, Row } from '../Components'
import { addItem, removeItem } from '../Components/Actions'

const RConfirm = (props) => {
	console.log('props', props)
	return (
		<View style={[Styles.flex1]} >
			<View style={[Styles.flex1, Styles.flexRow]} >
				<View style={[Styles.flex3, Styles.margin5, Styles.borderRadius10, Styles.backgroundWhite, Styles.elevation10]} >
					<ScrollView>
						{
							props.cart.map((item, index) => {
								return <Row removeItem={() => props.removeItem(index) } key={item.name} index={index} name={item.name} price={item.price} quantity={item.quantity} points={item.points} />
							})
						}
					</ScrollView>
				</View>

				<View style={[Styles.flex2, Styles.margin5, Styles.borderRadius10, Styles.backgroundWhite, Styles.elevation10, Styles.padding10]} >
					<Text>Member</Text>
				</View>
			</View>
			<View>
				<Button block>
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

const Confirm = connect(mapStateToProps, { removeItem })(RConfirm)

export {Confirm}