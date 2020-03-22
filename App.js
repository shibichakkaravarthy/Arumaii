
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import { BillDesk } from './src/Navigator'
import Reducers from './src/Components/Reducers'

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pingalika Pilaappi</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk))
  return (
    <Provider store={store} >
      <View style={{ flex: 1 }} >
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Bill" component={BillDesk} options={{tabBarIcon: () => <Icon type="Ionicons" name="ios-list" />}} />
            <Tab.Screen name="Products" component={DetailsScreen} options={{tabBarIcon: () => <Icon type="FontAwesome" name="dropbox" />}} />
            <Tab.Screen name="Customers" component={DetailsScreen} options={{tabBarIcon: () => <Icon type="Ionicons" name="ios-people" />}} />
            <Tab.Screen name="Expenses" component={DetailsScreen} options={{tabBarIcon: () => <Icon type="Ionicons" name="ios-calculator" />}} />
            <Tab.Screen name="Dashboard" component={DetailsScreen} options={{tabBarIcon: () => <Icon type="AntDesign" name="piechart" />}} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

export default App;