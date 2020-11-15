import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Screens/Home';
import CreateShoopingCart from '../Screens/CreateShoopingCart';

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
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
