import React, { Component } from 'react';
import { SafeAreaView, StatusBar, TextInput, ScrollView, FlatList, TouchableOpacity, View, Text } from 'react-native';
import SearchStyles from './../styles/SearchStyles';

// JSON DATA
const countryTipData = require('./../data/countryTipData.json');

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  static navigationOptions = {
    title: 'Search',
  };

  searchText(text) {
    const pattern = new RegExp(text,'gi');
    let userMatches = [];
    for (let x = 0; x < countryTipData.length; x++) {
      if (text === '' ) {
        this.setState({
          countryTipData: '',
        })
      } else if (countryTipData[x].country.search(pattern) >= 0) {
        userMatches.push(countryTipData[x]);
        this.setState({
          countryTipData: userMatches,
        })
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={SearchStyles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={SearchStyles.bodyContainer}>
          <TextInput
            style={SearchStyles.input}
            autoCorrect={false}
            onChangeText={(text) => this.searchText(text)}
          />
          <ScrollView style={SearchStyles.scrollContainer} keyboardShouldPersistTaps='always'>
            <FlatList style={SearchStyles.listContainer}
              keyboardShouldPersistTaps='always'
              data = {this.state.countryTipData}
              keyExtractor = {(x, i) => i}
              renderItem = { ({item}) =>
                <View style={SearchStyles.listButtonContainer}>
                  <TouchableOpacity onPress={ () => this.props.navigation.navigate('SearchInfo',item.country) }>
                    <View style={SearchStyles.listButton}>
                      <Text style={SearchStyles.listButtonText}>{item.country}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
