/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet, Text} from 'react-native';
import MainTabScreen from './screens/MainTabScreen';
import {DrawerContent} from './screens/DrawerContent';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketCon from './socket/socker';
import {useDispatch, useSelector} from 'react-redux';

import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Reducer from './store/reducer';

// For Middleware
const middleWare = [thunk];
// Initial State
const initialState = {
  user: [],
  accessToken: '',
  lane: [],
  parkingSpace: [],
  totalBookings: [],
  feedbacks: [],
  feedbackReply: [],
};
// Compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Created
const store = createStore(
  Reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare)),
);

import {createStore, applyMiddleware, compose} from 'redux';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => {
    return {
      user: state.user,
    };
  });
  React.useEffect(() => {
    socketCon.on('connected', (data) => {
      console.log('update');
    });
  });

  console.log(user, 'userData');
  return (
    <NavigationContainer>
      {!user || !user.name ? (
        <RootStackScreen />
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    color: '#fff',
    marginLeft: 10,
  },
});

export default App;
