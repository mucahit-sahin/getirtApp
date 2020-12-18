import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import OrderCard from '../Components/OrderCard';
import citiesData from '../Data/iller.json';
import townData from '../Data/ilceler.json';

import Colors from '../Utils/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Orders = ({navigation}) => {
  const [selectedCities, setSelectedCities] = React.useState();
  const [selectedTown, setSelectedTown] = React.useState();
  return (
    <View as={SafeAreaView} style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>Siparişler</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            margin: 10,
          }}>
          <View
            style={{
              flex: 0.5,
              backgroundColor: 'white',
              borderRadius: 30,
              marginRight: 5,
            }}>
            <Picker
              selectedValue={selectedCities}
              style={{height: 50, width: windowWidth, fontSize: 15}}
              onValueChange={(itemValue) => setSelectedCities(itemValue)}>
              {citiesData?.map((a) => (
                <Picker.Item label={a.name} value={a.id} key={a.id} />
              ))}
            </Picker>
          </View>
          <View style={{flex: 0.5, backgroundColor: 'white', borderRadius: 30}}>
            <Picker
              selectedValue={selectedTown}
              style={{
                height: 50,
                width: windowWidth,
                fontSize: 20,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedTown(itemValue)
              }>
              {townData?.map((a) => (
                <Picker.Item label={a.name} value={a.id} key={a.id} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <ScrollView style={styles.ordersList}>
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
        <OrderCard
          userName="mucahitsah"
          mahalle="anadolu mah."
          ilce="Arnavutköy"
          orderWeight={3.5}
          price={12}
          onPress={() => navigation.navigate('OrderDetails')}
        />
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    backgroundColor: Colors.mor,
    flex: 0.2,
    height: windowHeight / 7,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {color: 'white', fontWeight: 'bold', fontSize: 20},
  ordersList: {
    flex: 0.8,
    marginTop: 10,
    paddingTop: 10,
    marginHorizontal: 10,
    borderRadius: 30,
  },
});
