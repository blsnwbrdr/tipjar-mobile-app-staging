import React, { Component } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { CountryListing } from './CountryListing';
import Styles from './styles/Styles';

export class Navigation extends Component {

  render() {
    return (
      <View style={Styles.container}>
        <StatusBar barStyle='dark-content' />
        <View style={Styles.headerContainer}>
          <Text style={Styles.titleText}>TIP JAR</Text>
          <Text style={Styles.subTitleText}>A globetrotting guide to gratuity</Text>
        </View>
        <CountryListing />
        <View style={Styles.navigationContainer}>
          <Text>Navigation</Text>
        </View>
      </View>
    )
  };
}
