import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import socket from '../socket/socker';

const BookedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    socket.on('Canceled', () => {
      getAllUserBookings();
    });
  });
  const {totalBookings, accessToken} = useSelector((state) => {
    return {
      totalBookings: state.totalBookings,
      accessToken: state.accessToken,
    };
  });
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

  const onCancelOrder = async (id) => {
    let data = await fetch(
      'http://app-d83895ee-04a8-4417-b70b-0873e8873a83.cleverapps.io/api/cencelBooking',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({id}),
      },
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
    console.log(data);
    alert(data.message);
    dispatch({type: 'CANCELORDER', payload: id});
  };
  const getAllUserBookings = async () => {
    let data = await fetch(
      'http://app-d83895ee-04a8-4417-b70b-0873e8873a83.cleverapps.io/api/allBookingByUser',
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
    console.log(data);
    dispatch({type: 'BOOKINGS', payload: data});
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const func = async () => await getAllUserBookings();
      func();
    });
    return unsubscribe;
  });
  React.useEffect(() => {
    const func = async () => await getAllUserBookings();
    func();
  }, []);
  if (totalBookings.length > 0) {
    totalBookings.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {totalBookings.length > 0
          ? totalBookings.map((data) => {
              let currentTime = new Date();
              let startTime = new Date(data.startTime);
              let endTime = new Date(data.endTime);
              let disableButton = false;
              let status = 'Booked';
              if (!data.isBooking) {
                status = 'Canceled';
                disableButton = true;
              } else if (data.isBooking && currentTime > endTime) {
                status = 'Done';
                disableButton = true;
              } else if (currentTime < startTime) {
                status = 'Pending';
              } else if (data.isBooking && currentTime > startTime) {
                status = 'Arived';
                disableButton = true;
              }
              return (
                <View key={data.id}>
                  <Card style={styles.cardBorder} key={data.id}>
                    <Card.Content>
                      <Title>Booking ID : {data.id}</Title>
                      <Paragraph>Parking Space : {data.parkingSpace}</Paragraph>
                      <Paragraph>
                        Start Time :
                        {`${formatAMPM(startTime)}  ${startTime.getDate()}-${
                          startTime.getMonth() + 1
                        }-${startTime.getFullYear()}`}
                      </Paragraph>
                      <Paragraph>
                        End Time :
                        {`${formatAMPM(endTime)}  ${endTime.getDate()}-${
                          endTime.getMonth() + 1
                        }-${endTime.getFullYear()}`}
                      </Paragraph>
                      <Paragraph> Booking Status: {status}</Paragraph>

                      {status === 'Pending' ? (
                        <Paragraph style={{marginTop: 40}}>
                          <Button
                            mode="contained"
                            onPress={() => onCancelOrder(data.id)}>
                            Cencel Booking
                          </Button>
                        </Paragraph>
                      ) : null}
                    </Card.Content>
                  </Card>
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};
export default BookedScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  cardBorder: {
    width: Dimensions.get('screen').width - 40,
    borderRadius: 20,
    margin: 20,
    textAlign: 'center',
  },
  ButtonAling: {
    marginRight: 100,
  },
});
