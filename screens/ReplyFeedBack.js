import React from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
const ReplyFeedBack = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = React.useState('');
  const {feedbackReply, accessToken, user} = useSelector((state) => {
    return {
      accessToken: state.accessToken,
      feedbackReply: state.feedbackReply,
      user: state.user,
    };
  });
  const getAllReply = async () => {
    let data = await fetch('http://192.168.0.111:2000/api/getreplyfeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({feedbackId: route.params.key}),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
    console.log(data);
    dispatch({type: 'REPLYFEEDBACK', payload: data});
  };

  React.useEffect(() => {
    getAllReply();
  }, []);
  console.log(feedbackReply, route.params.key);

  const onSend = async () => {
    if (msg !== '') {
      let data = await fetch('http://192.168.0.111:2000/api/replyfeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({feedbackId: route.params.key, msg}),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      dispatch({type: 'SENDMSG', payload: data});
    }
  };
  return (
    <View>
      <View
        style={{
          height: '80%',
        }}>
        <ScrollView>
          {feedbackReply.length > 0
            ? feedbackReply.map((data) => {
                let timeAndDate = new Date(data.createdAt);
                return data.user === user.email ? (
                  <View
                    style={{
                      width: '50%',
                      backgroundColor: '#009387',
                      marginTop: 20,
                      marginRight: 20,
                      padding: 20,
                      borderRadius: 20,
                      alignSelf: 'flex-end',
                    }}>
                    <Text style={{fontSize: 24, color: 'white'}}>
                      {data.msg}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'white',
                      }}>{`${timeAndDate.getHours()}:${timeAndDate.getMinutes()}  ${timeAndDate.getDate()}/${
                      timeAndDate.getMonth() + 1
                    }`}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: '50%',
                      backgroundColor: '#3bb3a9',
                      marginTop: 20,
                      marginLeft: 20,
                      padding: 20,
                      borderRadius: 20,
                      alignSelf: 'flex-start',
                    }}>
                    <Text style={{fontSize: 20, color: 'white'}}>
                      {data.msg}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'white',
                      }}>{`${timeAndDate.getHours()}:${timeAndDate.getMinutes()}  ${timeAndDate.getDate()}/${
                      timeAndDate.getMonth() + 1
                    }`}</Text>
                  </View>
                );
              })
            : null}
        </ScrollView>
      </View>
      <View
        style={{
          height: '15%',
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          width: '95%',
          alignSelf: 'center',
        }}>
        <TextInput
          label="Type Your Message"
          style={{width: '78%', marginTop: 2}}
          value={msg}
          onChangeText={(text) => setMsg(text)}
        />
        <Button
          style={{width: '20%', margin: 5}}
          mode="contained"
          onPress={() => onSend()}>
          Send
        </Button>
      </View>
    </View>
  );
};

export default ReplyFeedBack;
