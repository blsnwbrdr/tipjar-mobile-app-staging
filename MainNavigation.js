import React, { Component } from 'react';
import { StatusBar, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import ListScreen from './screens/ListScreen';
import InfoScreen from './screens/InfoScreen';
import SearchScreen from './screens/SearchScreen';
import SearchInfoScreen from './screens/SearchInfoScreen';
import CalculatorScreen from './screens/CalculatorScreen';

import { colorOrange, colorDarkGrey, colorLightGrey } from './styles/Constants';

const HomeStack = StackNavigator(
  {
    List: {
      screen: ListScreen,
    },
    Info: {
      screen: InfoScreen,
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colorLightGrey,
      },
      headerTintColor: colorOrange,
      headerTitleStyle: {
        fontFamily: 'patrick-hand',
        fontSize: 24,
      },
    },
  },
);

const SearchStack = StackNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    SearchInfo: {
      screen: SearchInfoScreen,
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colorLightGrey,
      },
      headerTintColor: colorOrange,
      headerTitleStyle: {
        fontFamily: 'patrick-hand',
        fontSize: 24,
      },
    },
  },
);

export default TabNavigator(
  {
    List: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'List'
      },
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: 'Search'
      },
    },
    Calculator: {
      screen: CalculatorScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'List':
            iconName = 'ios-list';
            break;
          case 'Search':
            iconName = 'ios-search';
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
