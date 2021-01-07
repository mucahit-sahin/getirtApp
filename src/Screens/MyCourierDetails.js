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
import database from '@react-native-firebase/database';
import ProductCard from '../Components/ProductCard';
import StatusIndicator from '../Components/StatusIndicator';
import {AuthContext} from '../Navigations/AuthProvider';
import Colors from '../Utils/Colors';

const MyCourierDetails = ({route, navigation}) => {
  const {data} = route.params;
  const {user} = React.useContext(AuthContext);
  const [customer, setCustomer] = React.useState();
  database()
    .ref(`/users/${data.userId}/`)
    .once('value')
    .then((snapshot) => {
      setCustomer(snapshot.val());
    });
  const confirmSure = () =>
    Alert.alert(
      'Emin misin?',
      'Siparişi bir sonraki aşamaya geçirmek istiyor musunuz?',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => nextStep()},
      ],
      {cancelable: false},
    );

  const nextStep = () => {
    if (data.orderStatus.toString() != '5') {
      database()
        .ref(`/userOrders/${data.userId}/${data.orderToken}/`)
        .update({
          orderStatus: (parseInt(data.orderStatus) + 1).toString(),
        });
      database()
        .ref(`/userOrders/${user.uid}/${data.orderToken}/`)
        .update({
          orderStatus: (parseInt(data.orderStatus) + 1).toString(),
        });
      Alert.alert('Başarılı', 'Başarıyla diğer adıma geçildi');
      navigation.navigate('MyOrders');
    }
  };
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
          <View style={styles.detailsHeader}>
            <Text style={{flex: 0.5, fontSize: 15, color: 'white'}}>Alıcı</Text>
            <Text
              style={{
                flex: 0.5,
                fontSize: 15,
                color: 'white',
                textAlign: 'center',
              }}>
              {data.fullName}
            </Text>
          </View>
          {customer && (
            <View style={styles.detailsHeader}>
              <Text style={{flex: 0.5, fontSize: 15, color: 'white'}}>
                Telefon Numarası
              </Text>
              <Text
                style={{
                  flex: 0.5,
                  fontSize: 15,
                  color: 'white',
                  textAlign: 'center',
                }}>
                {customer.phoneNumber}
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
          <ScrollView
            style={{height: 300, marginBottom: 10}}
            nestedScrollEnabled={true}>
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
      {parseInt(data.orderStatus) < 4 && (
        <TouchableOpacity style={styles.orderCompletion} onPress={confirmSure}>
          <Text style={{color: 'white'}}>Sipariş Durumunu Değiştir</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default MyCourierDetails;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    flexDirection: 'row',
    flex: 0.1,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mor,
  },
  headerText: {color: 'white', fontWeight: 'bold'},
  details: {
    margin: 5,
    padding: 5,
    backgroundColor: Colors.mor,
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
    padding: 5,
    margin: 5,
    flex: 0.05,
  },
});
