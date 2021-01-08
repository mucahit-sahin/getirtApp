import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AuthContext} from '../Navigations/AuthProvider';
import Colors from '../Utils/Colors';

const width = Dimensions.get('window').width;

const Signup = ({navigation}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);

  const {register} = React.useContext(AuthContext);

  const signup = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Hata', 'Lütfen alanları boş bırakmayın.', [{text: 'OK'}], {
        cancelable: false,
      });
    } else if (password != confirmPassword) {
      Alert.alert('Hata', 'Şifreler birbiriyle uyuşmuyor!', [{text: 'OK'}], {
        cancelable: false,
      });
    } else {
      register(email, password);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{width: 100, height: 100}}
          source={require('../Assets/logo.png')}
        />
      </View>
      <View>
        <TextInput
          style={styles.text}
          placeholder="Email"
          onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <TextInput
          style={styles.text}
          placeholder="Password"
          onChangeText={(userPassword) => setPassword(userPassword)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.text}
          placeholder="Confirm Password"
          onChangeText={(userConfirmPassword) =>
            setConfirmPassword(userConfirmPassword)
          }
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => signup()}>
          <View style={styles.signup}>
            <Text style={styles.signupText}>Üye Ol</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.login}>
        <Text>Bir Hesabın var mı?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yesil,
  },
  text: {
    width: width - 40,
    marginTop: 10,
    backgroundColor: '#fafafa',
    textShadowColor: 'black',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
    borderRadius: 10,
  },
  signup: {
    width: width - 40,
    marginTop: 40,
    backgroundColor: 'green',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {color: 'white'},
  login: {
    marginTop: 50,
    flexDirection: 'row',
  },
  loginText: {
    color: 'blue',
    marginLeft: 5,
  },
});
