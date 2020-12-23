import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import database from '@react-native-firebase/database';

import MyCourierCard from '../Components/MyCourierCard';
import MyOrderCard from '../Components/MyOrderCard';

import Colors from '../Utils/Colors';
import {AuthContext} from '../Navigations/AuthProvider';

const MyOrders = ({navigation}) => {
  const {user} = React.useContext(AuthContext);
  const [orders, setOrders] = React.useState([]);
  database()
    .ref(`/userOrders/${user.uid}/`)
    .once('value')
    .then((snapshot) => {
      setOrders(Object.values(snapshot.val()));
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Siparişlerim</Text>
      </View>

      <ScrollView style={styles.orders}>
        {orders &&
          orders.map((order) => (
            <MyOrderCard
              username={order.orderToken}
              orderWeight={order.totalWeight}
              orderPrice={order.orderPrice}
              orderStatus={order.orderStatus}
              onPress={() =>
                navigation.navigate('MyOrderDetails', {data: order})
              }
            />
          ))}
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
