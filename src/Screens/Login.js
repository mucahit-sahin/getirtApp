import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {AuthContext} from '../Navigations/AuthProvider';

const width = Dimensions.get('window').width;

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const {login} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View></View>
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
        </View>
        <View style={styles.forget}>
          <TouchableOpacity>
            <Text style={styles.forgetText}>Şifremi Unuttum</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => login(email, password)}>
          <View style={styles.login}>
            <Text style={styles.loginText}>Giriş Yap</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.sign}>
          <Text>Bir hesabın yok mu?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signText}>Üye ol.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b7fdf8',
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
  login: {
    width: width - 40,
    marginTop: 10,
    backgroundColor: 'green',
    borderRadius: width - 40 / 2,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
  },
  forget: {
    marginTop: 20,
    width: width - 40,
  },
  forgetText: {
    color: 'gray',
    textAlign: 'right',
  },
  sign: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signText: {
    color: 'gray',
    marginLeft: 5,
  },
});
