import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Surface } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';



const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Button onPress={() => setShow(!show)} title="Show time picker!" />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={fromTime}
                    mode={'time'}
                    is24Hour={false}
                    display="default"
                    onChange={(event, selectedDate) => onChangeFromDate(event, selectedDate)}
                />
            )}
            <Text>{`${String(fromTime.getHours())}:${String(fromTime.getMinutes())}`}</Text>

            <Button onPress={() => setShow(!show)} title="Show time picker!" />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={toTime}
                    mode={'time'}
                    is24Hour={false}
                    display="default"
                    onChange={(event, selectedDate) => onChangeToDate(event, selectedDate)}
                />
            )}
            <Text>{`${String(toTime.getHours())}:${String(toTime.getMinutes())}`}</Text>
        </View>

    )
}
export default HomeScreen



const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex' },
    cardBorder: {
        width: Dimensions.get('screen').width / 5,
        borderRadius: 20,
        margin: 5
    },
    surface: {
        padding: 8,
        height: 80,
        width: Dimensions.get('screen').width / 5,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        borderRadius: 20
    },
})