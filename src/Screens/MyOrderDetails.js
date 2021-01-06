import database from '@react-native-firebase/database';
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
import StatusIndicator from '../Components/StatusIndicator';
import {AuthContext} from '../Navigations/AuthProvider';
import Colors from '../Utils/Colors';

const MyOrderDetails = ({route}) => {
  const {data} = route.params;
  const {user} = React.useContext(AuthContext);
  const [courierName, setCourierName] = React.useState();
  database()
    .ref(`/users/${data.courierId}/`)
    .once('value')
    .then((snapshot) => {
      setCourierName(snapshot.val().name + ' ' + snapshot.val().surname);
    });
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
        {
          text: 'Evet',
          onPress: () => {
            if (data.orderStatus.toString() == '4') {
              database()
                .ref(`/userOrders/${data.courierId}/${data.orderToken}/`)
                .update({
                  orderStatus: '5',
                });
              database()
                .ref(`/userOrders/${user.uid}/${data.orderToken}/`)
                .update({
                  orderStatus: '5',
                });
              database().ref(`/users/${data.courierId}/`).update({
                isWork: false,
              });

              Alert.alert('Başarılı', 'Sipariş Başarlı bir şekilde tamamlandı');
            }
          },
        },
      ],
      {cancelable: false},
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sipariş Detayları</Text>
      </View>
      <ScrollView style={styles.details} nestedScrollEnabled={true}>
        <View
          style={{
            marginVertical: 5,
            borderWidth: 1,
            borderColor: 'white',
            padding: 10,
            borderRadius: 10,
            flex: 0.3,
          }}>
          {courierName && (
            <View style={styles.detailsHeader}>
              <Text style={{flex: 0.5, fontSize: 15, color: 'white'}}>
                Kurye Adı :
              </Text>
              <Text
                style={{
                  flex: 0.5,
                  fontSize: 15,
                  color: 'white',
                  textAlign: 'center',
                }}>
                {courierName && courierName}
              </Text>
            </View>
          )}

          <StatusIndicator position={data.orderStatus} />
        </View>

        <View style={styles.productDescription}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Açıklama: </Text>
            {data.orderInfo}
          </Text>
        </View>
        <View style={styles.productDescription}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Adres: </Text>
            {data.address + ' ' + data.town + '/' + data.city}
          </Text>
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
              {data.totalWeight} Kg
            </Text>
            <Text
              style={{
                flex: 0.5,
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              {data.orderPrice} TL
            </Text>
          </View>
          <ScrollView style={{height: 300}} nestedScrollEnabled={true}>
            {data.orderData &&
              data.orderData.map((product) => (
                <ProductCard
                  productName={product.productName}
                  productQuantity={product.productQuantity}
                  productWeight={product.productWeight}
                />
              ))}
          </ScrollView>
        </View>
      </ScrollView>
      {parseInt(data.orderStatus) == 4 && (
        <TouchableOpacity style={styles.orderCompletion} onPress={confirmSure}>
          <Text style={{color: 'white'}}>Siparişin Geldigini Onayla</Text>
        </TouchableOpacity>
      )}
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
    flex: 0.35,
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
  productDescription: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: 'white',
    flex: 0.15,
    borderRadius: 10,
  },
  orderCompletion: {
    backgroundColor: Colors.yesil,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    flex: 0.05,
    marginVertical: 5,
  },
});
