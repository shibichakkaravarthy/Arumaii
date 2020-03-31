import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Dashboard, ChartData} from '../Screens'

const Stack = createStackNavigator();

const DashboardWrapper = () => {
	console.log('hello', ChartData)
	return (	
	      <Stack.Navigator initialRouteName='SelectCustomer' >
	        <Stack.Screen name="Dashboard" component={Dashboard} />
	      </Stack.Navigator>
	)
}

export {DashboardWrapper}