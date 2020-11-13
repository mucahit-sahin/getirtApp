import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import BottomNavigation from './Navigations/BottomNavigation';
import SignNavigation from './Navigations/SignNavigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <Login /> */}
      {/*<SignNavigation />*/}
      <BottomNavigation />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
