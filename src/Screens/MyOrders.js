import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import database from '@react-native-firebase/database';
import MyCourierCard from '../Components/MyCourierCard';
import MyOrderCard from '../Components/MyOrderCard';

import Colors from '../Utils/Colors';
import {AuthContext} from '../Navigations/AuthProvider';

const MyOrders = ({navigation}) => {
  const {user} = React.useContext(AuthContext);
  const [orders, setOrders] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
    database()
      .ref(`/userOrders/${user.uid}/`)
      .once('value', (snapshot) => {
        if (snapshot.val()) setOrders(Object.values(snapshot.val()));
      });
  }, []);

  React.useEffect(() => {
    const onValueChange = database()
      .ref(`/userOrders/${user.uid}/`)
      .on('value', (snapshot) => {
        if (snapshot.val()) setOrders(Object.values(snapshot.val()));
      });
    return () =>
      database().ref(`/userOrders/${user.uid}/`).off('value', onValueChange);
  }, [user]);

  const refreshMyOrders = async () => {
    setRefresh(true);
    setOrders([]);
    database()
      .ref(`/userOrders/${user.uid}/`)
      .once('value', (snapshot) => {
        if (snapshot.val()) setOrders(Object.values(snapshot.val()));
      });
    setRefresh(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Siparişlerim</Text>
      </View>

      <ScrollView
        style={styles.orders}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={refreshMyOrders} />
        }>
        {orders.length > 0 ? (
          orders.map((order) =>
            order.courierId == user.uid ? (
              <MyCourierCard
                key={order.token}
                username={order.fullName}
                orderWeight={order.totalWeight}
                orderPrice={order.orderPrice}
                orderStatus={order.orderStatus}
                onPress={() =>
                  navigation.navigate('MyCourierDetails', {data: order})
                }
              />
            ) : (
              <MyOrderCard
                key={order.token}
                username={order.fullName}
                orderWeight={order.totalWeight}
                orderPrice={order.orderPrice}
                orderStatus={order.orderStatus}
                onPress={() =>
                  navigation.navigate('MyOrderDetails', {data: order})
                }
              />
            ),
          )
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Siparişiniz yok.</Text>
          </View>
        )}
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
