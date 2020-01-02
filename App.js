import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import MainStyle from './styles/MainStyle.js';
import { NavigationActions } from 'react-navigation';

import { Vulcano } from "./Router";
import * as Font from 'expo-font'
const AppContainer = createAppContainer(Vulcano);




export default class App extends React.Component {
  state = {
    notification: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoBold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoRegular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoLight': require('./assets/fonts/RobotoCondensed-Light.ttf'),
    });

    this.setState({ fontLoaded: true })
  }


  render() {
    if (this.state.fontLoaded) 
      return (
        <AppContainer ref={nav => { this.navigator = nav; }} />
      )
    else 
      return (
        <View style={{ flex: 1 }}>
          <Image style={[MainStyle.tSplashs,{width: '100%', height: '100%'}]} source={require('./assets/splash.png')} />
        </View>
      )   
  } 
}
