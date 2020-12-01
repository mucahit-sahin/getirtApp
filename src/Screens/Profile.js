import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';

import Colors from '../Utils/Colors';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImageView}>
        <Text>Profile</Text>
        <Image
          style={styles.profileImage}
          source={require('../Assets/user.png')}
        />
      </View>
      <View style={styles.aboutView}>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutRowText}>Ad: Mücahit</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutRowText}>Soyad: Şahin</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutRowText}>about</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutRowText}>about</Text>
        </View>
        <View style={styles.aboutAdres}>
          <Text style={styles.aboutRowText}>Adresiniz </Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  profileImageView: {
    height: windowHeight / 3,
    backgroundColor: Colors.yesil,
    width: windowWidth,
    borderBottomEndRadius: windowWidth / 2,
    borderBottomStartRadius: windowWidth / 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profileImage: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    borderRadius: windowWidth / 4,
  },
  aboutView: {
    height: windowHeight / 2,
    margin: 10,
    borderRadius: 10,
    borderColor: '#d0d2d3',
    borderWidth: 1,
  },
  aboutRow: {
    height: windowHeight / 16,
    backgroundColor: Colors.yesil,
    borderRadius: 10,
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutRowText: {
    fontSize: windowHeight / 32,
    color: 'white',
  },
  aboutAdres: {
    height: windowHeight / 4,
    backgroundColor: Colors.yesil,
    borderRadius: 10,
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
