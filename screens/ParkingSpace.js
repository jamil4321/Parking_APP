import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Surface,
  Modal,
  Portal,
  Text,
  Provider,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';

const Parking = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {parkingSpace, accessToken} = useSelector((state) => {
    return {
      parkingSpace: state.parkingSpace,
      accessToken: state.accessToken,
    };
  });

  const getPArkingViewData = async () => {
    console.log(route.params.key);
    let data = await fetch('http://192.168.0.111:2000/api/getParking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({laneId: route.params.key}),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
    console.log(data);
    dispatch({type: 'VIEWPARKINGSPACE', payload: data});
  };
  React.useEffect(() => {
    const func = async () => await getPArkingViewData();
    func();
  }, []);
  const [pakringid, setParkingId] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const onPressShowModal = (id) => {
    setVisible(true);
    setParkingId(id);
  };
  const hideModal = () => {
    setVisible(false);
    setParkingId('');
  };
  const [fromTime, setFromTime] = React.useState(new Date());
  const [toTime, SetToTime] = React.useState(new Date());
  const [showFromTime, setShowFromTime] = React.useState(false);
  const [showToTime, setShowToTime] = React.useState(false);

  const onChangeFromDate = (event, selectedDate) => {
    console.log('date', selectedDate);
    const currentDate = selectedDate || date;
    setShowFromTime(Platform.OS === 'ios');
    setFromTime(currentDate);
  };
  const onChangeToDate = (event, selectedDate) => {
    console.log('date', selectedDate);
    const currentDate = selectedDate || date;
    setShowToTime(Platform.OS === 'ios');
    SetToTime(currentDate);
  };
  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: Dimensions.get('screen').width - 100,
    alignSelf: 'center',
  };
  console.log(parkingSpace, accessToken);

  const onSubmitPress = async () => {
    if (toTime > fromTime) {
      let body = {
        id: pakringid,
        startTime: fromTime,
        endTime: toTime,
      };
      let data = await fetch('http://192.168.0.111:2000/api/bookedParking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      alert(data.message);
      dispatch({type: 'BookedParking', payload: body});
      setVisible(false);
      setParkingId('');
      setFromTime(new Date());
      SetToTime(new Date());
    }
  };
  return (
    <Provider>
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}>
            {parkingSpace.length > 0
              ? parkingSpace.map((data) => {
                  let time = new Date();
                  let endTime = new Date(data.endTime);
                  let backgroundColor = 'orange';
                  let disable = false;
                  console.log(time, endTime, time > endTime);
                  if (time < endTime) {
                    backgroundColor = 'red';
                    disable = true;
                  }
                  return (
                    <TouchableOpacity
                      onPress={() => onPressShowModal(data.id)}
                      disabled={disable}
                      key={data.id}>
                      <Surface
                        style={[
                          styles.surface,
                          {backgroundColor: backgroundColor},
                        ]}>
                        <Text
                          style={{
                            color: 'white',
                            textAlign: 'center',
                          }}>
                          {data.name}
                        </Text>
                      </Surface>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text
            style={{
              alignContent: 'center',
              textAlign: 'center',
              fontSize: 30,
            }}>
            Select Your Time{' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <Text
              style={{
                alignContent: 'center',
                textAlign: 'center',
                fontSize: 25,
                marginRight: 12,
              }}>
              {String(formatAMPM(fromTime))}
            </Text>
            <Button
              onPress={() => setShowFromTime(!showFromTime)}
              title="Pick your Start Time"
            />
            {showFromTime && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromTime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={(event, selectedDate) =>
                  onChangeFromDate(event, selectedDate)
                }
              />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <Text
              style={{
                alignContent: 'center',
                textAlign: 'center',
                fontSize: 25,
                marginRight: 12,
              }}>
              {String(formatAMPM(toTime))}
            </Text>
            <Button
              onPress={() => setShowToTime(!showToTime)}
              title="   Pick Your End Time   "
            />
            {showToTime && (
              <DateTimePicker
                testID="dateTimePicker"
                value={toTime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={(event, selectedDate) =>
                  onChangeToDate(event, selectedDate)
                }
              />
            )}
          </View>

          <View style={{marginTop: 30}}>
            <Button onPress={onSubmitPress} title="Submit" />
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
export default Parking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  cardBorder: {
    width: Dimensions.get('screen').width / 5,
    borderRadius: 20,
    margin: 5,
  },
  surface: {
    padding: 8,
    height: 80,
    width: Dimensions.get('screen').width / 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 20,
  },
});
