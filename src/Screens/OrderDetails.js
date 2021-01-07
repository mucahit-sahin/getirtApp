import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ProductCard from '../Components/ProductCard';
import {AuthContext} from '../Navigations/AuthProvider';
import Colors from '../Utils/Colors';
import database from '@react-native-firebase/database';

const OrderDetails = ({route, navigation}) => {
  const {data} = route.params;
  const {user} = React.useContext(AuthContext);
  const [fromUser, setFromUser] = React.useState();

  React.useEffect(() => {
    database()
      .ref(`/users/${data.userId}/`)
      .once('value')
      .then((snapshot) => {
        setFromUser(snapshot.val());
      });
  }, []);
  const getOrder = () => {
    Alert.alert(
      'Emin misin?',
      'Siparişi gerçekten almak istiyor musun?',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            database()
              .ref(`/userOrders/${data.userId}/${data.token}/`)
              .update({
                orderStatus: (parseInt(data.orderStatus) + 1).toString(),
                courierId: user.uid,
              })
              .then(() => console.log('Data updated.'));
            database()
              .ref(`/userOrders/${user.uid}/${data.token}/`)
              .set({
                userId: data.userId,
                orderToken: data.token,
                orderData: data.orderData,
                city: data.city,
                town: data.town,
                address: data.address,
                orderPrice: data.orderPrice,
                totalWeight: data.totalWeight,
                orderStatus: (parseInt(data.orderStatus) + 1).toString(),
                courierId: user.uid,
                orderInfo: data.orderInfo,
                fullName: fromUser.name + ' ' + fromUser.surname,
              });
            database()
              .ref(`/orders/${data.city}/${data.town}/${data.token}/`)
              .remove();
            database().ref(`/users/${user.uid}/`).update({
              isWork: true,
            });
            Alert.alert(
              'Başarılı',
              'Siparişi başarıyla kabul ettiniz. Ana sayfaya yönlendiriyorsunuz ...',
            );
            navigation.navigate('Home');
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sipariş Detayları</Text>
      </View>
      <ScrollView style={styles.productDetails} nestedScrollEnabled={true}>
        <View style={styles.productUser}>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Image
              style={styles.profileImage}
              source={require('../Assets/user.png')}
            />
          </View>
          <View style={{flex: 0.8, alignItems: 'center'}}>
            <Text style={styles.productText}>{data.fullName}</Text>
          </View>
        </View>
        <View style={styles.productDescription}>
          <Text style={{fontSize: 15}}>{data.orderInfo}</Text>
        </View>
        <View style={styles.productDescription}>
          <Text style={{fontSize: 15}}>
            {data.address + ' ' + data.town + '/' + data.city}
          </Text>
        </View>
        <View style={styles.productsCard}>
          <View style={styles.orderInfo}>
            <View style={styles.orderInfoColum}>
              <Text style={{color: 'white'}}>{data.totalWeight} Kg</Text>
            </View>
            <View style={styles.orderInfoColum}>
              <Text style={{color: 'white'}}>{data.orderPrice} TL</Text>
            </View>
          </View>
          <ScrollView nestedScrollEnabled={true}>
            {data.orderData.map((product) => (
              <ProductCard
                productName={product.productName}
                productQuantity={product.productQuantity}
                productWeight={product.productWeight}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.confirmOrder} onPress={() => getOrder()}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Siparişi Getir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    flexDirection: 'row',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mor,
    flex: 0.1,
  },
  headerText: {color: 'white', fontWeight: 'bold'},
  productDetails: {
    margin: 5,
    padding: 5,
    backgroundColor: Colors.mor,
    flex: 0.8,
    borderRadius: 10,
  },
  productText: {color: 'white', fontSize: 30, justifyContent: 'center'},
  productUser: {flexDirection: 'row', marginVertical: 5},
  profileImage: {height: 50, width: 50},
  productDescription: {
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    height: 100,
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
    padding: 10,
    backgroundColor: Colors.mor,
    borderRadius: 10,
  },
  confirmOrder: {
    backgroundColor: Colors.mor,
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});
