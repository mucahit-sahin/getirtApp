import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';

import Colors from '../Utils/Colors';
import citiesData from '../Data/iller.json';
import townData from '../Data/ilceler.json';
import {AuthContext} from '../Navigations/AuthProvider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserDetailsForm = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedCities, setSelectedCities] = React.useState('İl seçiniz');
  const [selectedTown, setSelectedTown] = React.useState('İlçe seçiniz');
  const [address, setAddress] = React.useState('');
  const [uyari, setUyari] = React.useState('');
  const [townList, setTownList] = React.useState([]);

  const {user} = React.useContext(AuthContext);

  const registerProfile = () => {
    if (
      !name.trim() ||
      !surname.trim() ||
      !phoneNumber.trim() ||
      !selectedCities.trim() ||
      !selectedTown.trim() ||
      !address.trim()
    ) {
      setUyari('Lütfen Alanları Boş Bırakmayın.');
    } else {
      setUyari('');
      //database kayıt
      database()
        .ref(`/users/${user.uid}/`)
        .set({
          name: name,
          surname: surname,
          phoneNumber: phoneNumber,
          city: selectedCities,
          town: selectedTown,
          address: address,
        })
        .then(() => setUyari('Profil Tamamlandı'));
      navigation.navigate('Home');
    }
  };
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{justifyContent: 'center'}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Kullanı Bilgileri</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>{uyari}</Text>

            <View style={styles.formRow}>
              <Text style={styles.label}>Ad:</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Soyadı:</Text>
              <TextInput
                style={styles.textInput}
                value={surname}
                onChangeText={(text) => setSurname(text)}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Tel No:</Text>
              <TextInput
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>İl:</Text>
              <Picker
                selectedValue={selectedCities}
                style={styles.textInput}
                onValueChange={(itemValue) => changeTownList(itemValue)}>
                {citiesData?.map((a) => (
                  <Picker.Item label={a.name} value={a.name} key={a.id} />
                ))}
              </Picker>
            </View>
            {selectedCities !== 'İl seçiniz' ? (
              <View style={styles.formRow}>
                <Text style={styles.label}>İlçe:</Text>
                <Picker
                  selectedValue={selectedTown}
                  style={styles.textInput}
                  onValueChange={(itemValue) => setSelectedTown(itemValue)}>
                  {townList?.map((a) => (
                    <Picker.Item label={a.name} value={a.name} key={a.id} />
                  ))}
                </Picker>
              </View>
            ) : (
              <ActivityIndicator color="black" />
            )}
            {selectedTown !== 'İlçe seçiniz' && (
              <View style={styles.formRow}>
                <Text style={styles.label}>Adres:</Text>
                <TextInput
                  style={styles.textInput}
                  multiline={true}
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => registerProfile()}>
            <Text style={styles.submitText}>Profilini Tamamla</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UserDetailsForm;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  header: {
    flexDirection: 'row',
    height: windowHeight / 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yesil,
  },
  headerText: {color: 'white', fontWeight: 'bold', fontSize: 20},
  form: {
    height: windowHeight / 1.3,
    backgroundColor: Colors.yesil,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 0.3,
    textAlign: 'center',
  },
  textInput: {
    color: 'black',
    fontSize: 20,
    backgroundColor: 'white',
    flex: 0.7,
    borderRadius: 10,
  },
  submit: {
    flexDirection: 'row',
    backgroundColor: Colors.yesil,
    height: 50,
    padding: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  submitText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
