import React, {useRef} from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import socker from '../socket/socker';

const ReplyFeedBack = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = React.useState('');
  const scrollViewRef = useRef();
  const {feedbackReply, accessToken, user} = useSelector((state) => {
    return {
      accessToken: state.accessToken,
      feedbackReply: state.feedbackReply,
      user: state.user,
    };
  });
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllReply();
    });
    return unsubscribe;
  });
  const getAllReply = async () => {
    console.log(accessToken, 'user ID', user._id);
    let data = await fetch(
      'http://app-d83895ee-04a8-4417-b70b-0873e8873a83.cleverapps.io/api/getMsg/' +
        user._id,
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
    console.log('DATA', data);
    dispatch({type: 'REPLYFEEDBACK', payload: data});
  };

  React.useEffect(() => {
    getAllReply();
  }, []);

  React.useEffect(() => {
    socker.on('msg receive', () => {
      getAllReply();
    });
  }, []);

  const onSend = async () => {
    if (msg !== '') {
      let data = await fetch(
        'http://app-d83895ee-04a8-4417-b70b-0873e8873a83.cleverapps.io/api/newMsg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
          body: JSON.stringify({ChatId: user._id, msg}),
        },
      )
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      dispatch({type: 'SENDMSG', payload: data});
      setMsg('');
      socker.emit('msg send', user._id);
    }
  };
  console.log('user', user._id, feedbackReply);
  return (
    <View>
      <View
        style={{
          height: '80%',
        }}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {!feedbackReply
            ? null
            : feedbackReply.length > 0
            ? feedbackReply.map((data) => {
                let timeAndDate = new Date(data.createdAt);
                return data.email === user.email ? (
                  <View
                    style={{
                      width: '50%',
                      backgroundColor: '#009387',
                      marginTop: 20,
                      marginRight: 20,
                      padding: 20,
                      borderRadius: 20,
                      alignSelf: 'flex-end',
                    }}
                    key={data._id}>
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
                    }}
                    key={data._id}>
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
