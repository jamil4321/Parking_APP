import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import socker from '../socket/socker';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {lane, accessToken} = useSelector((state) => {
    return {
      lane: state.lane,
      accessToken: state.accessToken,
    };
  });
  React.useEffect(() => {
    socker.on('UpdateLane', (data) => {
      console.log('UpdateLane', data);
      getAllLane();
    });
  }, []);
  const getAllLane = async () => {
    let data = await fetch(
      'http://app-d83895ee-04a8-4417-b70b-0873e8873a83.cleverapps.io/api/getLane',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
    dispatch({type: 'GETLANE', payload: data});
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const func = async () => await getAllLane();
      func();
    });
    return unsubscribe;
  });
  React.useEffect(() => {
    const func = async () => await getAllLane();
    func();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {lane.length > 0
          ? lane.map((data) => (
              <TouchableOpacity
                key={data.id}
                onPress={() => navigation.navigate('Parking', {key: data.id})}>
                <Card style={styles.cardBorder} key={data.id}>
                  <Card.Content>
                    <Title>Lane Title : {data.name}</Title>
                    <Paragraph>
                      Total Parking Space : {data.totalPakringSpace}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  cardBorder: {
    width: Dimensions.get('screen').width - 40,
    borderRadius: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});
