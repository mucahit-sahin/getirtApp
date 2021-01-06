import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';

import ProductCard from '../Components/ProductCard';
import {AuthContext} from '../Navigations/AuthProvider';

import Colors from '../Utils/Colors';

const ConfirmOrder = ({route, navigation}) => {
  const {data} = route.params;
  const {user} = React.useContext(AuthContext);

  const [totalWeight, setTotalWeight] = React.useState('');
  const [orderPrice, setOrderPrice] = React.useState('5');
  const [orderInfo, setOrderInfo] = React.useState('');
  const [userData, setUserData] = React.useState({});

  function getUniqueId() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  const orderPublish = () => {
    if (
      !totalWeight.trim() ||
      !orderPrice.trim() ||
      !orderInfo.trim() ||
      !userData
    ) {
      Alert.alert('Hata', 'Lütfen alanları boş bırakmayın.', [{text: 'OK'}], {
        cancelable: false,
      });
    } else {
      var token = getUniqueId();
      database()
        .ref(`/orders/${userData.city}/${userData.town}/${token}/`)
        .set({
          userId: user.uid,
          orderData: data,
          city: userData.city,
          town: userData.town,
          address: userData.address,
          orderPrice: orderPrice,
          totalWeight: totalWeight,
          orderStatus: '1',
          courierId: 0,
          orderInfo: orderInfo,
          fullName: userData.name + ' ' + userData.surname,
          token: token,
        });
      database()
        .ref(`/userOrders/${user.uid}/${token}/`)
        .set({
          userId: user.uid,
          orderToken: token,
          orderData: data,
          city: userData.city,
          town: userData.town,
          address: userData.address,
          orderPrice: orderPrice,
          totalWeight: totalWeight,
          orderStatus: '1',
          courierId: 0,
          orderInfo: orderInfo,
          fullName: userData.name + ' ' + userData.surname,
        });
      Alert.alert(
        'Başarılı',
        'Siparişiniz yayınlandı. Ana sayfaya yönlendiriliyorsunuz...',
        [{text: 'OK', onPress: () => navigation.navigate('Home')}],
        {cancelable: false},
      );
    }
  };

  React.useEffect(() => {
    var x = 0;
    data.forEach((element) => {
      x += element.productWeight * element.productQuantity;
    });
    setTotalWeight((x / 1000).toString());

    database()
      .ref(`/users/${user.uid}/`)
      .once('value')
      .then((snapshot) => {
        setUserData(snapshot.val());
      });
  }, []);

  return (
    <View as={SafeAreaView} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sepeti Onayla</Text>
      </View>
      <ScrollView style={styles.inputs}>
        <View style={styles.info}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.infoText}>Sepet Ağırlığı:</Text>
            <Text style={[styles.infoText, {flex: 0.5}]}>{totalWeight} Kg</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.infoText}>Sepet Kurye Ücreti (TL):</Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                flex: 0.5,
                color: 'black',
                borderRadius: 10,
              }}
              value={orderPrice}
              onChangeText={(a) => setOrderPrice(a)}
            />
          </View>
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={{flex: 1}}
            placeholder="Siparişinizle ilgili açıklamalar yapabilirsiniz."
            value={orderInfo}
            onChangeText={(a) => setOrderInfo(a)}
          />
        </View>
        <View style={styles.address}>
          <Text style={{fontSize: 18}}>
            <Text style={{fontWeight: 'bold'}}>Adres:</Text>
            {userData.address + ' ' + userData.town + '/' + userData.city}
          </Text>
        </View>
        <ScrollView style={styles.shoppingList}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.productName}
            renderItem={({item}) => (
              <ProductCard
                productName={item.productName}
                productWeight={item.productWeight}
                productQuantity={item.productQuantity}
              />
            )}
          />
        </ScrollView>
      </ScrollView>
      <TouchableOpacity
        style={styles.publishOrder}
        onPress={() => orderPublish()}>
        <Text style={styles.publishText}>Siparişi Yayınla</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.yesil,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  headerText: {color: 'white', fontWeight: 'bold'},
  inputs: {
    flexDirection: 'column',
    backgroundColor: Colors.yesil,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    flex: 0.8,
  },
  info: {flexDirection: 'column', flex: 1},
  infoText: {
    color: 'white',
    padding: 5,
    flex: 1,
  },
  weight: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 1,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
  address: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
  shoppingList: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  publishOrder: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yesil,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    flex: 0.1,
  },
  publishText: {color: 'white', fontWeight: 'bold'},
});
