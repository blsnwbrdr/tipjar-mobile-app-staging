import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

// STYLES
import SearchStyles from './../styles/SearchStyles';

export default class ClearSearch extends Component {
  render() {
    let searchContent = this.props.searchContent;
    if (searchContent === '') {
      return null
    } else {
      return (
        <TouchableOpacity style={SearchStyles.clearSearchButton} onPress={ () => this.props.clearSearch() }>
          <View style={SearchStyles.clearSearchButtonView}>
            <Text>Clear</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
}
