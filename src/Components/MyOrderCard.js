import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from '../Utils/Colors';

const MyOrderCard = ({username, userImage, orderWeight, orderPrice}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={require('../Assets/user.png')}
        />
        <Text style={styles.headerText}>{username}</Text>
      </View>
      <View style={styles.status}>
        <View style={styles.circle}>
          <Text>{orderWeight} Kg</Text>
        </View>
        <View style={styles.circle}>
          <Text>{orderPrice} TL</Text>
        </View>
        <View style={styles.circle}>
          <Text>Tamamlandı</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyOrderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.turuncu,
    height: 100,
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {height: 30, width: 30},
  headerText: {alignItems: 'center', justifyContent: 'center', marginLeft: 10},
  status: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});
