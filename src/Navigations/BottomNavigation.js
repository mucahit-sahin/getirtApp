import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Orders from '../Screens/Orders';
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
          name="Orders"
          component={Orders}
          options={{
            tabBarIcon: ({color, size}) => (
              <PackageIcon name="Orders" color={color} size={size} />
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
          name="Profile"
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
