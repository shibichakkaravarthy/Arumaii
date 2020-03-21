import React from 'react'
import { View, TouchableOpacity } from 'react-native'

const CommonRow = ({children, pressFunction}) => {
	return (
		<TouchableOpacity onPress={pressFunction} >
			<View style={[ Styles.margin10, Styles.padding10, Styles.flexRow, Styles.borderRadius10, Styles.elevation5, Styles.alignCenter, Styles.backgroundWhite ]} >
				{ children }
			</View>
		</TouchableOpacity>
	)
}

export {CommonRow}