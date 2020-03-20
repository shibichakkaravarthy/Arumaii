import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { POS, Confirm, SelectCustomer } from '../Screens'

const Stack = createStackNavigator();

const BillDesk = () => {
	return (	
	      <Stack.Navigator initialRouteName='Customer' >
	        <Stack.Screen name="BillDesk" component={POS} />
	        <Stack.Screen name="Confirm" component={Confirm} />
	        <Stack.Screen name="Customer" component={SelectCustomer} />
	      </Stack.Navigator>
	)
}

export {BillDesk}