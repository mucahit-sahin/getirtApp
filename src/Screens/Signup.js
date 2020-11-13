import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const width = Dimensions.get('window').width;

const Signup = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <TextInput style={styles.text} placeholder="Email" />
        <TextInput style={styles.text} placeholder="Display Name" />
        <TextInput style={styles.text} placeholder="Username" />
        <TextInput
          style={styles.text}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity>
          <View style={styles.signup}>
            <Text style={styles.signupText}>Üye Ol</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.login}>
        <Text>Have an account?</Text>
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
