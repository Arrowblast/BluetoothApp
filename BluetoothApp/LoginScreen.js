import React, { Component } from 'react';


import {View, Text, StyleSheet, Button,TextInput, TouchableOpacity, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import RNBluetoothClassic, { BTEvents, BTCharsets } from 'react-native-bluetooth-classic';
import {Colors, Header} from "react-native/Libraries/NewAppScreen";
import BluetoothScanner from "./BluetoothScanner";
import { withNavigation } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const serverAddress = "http://192.168.100.15:3000/"

class LoginScreen extends Component{

    constructor(props){
        super(props)

    }

    state:{
        uuid : ''
    }
    async goToList(isRegistered)
    {
        if(!isRegistered)
        {
            await fetch(serverAddress+"api/v1/devices",
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        uuid: this.state.uuid ,
                        name: ''

                    })
                    }
                    )
            console.log("Device registered")
        }
        this.props.navigation.navigate('Devices')
    }
    setUUID = (text) => {
        this.setState({ uuid: text })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.header]}>Home Screen</Text>
                <Text style={[styles.text]}>Login/UUID</Text>
                <TextInput style={[styles.input, styles.text]} onChangeText = {this.setUUID}/>
                <Text style={[styles.text]}>Password</Text>
                <TextInput style={[styles.input, styles.text]}/>
                <TouchableOpacity style={[styles.component]} onPress={() => this.goToList(false )}>
                    <Text style={styles.text} >Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.component]} onPress={() => this.goToList(true)}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    component:{
        margin : 8,
        backgroundColor: '#d9f9b1',
    },
    input: {
        margin : 2,
        height: 40,
        width: '75%',
        borderColor: '#d9f9b1',
        borderWidth: 1
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        margin : 8,
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

export default LoginScreen