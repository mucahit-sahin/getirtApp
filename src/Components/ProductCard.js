import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProductCard = ({productName, productWeight, productQuantity}) => {
  return (
    <View style={styles.container}>
      <View style={styles.productHeader}>
        <Text>{productName}</Text>
      </View>
      <View style={styles.numbers}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{productWeight}</Text>
          <Text style={styles.circleText}>gr</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{productQuantity}</Text>
          <Text style={styles.circleText}>Adet</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>
            {parseFloat(productQuantity) * parseFloat(productWeight)}
          </Text>
          <Text style={styles.circleText}>Toplam gr</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#8ee000',
    borderRadius: 20,
    margin: 5,
  },
  productHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  numbers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 37.5,
    width: 75,
    height: 50,
  },
  circleText: {color: 'black'},
});
