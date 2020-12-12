import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import Providers from './Navigations/index';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <Providers />
    </>
  );
};
export default App;
