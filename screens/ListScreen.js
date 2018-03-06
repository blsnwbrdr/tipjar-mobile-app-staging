import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity, View, Text } from 'react-native';
import ListStyles from './../styles/ListStyles';

// JSON DATA
const countryTipData = require('./../data/countryTipData.json');

// SORT COUNTRY LIST
function compare(a,b) {
  if (a.country < b.country)
    return -1;
  if (a.country > b.country)
    return 1;
  return 0;
}
countryTipData.sort(compare);

export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryTipData: countryTipData,
    };
  }

  render() {
    return (
      <View style={ListStyles.container}>
        <View style={ListStyles.headerContainer}>
          <Text style={ListStyles.titleText}>TIP JAR</Text>
          <Text style={ListStyles.subTitleText}>A globetrotting guide to gratuity</Text>
        </View>
        <View style={ListStyles.countryListingContainer}>
          <ScrollView style={ListStyles.scrollContainer}>
            <FlatList style={ListStyles.listContainer}
              data = {this.state.countryTipData}
              keyExtractor = {(x, i) => i}
              renderItem = { ({item}) =>
                <View style={ListStyles.listButtonContainer}>
                  <TouchableOpacity onPress={ () => this.onPressTipData(item.country) }>
                    <View style={ListStyles.listButton}>
                      <Text style={ListStyles.listButtonText}>{item.country}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
            />
            <View>
              <Text style={ListStyles.versionText}>v1.2.2</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
