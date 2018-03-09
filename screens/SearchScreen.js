import React, { Component } from 'react';
import { SafeAreaView, StatusBar, Keyboard, TextInput, ScrollView, FlatList, TouchableWithoutFeedback, TouchableOpacity, View, Text } from 'react-native';
import CloseKeyboard  from './../components/CloseKeyboard';
import SearchStyles from './../styles/SearchStyles';

// JSON DATA
const countryTipData = require('./../data/countryTipData.json');

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      keyboard: 'off',
    };
  }

  static navigationOptions = {
    title: 'Search',
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboard: 'on',
    })
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboard: 'off',
    })
  }

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

  closeKeyboard() {
    console.log('close keyboard');
    Keyboard.dismiss();
  }

  render() {
    return (
      <SafeAreaView style={SearchStyles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={SearchStyles.bodyContainer}>
          <CloseKeyboard
            closeKeyboard={this.closeKeyboard}
            keyboard={this.state.keyboard}
          />
          <TextInput
            style={SearchStyles.input}
            autoCorrect={false}
            placeholder='Search'
            onChangeText={(text) => this.searchText(text)}
          />
          <TouchableWithoutFeedback onPress={ () => this.closeKeyboard() }>
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
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    )
  }
}
