import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SigninScreen = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassWord, setConfirmPassWord] = React.useState('');
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [secureEntryConfirmPass, setSecureEntryConfirmPass] = React.useState(
    true,
  );
  const [checkEamilValid, setEmailValid] = React.useState(false);
  React.useEffect(() => {
    validate();
  }, [email]);
  const validate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };
  const submitSignUp = async () => {
    if (
      name !== '' &&
      email !== '' &&
      checkEamilValid &&
      password !== '' &&
      confirmPassWord !== ''
    ) {
      if (password === confirmPassWord) {
        let data = await fetch('http://192.168.0.111:2000/api/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, name, password}),
        })
          .then((res) => res.json())
          .then((data) => data)
          .catch((err) => err);
        alert(data.message);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassWord('');
        navigation.goBack();
      } else {
        alert('Password is not Matched');
      }
    } else if (!checkEamilValid) {
      alert('Please Enter a valid Email Address');
    } else {
      alert('All Feild Are Required');
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#05375a" barStyle="light-content" />
      <View style={[styles.header, {marginTop: 10}]}>
        <Text style={styles.text_header}>Sign Up Now!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 15,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            {checkEamilValid ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 15,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              secureTextEntry={secureEntry}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
              {secureEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 15,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              secureTextEntry={secureEntryConfirmPass}
              autoCapitalize="none"
              onChangeText={(text) => setConfirmPassWord(text)}
              value={confirmPassWord}
            />
            <TouchableOpacity
              onPress={() =>
                setSecureEntryConfirmPass(!secureEntryConfirmPass)
              }>
              {secureEntryConfirmPass ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => submitSignUp()}
              style={styles.signIn}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={[styles.textSign, {color: '#fff'}]}> Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#009387',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
