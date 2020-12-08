import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import MyCourierCard from '../Components/MyCourierCard';
import MyOrderCard from '../Components/MyOrderCard';

import Colors from '../Utils/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyOrders = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Siparişlerim</Text>
      </View>
      <ScrollView style={styles.orders}>
        <MyOrderCard username="mucahitsah" orderWeight={7.5} orderPrice={11} />
        <MyCourierCard
          username="mucahitsah"
          orderWeight={7.5}
          orderPrice={11}
        />
        <MyOrderCard username="mucahitsah" orderWeight={7.5} orderPrice={11} />
        <MyOrderCard username="mucahitsah" orderWeight={7.5} orderPrice={11} />
        <MyCourierCard
          username="mucahitsah"
          orderWeight={7.5}
          orderPrice={11}
        />
        <MyCourierCard
          username="mucahitsah"
          orderWeight={7.5}
          orderPrice={11}
        />
        <MyOrderCard username="mucahitsah" orderWeight={7.5} orderPrice={11} />
        <MyOrderCard username="mucahitsah" orderWeight={7.5} orderPrice={11} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  header: {
    flexDirection: 'row',
    height: windowHeight / 10,
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
    height: windowHeight / 1.3,
    borderRadius: 10,
  },
});
