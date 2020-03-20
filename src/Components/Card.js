import React from 'react'
import { View } from 'react-native'

import Styles from '../Styles'

const Card = ({ children }) => {
	return (
		<View style={[Styles.padding15, Styles.backgroundLightGrey, Styles.borderRadius10]} >
			{children}
		</View>
	)
}

export { Card }