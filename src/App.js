import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import Login from './Screens/Login';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Login />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
