import React from 'react';

import {
  AppRegistry,
  Text,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Home from './home';
import People from './people';

const Router = createStackNavigator({
  Home: { screen: Home },
  People: { screen: People },
});

const RouterContainer = createAppContainer(Router);

export default RouterContainer;