import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import ParkingSpace from './ParkingSpace';
import ParkingRegistor from './ParkingRegistor';
import DetailScreen from './DetailScreen';
import Booked from './Booked';
import {StyleSheet, Text} from 'react-native';
import ReplyFeedBack from './ReplyFeedBack';

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={25}
              color={'white'}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name="Parking" component={ParkingSpace} />
      <Stack.Screen name="RegistorParking" component={ParkingRegistor} />
    </Stack.Navigator>
  );
};
const BookedStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Book"
        component={Booked}
        options={{
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={25}
              color={'white'}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
const DetailStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Feed Back"
        component={ReplyFeedBack}
        options={{
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={25}
              color={'white'}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name="REPLYSCREEN" component={ReplyFeedBack} />
    </Stack.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{backgroundColor: '#009387'}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Booked"
        component={BookedStackScreen}
        options={{
          tabBarLabel: 'Book',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="receipt" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="FeedBack"
        component={DetailStackScreen}
        options={{
          tabBarLabel: 'Feed Back',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="receipt" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    color: '#fff',
    marginLeft: 10,
  },
});
