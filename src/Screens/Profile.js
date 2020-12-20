import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import database from '@react-native-firebase/database';

import Colors from '../Utils/Colors';
import Logout from '../Components/icons/Logout';
import {AuthContext} from '../Navigations/AuthProvider';
import citiesData from '../Data/iller.json';
import townData from '../Data/ilceler.json';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Profile = () => {
  const {logout, user} = React.useContext(AuthContext);
  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [selectedCities, setSelectedCities] = React.useState();
  const [selectedTown, setSelectedTown] = React.useState();
  const [address, setAddress] = React.useState();

  React.useEffect(() => {
    database()
      .ref(`/users/${user.uid}/name`)
      .once('value')
      .then((snapshot) => {
        setName(snapshot.val());
      });
    database()
      .ref(`/users/${user.uid}/surname`)
      .once('value')
      .then((snapshot) => {
        setSurname(snapshot.val());
      });
    database()
      .ref(`/users/${user.uid}/phoneNumber`)
      .once('value')
      .then((snapshot) => {
        setPhoneNumber(snapshot.val());
      });
    database()
      .ref(`/users/${user.uid}/city`)
      .once('value')
      .then((snapshot) => {
        setSelectedCities(snapshot.val());
      });
    database()
      .ref(`/users/${user.uid}/town`)
      .once('value')
      .then((snapshot) => {
        setSelectedTown(snapshot.val());
      });
    database()
      .ref(`/users/${user.uid}/address`)
      .once('value')
      .then((snapshot) => {
        setAddress(snapshot.val());
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.profileImageView}>
        <Image
          style={styles.profileImage}
          source={require('../Assets/user.png')}
        />
        <View style={styles.displayName}>
          <Text style={styles.displayNameText}>{user.email}</Text>
        </View>
        <TouchableOpacity style={styles.logout} onPress={() => logout()}>
          <Logout color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutView}>
        <View style={styles.aboutViewRow}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Ad: </Text>
            {name ? name : <ActivityIndicator color="black" />}
          </Text>
        </View>
        <View style={styles.aboutViewRow}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Soyad: </Text>
            {surname ? surname : <ActivityIndicator color="black" />}
          </Text>
        </View>
        <View style={styles.aboutViewRow}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Telefon: </Text>
            {phoneNumber ? phoneNumber : <ActivityIndicator color="black" />}
          </Text>
        </View>
        <View style={[styles.aboutViewRow, {alignItems: 'center'}]}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>İl:</Text>
          <Picker
            selectedValue={selectedCities}
            style={{height: 50, width: windowWidth, fontSize: 20}}
            onValueChange={(itemValue) => setSelectedCities(itemValue)}>
            {citiesData?.map((a) => (
              <Picker.Item label={a.name} value={a.id} key={a.id} />
            ))}
          </Picker>
        </View>
        <View style={[styles.aboutViewRow, {alignItems: 'center'}]}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>İlçe:</Text>
          <Picker
            selectedValue={selectedTown}
            style={{height: 50, width: windowWidth, fontSize: 20}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTown(itemValue)
            }>
            {townData?.map((a) => (
              <Picker.Item label={a.name} value={a.id} key={a.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.aboutViewRow}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Adres: </Text>
            {address ? address : <ActivityIndicator color="black" />}
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Güncelle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  profileImageView: {
    flexDirection: 'row',
    backgroundColor: Colors.yesil,
    padding: 10,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    flex: 0.15,
  },
  profileImage: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: windowWidth / 10,
  },
  displayName: {justifyContent: 'center', marginLeft: 10},
  displayNameText: {fontWeight: 'bold', color: 'white', fontSize: 24},
  logout: {position: 'absolute', right: 10, top: 10},
  aboutView: {
    flex: 0.85,
    margin: 10,
    borderRadius: 10,
    borderColor: '#d0d2d3',
    borderWidth: 1,
    backgroundColor: Colors.yesil,
  },
  aboutViewRow: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.mor,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
});
