import React, { Component } from 'react';
import { NetInfo, AsyncStorage, View, Text } from 'react-native';
import { AppLoading, Font } from 'expo';
import MainNavigation from './MainNavigation';
// import Styles from './styles/Styles';

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    this.downloadCurrencyData();
  }

  // DOWNLOAD CURRENCY DATA BASED ON INTERNET CONNECTION STATUS
  downloadCurrencyData = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('Initial ' + (isConnected ? 'online' : 'offline'));
    });
    connectivityChange = (isConnected) => {
      console.log('Now ' + (isConnected ? 'online' : 'offline'));
      if (isConnected === true) {
        fetch('https://brandonscode.herokuapp.com/currency-data')
          .then(res => res.json())
          .then(
            (result) => {
              AsyncStorage.setItem('currency-data', JSON.stringify(result), () => {
                console.log('save new data');
              });
            }
          )
      }
      NetInfo.isConnected.removeEventListener('connectionChange', connectivityChange);
    }
    NetInfo.isConnected.addEventListener('connectionChange', connectivityChange);
  }

    render() {
      if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
        return (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        );
      } else {
        return  <MainNavigation />
      }
    }

  // ASYNC LOAD FONTS
  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'patrick-hand': require('./assets/fonts/PatrickHand-Regular.ttf'),
        'nothing-you-could-do': require('./assets/fonts/NothingYouCouldDo.ttf'),
        'hind': require('./assets/fonts/hind-regular.otf'),
      }),
    ]);
  };
  _handleLoadingError = error => {
    console.warn(error);
  };
  _handleFinishLoading = () => {
    this.setState({
      isLoadingComplete: true
    });
  };
}
