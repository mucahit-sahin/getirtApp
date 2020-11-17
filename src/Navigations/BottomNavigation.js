import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MyOrders from '../Screens/MyOrders';
import Profile from '../Screens/Profile';
import HomeStackScreen from '../Navigations/HomeStack';

import PackageIcon from '../Components/icons/Package';
import HomeIcon from '../Components/icons/Home';
import ProfileIcon from '../Components/icons/User';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Siparişlerim"
          component={MyOrders}
          options={{
            tabBarIcon: ({color, size}) => (
              <PackageIcon name="MyOrders" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, size}) => (
              <HomeIcon name="Home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <ProfileIcon name="Profile" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
