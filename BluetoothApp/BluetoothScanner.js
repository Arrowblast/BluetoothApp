import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import BackgroundTimer from 'react-native-background-timer';
import RNBluetoothClassic, { BTEvents, BTCharsets } from 'react-native-bluetooth-classic';
import Spinner from 'react-native-loading-spinner-overlay';


export default class BluetoothScanner extends Component
{

    constructor()
    {
        super()
        this.state = {
            devices : [],
            spinner : false
        }

    }
    info(message) {
        this.setState({info: message})
    }

    error(message) {
        this.setState({info: "ERROR: " + message})
    }

    updateValue(key, value) {
        this.setState({values: {...this.state.values, [key]: value}})
    }
    async scanAndConnect() {
        console.log("Looking for device...")
        this.setState({spinner: true, devices: []})
        const unpaired = await RNBluetoothClassic.discoverDevices()
        this.setState({spinner: false, devices: unpaired})
        console.log(unpaired)
    }
    render() {
        return (

            <View>
                <Button title = "Search for devices" color = "blue" onPress={this.scanAndConnect.bind(this)}></Button>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View>
                {
                    this.state.devices.map((item, index) => (
                        <TouchableOpacity
                            key = {item.extra.name}
                            style = {styles.container}
                        >
                            <Text style = {styles.text}>
                                {item.extra.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
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

