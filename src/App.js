import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import Login from './Screens/Login';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Login />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
