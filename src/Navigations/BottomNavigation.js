import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Orders from '../Screens/Orders';
import Profile from '../Screens/Profile';
import Login from '../Screens/Login';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
