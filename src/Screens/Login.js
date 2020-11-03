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

const width = Dimensions.get('window').width;

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View></View>
        <View>
          <TextInput style={styles.text} placeholder="Username" />
          <TextInput
            style={styles.text}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.forget}>
          <TouchableOpacity>
            <Text style={styles.forgetText}>Forget Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View style={styles.login}>
            <Text style={styles.loginText}>Giriş Yap</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.sign}>
          <Text>Bir hesabın yok mu?</Text>
          <TouchableOpacity>
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
