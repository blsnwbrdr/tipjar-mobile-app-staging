import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, StatusBar, ScrollView, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import SearchInfoStyles from './../styles/SearchInfoStyles';

// JSON DATA
const countryTipData = require('./../data/countryTipData.json');
const currencyDataArchive = require('./../data/currencyData.json');

export default class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryTipData: countryTipData,
      currencyData: []
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const country = params;
      return {
        title: country,
      }
  };

  componentDidMount = async () => {
    let response = await AsyncStorage.getItem('currency-data');
    response = JSON.parse(response);
    if (response === null) {
      // console.log('load archive data');
      this.setState({
        currencyData: currencyDataArchive,
      })
    } else {
      // console.log('load saved data');
      this.setState({
        currencyData: response,
      })
    }
    const { params } = this.props.navigation.state;
    const country = params;
    for ( var x = 0; x < countryTipData.length; x++) {
      if (country === countryTipData[x].country) {
        for ( var i = 0; i < this.state.currencyData.length; i++) {
          if (countryTipData[x].currency === this.state.currencyData[i].currency) {
            this.setState({
             countryTipData: countryTipData[x],
             countryCurrencyData: Math.round(this.state.currencyData[i].conversion * 100) / 100,
            })
          }
        }
      }
    }
  }

  render() {

    return (
      <SafeAreaView style={SearchInfoStyles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={SearchInfoStyles.scrollContainer}>
          <View style={SearchInfoStyles.countryContainer}>
            <Text style={SearchInfoStyles.countryIcon}>
              <FontAwesome name="cutlery" size={32} color="#494F56" />
            </Text>
            <Text style={SearchInfoStyles.countryTitle}>Dining:</Text>
            <Text style={SearchInfoStyles.countryText}>{this.state.countryTipData.dining}</Text>
            <Text style={SearchInfoStyles.countryIcon}>
              <FontAwesome name="taxi" size={32} color="#494F56" />
            </Text>
            <Text style={SearchInfoStyles.countryTitle}>Transportation:</Text>
            <Text style={SearchInfoStyles.countryText}>{this.state.countryTipData.transportation}</Text>
            <Text style={SearchInfoStyles.countryIcon}>
              <FontAwesome name="building" size={32} color="#494F56" />
            </Text>
            <Text style={SearchInfoStyles.countryTitle}>Accomodation:</Text>
            <Text style={SearchInfoStyles.countryText}>{this.state.countryTipData.accommodation}</Text>
            <Text style={SearchInfoStyles.countryIcon}>
              <FontAwesome name="money" size={32} color="#494F56" />
            </Text>
            <Text style={SearchInfoStyles.countryTitle}>Currency*:</Text>
            <Text style={SearchInfoStyles.countryText}>1 USD = {this.state.countryCurrencyData} {this.state.countryTipData.currency}</Text>
            <Text style={SearchInfoStyles.countryIcon}>
              <FontAwesome name="language" size={32} color="#494F56" />
            </Text>
            <Text style={SearchInfoStyles.countryTitle}>Thank you:</Text>
            <Text style={SearchInfoStyles.countryText}>{this.state.countryTipData.thankyou}</Text>
            <Text style={SearchInfoStyles.countryTitle}>Goodbye:</Text>
            <Text style={SearchInfoStyles.countryText}>{this.state.countryTipData.goodbye}</Text>
            <Text style={SearchInfoStyles.disclaimerText}>*Currency data is not live. Exchange rates are updated daily.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
