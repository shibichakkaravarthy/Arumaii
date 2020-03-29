import React from 'react'
import { SafeAreaView, ScrollView, View, Text, LayoutAnimation, Platform, UIManager, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import { Form, Item, Input, Label, Button, Icon } from 'native-base'
import {connect} from 'react-redux'

import Styles from '../Styles'
import { Card, Row } from '../Components'

class RDashboard extends React.Component {
	constructor() {
		super();
		this.state = {}
	}

	render() {
		return(
			<SafeAreaView>
				<ScrollView>
					<Text>Dashboard</Text>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

const mapStateToProps = ({ dashboard }) => {
	return { dashboard }
}

export const Dashboard = connect(mapStateToProps, {})(RDashboard)