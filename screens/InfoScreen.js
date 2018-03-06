import React, { Component } from 'react';
import { View, Text } from 'react-native';
import InfoStyles from './../styles/InfoStyles';

export default class InfoScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}
