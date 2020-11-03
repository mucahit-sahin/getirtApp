import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import Login from './Screens/Login';
import Signup from './Screens/Signup';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <Login /> */}
      <Signup />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
