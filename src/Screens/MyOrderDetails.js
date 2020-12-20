import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ProductCard from '../Components/ProductCard';
import Colors from '../Utils/Colors';

const MyOrderDetails = () => {
  const confirmSure = () =>
    Alert.alert(
      'Emin misin?',
      'Siparişinizin size ulaştığını onaylıyor musunuz?',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sipariş Detayları</Text>
      </View>
      <View style={styles.details}>
        <View
          style={{
            marginVertical: 5,
            borderWidth: 1,
            borderColor: 'white',
            padding: 10,
            borderRadius: 10,
          }}>
          <View style={styles.detailsHeader}>
            <Text style={{flex: 0.5, fontSize: 20, color: 'white'}}>Kurye</Text>
            <Text
              style={{
                flex: 0.5,
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              Yok
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 0.5, fontSize: 20, color: 'white'}}>
              Siparis Durumu
            </Text>
            <Text
              style={{
                flex: 0.5,
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              Kişi Bekleniyor
            </Text>
          </View>
        </View>

        <View style={styles.productDescription}>
          <Text>Açıklama</Text>
        </View>
        <View style={styles.productDescription}>
          <Text>Adress</Text>
        </View>

        <View style={styles.productList}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              backgroundColor: Colors.yesil,
              borderRadius: 10,
            }}>
            <Text
              style={{
                flex: 0.5,
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              10 Kg
            </Text>
            <Text
              style={{
                flex: 0.5,
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              16 TL
            </Text>
          </View>
          <ScrollView>
            <ProductCard
              productName="ürün"
              productQuantity={1}
              productWeight={100}
            />
            <ProductCard
              productName="ürün"
              productQuantity={1}
              productWeight={100}
            />
            <ProductCard
              productName="ürün"
              productQuantity={1}
              productWeight={100}
            />
            <ProductCard
              productName="ürün"
              productQuantity={1}
              productWeight={100}
            />
            <ProductCard
              productName="ürün"
              productQuantity={1}
              productWeight={100}
            />
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.orderCompletion} onPress={confirmSure}>
          <Text style={{color: 'white'}}>Siparişin Geldigini Onayla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyOrderDetails;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    flexDirection: 'row',
    flex: 0.1,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.turuncu,
  },
  headerText: {color: 'white', fontWeight: 'bold'},
  details: {
    margin: 5,
    padding: 5,
    backgroundColor: Colors.turuncu,
    flex: 0.9,
    borderRadius: 10,
    padding: 10,
  },
  detailsHeader: {flexDirection: 'row'},
  productList: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
  productDescription: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: 'white',
    height: 100,
    borderRadius: 10,
  },
  orderCompletion: {
    backgroundColor: Colors.yesil,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    bottom: 5,
    right: 10,
    left: 10,
  },
});
