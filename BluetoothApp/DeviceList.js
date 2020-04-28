import React, { Component } from 'react'
import {StyleSheet,TouchableOpacity, Text, View} from 'react-native'


class DeviceList extends Component
{
    state = {
        devices : this.props.devices
    }
    render() {
        return (
            <View>
                {
                    this.state.devices.map((item, index) => (
                        <TouchableOpacity
                            key = {item.id}
                            style = {styles.container}
                            >
                            <Text style = {styles.text}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c'
    }
});

export default DeviceList