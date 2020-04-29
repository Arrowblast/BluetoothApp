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
            database : [],
            devices : [],
            devices_reg : [],
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
    async sendDeviceData(device)
    {
        await fetch(serverAddress+"api/v1/devices",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uuid: device.address,
                    name: device.name,
                })
            })
    }
    async scanAndConnect() {
        console.log("Looking for device...")
        await fetch(serverAddress+"api/v1/devices",
            {
                method: 'GET'
                }).then((response) => response.json())
                .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    database: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });

        this.setState({spinner: true, devices: []})

        const allDevices = await RNBluetoothClassic.discoverDevices()


        await Promise.all(allDevices.map((device) => {

            if(!this.state.database.some((dev) => dev.uuid === device.id))
            {
                console.log("Adding device " + device.name)
                this.sendDeviceData(device)
            }

        }));

        this.setState({spinner: false, devices: allDevices})
        console.log(allDevices)
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
                    <Text style={styles.header}>
                        List of unpaired devices
                    </Text>
                </View>
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
                <View>
                    <Text style={styles.header}>
                        List of registered devices
                    </Text>
                </View>
            </View>
        )
    }
}

const serverAddress = "http://192.168.100.15:3000/"

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    header: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#a7d968',
        alignItems: 'center',
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

