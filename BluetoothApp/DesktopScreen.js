import React, { Component } from 'react';

import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Colors, Header } from "react-native/Libraries/NewAppScreen";

import DeviceList from "./DeviceList";

const api = "https://bt.naberius.pl/api/v1"

class DesktopScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            database: [],
            selecteduuid: 0,
            range: []
        }
        this.getDevices()
    }
    async getDevices() {
        await fetch(api + "/devices",
            {
                method: 'GET'
            }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                this.setState({
                    database: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    async getRange(uuid) {
        await fetch(api + "/devices/in-range?uuid=" + uuid,
            {
                method: 'GET'
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    range: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    setUUID = (text) => {
        this.getRange(text);
        this.setState({ selecteduuid: text })
    }
    render() {
        if (this.state.selecteduuid == 0) {
            return (
                <View style={styles.container}>
                    <Text style={[styles.header]}>Registered Users:</Text>
                    <View>
                        {
                            this.state.database.map((item, index) => (
                                <Button
                                    key={item.uuid}
                                    style={styles.container}
                                    title={item.name}
                                    onPress={() => this.setUUID(item.uuid)}
                                >
                                </Button>
                            ))
                        }
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Button title="Back" onPress={() => this.setUUID(0)}></Button>
                    <Text style={[styles.header]}>In range:</Text>
                    <View>
                        {
                            this.state.range.map((item, index) => (
                                <Button
                                    key={item.uuid}
                                    style={styles.container}
                                    title={item.name}
                                >
                                </Button>
                            ))
                        }
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    component: {
        margin: 8,
        backgroundColor: '#d9f9b1',
    },
    input: {
        margin: 2,
        height: 40,
        width: '75%',
        borderColor: '#d9f9b1',
        borderWidth: 1
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        margin: 8,
        color: Colors.dark
    },
    header: {
        fontSize: 24,
        padding: 10,
        marginTop: 3,
        fontWeight: '600',
        alignItems: 'center',
        color: Colors.dark
    },
});
export default DesktopScreen;
