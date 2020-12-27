import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import {Picker} from '@react-native-picker/picker';

import OrderCard from '../Components/OrderCard';
import citiesData from '../Data/iller.json';
import townData from '../Data/ilceler.json';
import Colors from '../Utils/Colors';
import Filter from '../Components/icons/Filter';
import {AuthContext} from '../Navigations/AuthProvider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Orders = ({navigation}) => {
  const [orderList, setOrderList] = React.useState();
  const {user} = React.useContext(AuthContext);
  const [selectedCities, setSelectedCities] = React.useState('İl seçiniz');
  const [selectedTown, setSelectedTown] = React.useState('İlçe seçiniz');
  const [isAdressChange, setIsAdressChange] = React.useState(true);
  const [townList, setTownList] = React.useState([]);

  const changeTownList = (itemValue) => {
    setSelectedCities(itemValue);
    townList.splice(0, townList.length);
    townList.push();
    citiesData.map((a) => {
      if (a.name == itemValue) {
        townData.map((b) => {
          if (a.id == b.il_id) {
            townList.push(b);
          }
        });
        setSelectedTown(townList[0].name);
        return;
      }
    });
  };
  return (
    <View as={SafeAreaView} style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 0.9, alignItems: 'center'}}>
          <Text style={styles.headerText}>Siparişler</Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 0.1,
            justifyContent: 'center',
            padding: 10,
          }}
          onPress={() => setIsAdressChange(!isAdressChange)}>
          <Filter stroke="white" />
        </TouchableOpacity>
      </View>
      {orderList ? (
        <ScrollView style={styles.ordersList}>
          {orderList.length > 0 ? (
            orderList.map((order) => (
              <OrderCard
                userName={order.fullName}
                mahalle={order.city}
                ilce={order.town}
                orderWeight={order.totalWeight}
                price={order.orderPrice}
                onPress={() =>
                  navigation.navigate('OrderDetails', {data: order})
                }
              />
            ))
          ) : (
            <View
              style={[
                styles.ordersList,
                {alignItems: 'center', justifyContent: 'center'},
              ]}>
              <Text>Bu adreste sipariş bulunamadı</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.ordersList,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <ActivityIndicator color="black" />
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={isAdressChange}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.formRow}>
              <View style={{flex: 0.3}}>
                <Text style={styles.label}>İl:</Text>
              </View>
              <View style={{flex: 0.7}}>
                <Picker
                  selectedValue={selectedCities}
                  style={styles.picker}
                  onValueChange={(itemValue) => changeTownList(itemValue)}>
                  {citiesData?.map((a) => (
                    <Picker.Item label={a.name} value={a.name} key={a.id} />
                  ))}
                </Picker>
              </View>
            </View>
            {selectedCities !== 'İl seçiniz' && (
              <View style={styles.formRow}>
                <View style={{flex: 0.3}}>
                  <Text style={styles.label}>İlçe:</Text>
                </View>
                <View style={{flex: 0.7}}>
                  <Picker
                    selectedValue={selectedTown}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedTown(itemValue)}>
                    {townList?.map((a) => (
                      <Picker.Item label={a.name} value={a.name} key={a.id} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: '#2196F3',
                  flex: 1,
                }}
                onPress={() => {
                  if (!selectedCities.trim() || !selectedTown.trim()) {
                    alert('Lütfen alanları boş bırakmayın!');
                  } else {
                    database()
                      .ref(`/orders/${selectedCities}/${selectedTown}/`)
                      .once('value')
                      .then((snapshot) => {
                        setOrderList();
                        setOrderList(Object.values(snapshot.val()));
                      });
                    setIsAdressChange(!isAdressChange);
                  }
                }}>
                <Text style={styles.textStyle}>Filtrele</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.mor,
    flex: 0.1,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {color: 'white', fontWeight: 'bold', fontSize: 20},
  ordersList: {
    flex: 0.9,
    marginTop: 10,
    paddingTop: 10,
    marginHorizontal: 10,
    borderRadius: 30,
  },
  centeredView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(100,100,100, 0.5)',
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: Colors.yesil,
    borderRadius: 15,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  picker: {
    color: 'white',
  },
});
