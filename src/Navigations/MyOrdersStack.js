import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyOrderDetails from '../Screens/MyOrderDetails';
import MyCourierDetails from '../Screens/MyCourierDetails';
import MyOrders from '../Screens/MyOrders';

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="MyOrderDetails"
        component={MyOrderDetails}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="MyCourierDetails"
        component={MyCourierDetails}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
