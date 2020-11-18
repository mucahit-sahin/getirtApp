import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import OrderCard from '../Components/OrderCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Orders = () => {
  return (
    <View as={SafeAreaView} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Siparişler</Text>
      </View>
      <ScrollView style={styles.ordersList}>
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
        />
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  header: {
    flexDirection: 'row',
    backgroundColor: '#a560e8',
    height: windowHeight / 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {color: 'white', fontWeight: 'bold'},
  ordersList: {
    height: windowHeight / 1.3,
    marginTop: 10,
    paddingTop: 10,
    marginHorizontal: 10,
    borderRadius: 30,
  },
});
