import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const OrderCard = ({
  userName,
  userImage,
  mahalle,
  ilce,
  orderWeight,
  price,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={require('../Assets/user.png')}
        />
        <Text style={styles.headerText}>{userName}</Text>
      </View>
      <View style={styles.data}>
        <View style={styles.address}>
          <Text>{mahalle}</Text>
          <Text>{ilce}</Text>
        </View>
        <View style={styles.weight}>
          <Text style={styles.text}>{orderWeight} Kg</Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.text}>{price} TL</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#f2f6fa',
    height: 100,
    borderRadius: 10,
    marginVertical: 5,
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {height: 30, width: 30},
  headerText: {alignItems: 'center', justifyContent: 'center', marginLeft: 10},
  data: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    flexDirection: 'column',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 100,
    height: 50,
  },
  weight: {
    backgroundColor: '#a560e8',
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  price: {
    backgroundColor: '#a560e8',
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  text: {color: 'white'},
});
