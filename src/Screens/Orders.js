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

import Colors from '../Utils/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Orders = ({navigation}) => {
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
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
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
    backgroundColor: Colors.mor,
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
