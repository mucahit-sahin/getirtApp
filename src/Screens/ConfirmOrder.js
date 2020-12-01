import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ProductCard from '../Components/ProductCard';

import Colors from '../Utils/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ConfirmOrder = ({route}) => {
  const {data} = route.params;

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
            <Text style={[styles.infoText, {flex: 0.5}]}> 5 Kg</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.infoText}>Sepet Kurye Ücreti:</Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                flex: 0.5,
                color: 'black',
                borderRadius: 10,
              }}
              value="5"
            />
          </View>
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Siparişinizle ilgili açıklamalar yapabilirsiniz."
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <View style={styles.address}>
          <TextInput placeholder="adres (varsayılan olarak profilden çekilir)" />
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
      <TouchableOpacity style={styles.publishOrder}>
        <Text style={styles.publishText}>Siparişi Yayınla</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.yesil,
    height: windowHeight / 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {color: 'white', fontWeight: 'bold'},
  inputs: {
    flexDirection: 'column',
    backgroundColor: Colors.yesil,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    height: windowHeight / 1.4,
    padding: 10,
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
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  address: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
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
    height: windowHeight / 1.4 / 3,
  },
  publishOrder: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yesil,
    height: 60,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  publishText: {color: 'white', fontWeight: 'bold'},
});
