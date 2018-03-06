import React, { Component } from 'react';
import { StatusBar, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import ListScreen from './screens/ListScreen';
import InfoScreen from './screens/InfoScreen';
import CalculatorScreen from './screens/CalculatorScreen';

import { colorOrange, colorDarkGrey, colorLightGrey } from './styles/Constants';

const HomeStack = StackNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colorLightGrey,
      }
    }
   },
  Info: {
    screen: InfoScreen,
    title: 'Country Information',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colorLightGrey,
      }
    }
   },
});

export default TabNavigator(
  {
    Home: { screen: HomeStack },
    Calculator: { screen: CalculatorScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'ios-list';
            break;
          case 'Calculator':
            iconName = 'ios-calculator';
        }
        return (
          <Ionicons
            name={iconName}
            size={25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: colorLightGrey,
      },
      activeTintColor: colorOrange,
      inactiveTintColor: colorDarkGrey,
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
