import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import SignNavigation from './Navigations/SignNavigation';
import Login from './Screens/Login';
import Signup from './Screens/Signup';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <Login /> */}
      <SignNavigation />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
