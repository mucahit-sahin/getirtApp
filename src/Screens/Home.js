import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';

import KuryeIcon from '../Components/icons/Kurye';
import SiparisIcon from '../Components/icons/Siparis';
import {AuthContext} from '../Navigations/AuthProvider';

import Colors from '../Utils/Colors';

const Home = ({navigation}) => {
  const {user} = React.useContext(AuthContext);
  database()
    .ref(`/users/${user.uid}/`)
    .once('value')
    .then((snapshot) => {
      if (!snapshot.val()) {
        navigation.navigate('UserDetailsForm');
      }
    });

  return (
    <View as={SafeAreaView} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Getirt</Text>
      </View>
      <TouchableOpacity
        style={styles.kuryeCard}
        onPress={() => {
          database()
            .ref(`/users/${user.uid}/`)
            .once('value')
            .then((snapshot) => {
              if (!snapshot.val()) {
                navigation.navigate('UserDetailsForm');
              } else {
                if (!snapshot.val().isWork) {
                  navigation.navigate('Orders');
                } else {
                  Alert.alert(
                    'Uyarı',
                    'Mevcut işiniz bitmeden yeni bir iş alamazsınız !',
                  );
                }
              }
            });
        }}>
        <KuryeIcon height="100%" width="25%" />
        <Text style={styles.cardText}>Biraz para kazanmaya ne dersin?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.siparisVerCard}
        onPress={() => {
          database()
            .ref(`/users/${user.uid}/`)
            .once('value')
            .then((snapshot) => {
              if (!snapshot.val()) {
                navigation.navigate('UserDetailsForm');
              } else {
                navigation.navigate('CreateShoopingCart');
              }
            });
        }}>
        <SiparisIcon height="100%" width="25%" />
        <Text style={styles.cardText}>Sipariş mi vermek istiyorsun?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yesil,
    flex: 0.4,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  kuryeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mor,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flex: 0.3,
  },
  siparisVerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.turuncu,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flex: 0.3,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
