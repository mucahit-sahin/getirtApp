import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../Components/ProductCard';
import Colors from '../Utils/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OrderDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sipariş Detayları</Text>
      </View>
      <ScrollView style={styles.productDetails} nestedScrollEnabled={true}>
        <View style={styles.productUser}>
          <Image
            style={styles.profileImage}
            source={require('../Assets/user.png')}
          />
          <Text style={styles.productText}>username</Text>
        </View>
        <View style={styles.productDescription}>
          <Text>Açıklama</Text>
        </View>
        <View style={styles.productDescription}>
          <Text>Adress</Text>
        </View>
        <View style={styles.productsCard}>
          <View style={styles.orderInfo}>
            <View style={styles.orderInfoColum}>
              <Text style={{color: 'white'}}>15 Kg</Text>
            </View>
            <View style={styles.orderInfoColum}>
              <Text style={{color: 'white'}}>30 TL</Text>
            </View>
          </View>
          <ScrollView nestedScrollEnabled={true}>
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
      </ScrollView>
      <TouchableOpacity style={styles.confirmOrder}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Siparişi Getir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  header: {
    flexDirection: 'row',
    height: windowHeight / 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mor,
  },
  headerText: {color: 'white', fontWeight: 'bold'},
  productDetails: {
    margin: 5,
    padding: 5,
    backgroundColor: Colors.mor,
    height: windowHeight / 1.4,
    borderRadius: 10,
  },
  productText: {color: 'white', fontSize: 30, justifyContent: 'center'},
  productUser: {flexDirection: 'row'},
  profileImage: {height: 50, width: 50},
  productDescription: {
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    height: 150,
    borderRadius: 10,
  },
  productsCard: {
    margin: 5,
    backgroundColor: 'white',
    height: 300,
    borderRadius: 10,
    paddingBottom: 5,
  },
  orderInfo: {flexDirection: 'row'},
  orderInfoColum: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: Colors.mor,
    borderRadius: 10,
  },
  confirmOrder: {
    backgroundColor: Colors.mor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});
