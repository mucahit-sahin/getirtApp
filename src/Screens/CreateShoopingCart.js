import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import ProductCard from '../Components/ProductCard';

import Colors from '../Utils/Colors';

const windowWidth = Dimensions.get('window').width;

const CreateShoopingCart = ({navigation}) => {
  const [productName, setProductName] = React.useState('');
  const [productWeight, setProductWeight] = React.useState('');
  const [productQuantity, setProductQuantity] = React.useState('');
  const [products, setProducts] = React.useState([]);

  const addProduct = () => {
    if (productName != '' && productWeight != '' && productQuantity != '') {
      var newArray = [
        ...products,
        {productName, productWeight, productQuantity},
      ];
      setProducts(newArray);
      setProductName('');
      setProductQuantity('');
      setProductWeight('');
    }
  };

  return (
    <View as={SafeAreaView} style={styles.container}>
      <View style={styles.inputs}>
        <TextInput
          placeholder="Ürün adı"
          onChangeText={(text) => setProductName(text)}
          value={productName}
          style={styles.input}
        />
        <View style={styles.numbers}>
          <TextInput
            keyboardType="numeric"
            placeholder="Ürün Tane Ağırlıgı"
            style={styles.input}
            onChangeText={(text) => setProductWeight(text)}
            value={productWeight}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Ürün Adeti"
            style={styles.input}
            onChangeText={(text) => setProductQuantity(text)}
            value={productQuantity}
          />

          <TouchableOpacity onPress={() => addProduct()} style={styles.button}>
            <Text style={styles.buttonText}>Sepete Ekle</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.shoppingList}>
        <FlatList
          data={products}
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
      {products.length > 0 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('ConfirmOrder', {data: products})}
          style={styles.totalView}>
          <Text style={styles.totalViewText}>Sepeti Onayla</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.totalView}>
          <Text style={styles.totalViewText}>Sepet Boş</Text>
        </View>
      )}
    </View>
  );
};

export default CreateShoopingCart;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    backgroundColor: Colors.yesil,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    borderColor: '#cfcfcf',
    backgroundColor: 'white',
  },
  numbers: {flexDirection: 'row'},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14d4f4',
    borderRadius: 10,
    margin: 5,
    width: windowWidth / 3,
  },
  buttonText: {color: 'white'},
  shoppingList: {margin: 10, borderRadius: 10, flex: 0.65},
  totalView: {
    backgroundColor: Colors.yesil,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },
  totalViewText: {color: 'white', fontWeight: 'bold'},
});
