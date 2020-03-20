import React, {useState} from 'react'
import { View, Text, TouchableOpacity, TextInput, PLatform, UIManager, LayoutAnimation } from 'react-native'
import { Form, Label, Item, Icon } from 'native-base'

import Styles from '../Styles'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Row = (props) => {

	const [isDeleted, deleteitem] = useState(false)

	console.log(props)
	return (
		<View>
			{
			(!isDeleted)
			?
			<View style={!isDeleted ? [ Styles.margin10, Styles.padding10, Styles.flexRow, Styles.borderRadius10, Styles.backgroundWhite, Styles.elevation5, Styles.alignCenter ] : [ Styles.margin10, Styles.padding10, Styles.flexRow, Styles.borderRadius10, Styles.backgroundColorPaleRed, Styles.fontColorWhite, Styles.elevation5, Styles.alignCenter ]} >
				<View style={[Styles.flex1]} >
					<TouchableOpacity onPress={() => {props.removeItem(props.index), LayoutAnimation.configureNext(LayoutAnimation.Presets.spring), deleteitem(true)}} >
						<Icon type='Ionicons' name='ios-close-circle' style={[Styles.fontColorPaleRed]} />
					</TouchableOpacity>
				</View>

				<View style={[Styles.flex1, Styles.flexRow]} >
					<TextInput placeholder='Quantity' onChangeText={quantity => props.quantityChange(props.index, quantity)} value={props.quantity.toString()} style={[{ height: 30, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, flex: 0.2, padding: 5, margin: 0 }, Styles.textAlignCenter]} />
				</View>

				<View style={[Styles.flex4]} >
					<Text>{props.name}</Text>
				</View>

				<View style={[Styles.flex1]} >
					<Text>{props.price}</Text>
				</View>

				<View style={[Styles.flex1]} >
					<Text>{props.points}</Text>
				</View>
			</View>
			:
			null
			}
		</View>
	)
}

export {Row}