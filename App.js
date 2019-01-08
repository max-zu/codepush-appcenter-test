/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CodePush from "react-native-code-push";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component<Props> {
  onButtonPress = () => {
    Platform.OS === 'android' && alert('asd')
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE
    }, (status) => {
      switch(status) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          alert("Checking for updates.");
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          alert("Downloading package.");
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          alert("Installing update.");
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          alert("Up-to-date.");
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          alert("Update installed.");
          break;
      }
    }, (progress) => {
      alert(`progress: ${progress}`)
    });
  };

  async componentDidMount() {
    await CodePush.notifyAppReady()
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js!</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{process.env.TEST_VAR}</Text>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text>Check for updates</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE
}

export default CodePush(codePushOptions)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
