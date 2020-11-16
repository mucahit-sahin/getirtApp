import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import KuryeIcon from '../Components/icons/Kurye';
import SiparisIcon from '../Components/icons/Siparis';

const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}) => {
  return (
    <View as={SafeAreaView} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Baslık yada Logo</Text>
      </View>
      <View style={styles.kuryeCard}>
        <KuryeIcon width={100} />
        <Text style={styles.cardText}>Biraz para kazanmaya ne dersin?</Text>
      </View>
      <TouchableOpacity
        style={styles.siparisVerCard}
        onPress={() => navigation.navigate('CreateShoopingCart')}>
        <SiparisIcon width={100} />
        <Text style={styles.cardText}>Sipariş mi vermek istiyorsun?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8ee000',
    height: windowHeight * 0.35,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  kuryeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a560e8',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: windowHeight * 0.25,
  },
  siparisVerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc715',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: windowHeight * 0.25,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
  },
});
