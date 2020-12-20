import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import MyCourierCard from '../Components/MyCourierCard';
import MyOrderCard from '../Components/MyOrderCard';

import Colors from '../Utils/Colors';

const MyOrders = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Siparişlerim</Text>
      </View>
      <ScrollView style={styles.orders}>
        <MyOrderCard
          username="mucahitsah"
          orderWeight={7.5}
          orderPrice={11}
          onPress={() => navigation.navigate('MyOrderDetails')}
        />
        <MyCourierCard
          username="mucahitsah"
          orderWeight={7.5}
          orderPrice={11}
          onPress={() => navigation.navigate('MyCourierDetails')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    flexDirection: 'row',
    flex: 0.1,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yesil,
  },
  headerText: {color: 'white', fontWeight: 'bold'},
  orders: {
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 0.9,
  },
});
