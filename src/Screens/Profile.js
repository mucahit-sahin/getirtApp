import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
  ScrollView,
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

  const [userData, setUserData] = React.useState({});
  const [selectedCities, setSelectedCities] = React.useState('İl seçiniz');
  const [selectedTown, setSelectedTown] = React.useState('İlçe seçiniz');
  const [address, setAddress] = React.useState('');
  const [isAdressChange, setIsAdressChange] = React.useState(false);

  const [townList, setTownList] = React.useState([]);

  React.useEffect(() => {
    database()
      .ref(`/users/${user.uid}/`)
      .once('value')
      .then((snapshot) => {
        setUserData(snapshot.val());
      });
  }, []);

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
      <ScrollView style={styles.aboutView}>
        <View style={styles.aboutViewRow}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Ad: </Text>
            {userData ? userData.name : <ActivityIndicator color="black" />}
          </Text>
        </View>
        <View style={styles.aboutViewRow}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Soyad: </Text>
            {userData ? userData.surname : <ActivityIndicator color="black" />}
          </Text>
        </View>
        <View style={styles.aboutViewRow}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Telefon: </Text>
            {userData ? (
              userData.phoneNumber
            ) : (
              <ActivityIndicator color="black" />
            )}
          </Text>
        </View>
        <View style={[styles.aboutViewRow, {alignItems: 'center'}]}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>İl: </Text>
            {userData ? userData.city : <ActivityIndicator color="black" />}
          </Text>
        </View>
        <View style={[styles.aboutViewRow, {alignItems: 'center'}]}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>İlçe: </Text>
            {userData ? userData.town : <ActivityIndicator color="black" />}
          </Text>
        </View>
        <View style={styles.aboutViewRow}>
          <Text style={{fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Adres: </Text>
            {userData ? userData.address : <ActivityIndicator color="black" />}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsAdressChange(true)}>
        <Text style={styles.buttonText}>Adres Güncelle</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAdressChange}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
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
            {selectedTown !== 'İlçe seçiniz' && (
              <View style={styles.formRow}>
                <View style={{flex: 0.3}}>
                  <Text style={styles.label}>Adres:</Text>
                </View>
                <View style={{flex: 0.7}}>
                  <TextInput
                    style={styles.picker}
                    multiline={true}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                  />
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
                  if (
                    !selectedCities.trim() ||
                    !selectedTown.trim() ||
                    !address.trim()
                  ) {
                    alert('Lütfen alanları boş bırakmayın!');
                  } else {
                    database()
                      .ref(`/users/${user.uid}/`)
                      .update({
                        city: selectedCities,
                        town: selectedTown,
                        address: address,
                      })
                      .then(() => console.log('Data updated.'));
                    database()
                      .ref(`/users/${user.uid}/`)
                      .once('value')
                      .then((snapshot) => {
                        setUserData(snapshot.val());
                      });
                    setSelectedCities('İl seçiniz');
                    setSelectedTown('İlçe seçiniz');
                    setAddress('');
                    setIsAdressChange(!isAdressChange);
                  }
                }}>
                <Text style={styles.textStyle}>Güncelle</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: '#2196F3',
                  flex: 1,
                }}
                onPress={() => {
                  setSelectedCities('İl seçiniz');
                  setSelectedTown('İlçe seçiniz');
                  setAddress('');
                  setIsAdressChange(!isAdressChange);
                }}>
                <Text style={styles.textStyle}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    flex: 0.2,
  },
  profileImage: {
    width: '20%',
    height: '100%',
    borderRadius: windowWidth / 10,
  },
  displayName: {justifyContent: 'center', marginLeft: 10},
  displayNameText: {fontWeight: 'bold', color: 'white', fontSize: 24},
  logout: {position: 'absolute', right: 10, top: 10},
  aboutView: {
    flex: 0.7,
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
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
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
