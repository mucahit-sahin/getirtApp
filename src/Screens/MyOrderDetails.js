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
  Modal,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

import ProductCard from '../Components/ProductCard';
import StatusIndicator from '../Components/StatusIndicator';
import {AuthContext} from '../Navigations/AuthProvider';
import Colors from '../Utils/Colors';

const MyOrderDetails = ({route, navigation}) => {
  const {data} = route.params;
  const {user} = React.useContext(AuthContext);
  const [courier, setCourier] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [rating, setRating] = React.useState();
  database()
    .ref(`/users/${data.courierId}/`)
    .once('value')
    .then((snapshot) => {
      setCourier(snapshot.val());
    });
  const scoring = () => {
    database()
      .ref(`/users/${data.courierId}/rating`)
      .once('value')
      .then((snapshot) => {
        database()
          .ref(`/users/${data.courierId}/`)
          .update({
            rating: (snapshot.val() + rating) / 2,
          });
        database()
          .ref(`/userOrders/${data.courierId}/${data.orderToken}/`)
          .update({
            rating: (snapshot.val() + rating) / 2,
          });
        database()
          .ref(`/userOrders/${user.uid}/${data.orderToken}/`)
          .update({
            rating: (snapshot.val() + rating) / 2,
          });
      });
    setModalVisible(false);
    navigation.navigate('MyOrders');
  };
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
              setModalVisible(true);
              Alert.alert('Başarılı', 'Sipariş Başarıyla Tamamlandı.');
            }
          },
        },
      ],
      {cancelable: false},
    );

  const orderCancel = () => {
    Alert.alert('Emin misin?', 'Siparişi silmek istiyor musun?', [
      {
        text: 'Hayır',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Evet',
        onPress: () => {
          database()
            .ref(`/userOrders/${user.uid}/${data.orderToken}/`)
            .remove();
          database()
            .ref(`/orders/${data.city}/${data.town}/${data.orderToken}`)
            .remove();
          navigation.navigate('MyOrders');
        },
      },
    ]);
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
          {courier && (
            <>
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
                  {courier.name + ' ' + courier.surname}
                </Text>
              </View>
              <View style={styles.detailsHeader}>
                <Text style={{flex: 0.5, fontSize: 15, color: 'white'}}>
                  Kurye Telefon No :
                </Text>
                <Text
                  style={{
                    flex: 0.5,
                    fontSize: 15,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {courier.phoneNumber}
                </Text>
              </View>
            </>
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
      {parseInt(data.orderStatus) == 1 && (
        <TouchableOpacity
          style={styles.orderCancel}
          onPress={() => orderCancel()}>
          <Text style={{color: 'white'}}>Siparişi İptal Et</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Hizmetle ilgili puanınız. Kaydırarak seçiniz.</Text>
            <AirbnbRating
              count={5}
              reviews={['Çok Kötü', 'Kötü', 'İdare Eder', 'İyi', 'Çok İyi']}
              defaultRating={3}
              size={50}
              onFinishRating={(value) => setRating(value)}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.ratingButton}
                onPress={() => scoring()}>
                <Text>Puanı Onayla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  orderCancel: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    flex: 0.05,
    margin: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingButton: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
