import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
  Provider,
  Portal,
  Modal,
  Text,
  TextInput,
  Divider,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const DetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {feedbacks, accessToken} = useSelector((state) => {
    return {
      feedbacks: state.feedbacks,
      accessToken: state.accessToken,
    };
  });
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [msg, setMSG] = React.useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [loading, setLoading] = React.useState(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: Dimensions.get('screen').width - 100,
    alignSelf: 'center',
  };

  const createNewFeedBack = () => {
    if (title !== '' && msg !== '') {
      let data = fetch('http://192.168.0.111:2000/api/newfeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({title, msg}),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      getFeedBackByUser();
    }
  };
  const getFeedBackByUser = async () => {
    setLoading(true);
    let data = await fetch('http://192.168.0.111:2000/api/getfeedbackbyuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
    console.log(data);

    dispatch({type: 'GETFEEDBACKS', payload: data});

    setLoading(false);
  };
  React.useEffect(() => {
    getFeedBackByUser();
  }, []);
  console.log(feedbacks, Dimensions.get('screen').width);
  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View>
            <ScrollView>
              {feedbacks.length > 0
                ? feedbacks.map((data) => {
                    return (
                      <View key={data.id} style={{margin: 20}}>
                        <Card>
                          <Card.Title
                            title={data.title}
                            subtitle={data.user}
                            left={LeftContent}
                          />
                          <Card.Content>
                            <Title> {data.msg}</Title>
                          </Card.Content>
                          <Divider />
                          <Card.Actions
                            style={{
                              right: '-180%',
                            }}>
                            <Button
                              onPress={() =>
                                navigation.navigate('REPLYSCREEN', {
                                  key: data.id,
                                })
                              }>
                              Reply
                            </Button>
                          </Card.Actions>
                        </Card>
                      </View>
                    );
                  })
                : null}
            </ScrollView>
          </View>
          <Provider>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}>
                <Text>Give Your Feedback</Text>
                <TextInput
                  label="Title"
                  mode="outlined"
                  value={title}
                  style={{
                    marginTop: 20,
                  }}
                  onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                  label="Message"
                  mode="outlined"
                  multiline={true}
                  style={{
                    marginTop: 20,
                  }}
                  value={msg}
                  onChangeText={(text) => setMSG(text)}
                />
                <Button
                  mode="contained"
                  style={{
                    marginTop: 20,
                  }}
                  onPress={() => createNewFeedBack()}>
                  Send
                </Button>
              </Modal>
            </Portal>
            <FAB style={styles.fab} small icon="plus" onPress={showModal} />
          </Provider>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default DetailScreen;
