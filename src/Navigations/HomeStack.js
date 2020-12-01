import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Screens/Home';
import CreateShoopingCart from '../Screens/CreateShoopingCart';
import Orders from '../Screens/Orders';
import ConfirmOrder from '../Screens/ConfirmOrder';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CreateShoopingCart"
        component={CreateShoopingCart}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
