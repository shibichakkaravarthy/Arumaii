
import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import FlashMessage from "react-native-flash-message";

import { BillDesk } from './src/Navigator'
import { Products, Expense, Customer } from './src/Screens'
import Reducers from './src/Components/Reducers'
import NavigationService from './src/NavigationService'

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>No Content to Show</Text>
      <Image source={require('./src/dummy.jpg')} style={{ width: 240, height: 140 }} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk))
  return (
    <Provider store={store} >
      <View style={{ flex: 1 }} >
        <NavigationContainer ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef);}} >
          <Tab.Navigator>
            <Tab.Screen name="Bill" component={BillDesk} options={{tabBarIcon: () => <Icon type="Ionicons" name="ios-list" />}} />
            <Tab.Screen name="Products" component={Products} options={{tabBarIcon: () => <Icon type="FontAwesome" name="dropbox" />}} />
            <Tab.Screen name="Customers" component={Customer} options={{tabBarIcon: () => <Icon type="Ionicons" name="ios-people" />}} />
            <Tab.Screen name="Expenses" component={Expense} options={{tabBarIcon: () => <Icon type="Ionicons" name="ios-calculator" />}} />
            <Tab.Screen name="Dashboard" component={DetailsScreen} options={{tabBarIcon: () => <Icon type="AntDesign" name="piechart" />}} />
          </Tab.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
}

export default App;