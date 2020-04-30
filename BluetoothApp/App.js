/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import PresentationalComponent from './PresentationalComponent'
import 'react-native-gesture-handler';
import BluetoothScanner from "./BluetoothScanner";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./LoginScreen";


const Stack = createStackNavigator()

class App extends React.Component {


  state = {
    myState: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n' +
        '        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi\n' +
        '    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\n' +
        '        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n' +
        '        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia\n' +
        '    deserunt mollit anim id est laborum.'
  }
  updateState = () => this.setState({ myState: 'The state is updated' })



  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Devices" component={BluetoothScanner} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
