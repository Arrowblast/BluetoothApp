import React, { Component } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Colors} from "react-native/Libraries/NewAppScreen";

const PresentationalComponent = (props) => {
    return (
        <View>
            
            <Text style={styles.sectionDescription} onPress = {props.updateState}>
                {props.myState}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        margin: 32,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,

    },
    highlight: {
        fontWeight: '700',
    },
});

export default PresentationalComponent