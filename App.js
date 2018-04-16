/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';

import Service from './src/components/service/service';
import Login from './src/components/login/login';

import Questionnaire from './src/components/questionnaire/questionnaire';

export default class App extends Component {
  render() {
    return (
        <NavigatorIOS
            initialRoute={{
                component: Service,
                title: 'Service',
            }}
            style={{flex: 1}}
        />
    );
  }
}


