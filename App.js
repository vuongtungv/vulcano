import React from 'react';
import { StyleSheet, Text, View, Image, Alert,Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import MainStyle from './styles/MainStyle.js';
import { NavigationActions } from 'react-navigation';

import { registerForPushNotificationsAsync } from './screens/api/registerForPushNotificationsAsync';
import {Notifications} from 'expo';

import { Vulcano } from "./Router";

import * as Font from 'expo-font';
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
    this.loadAssetsAsync()
   
    registerForPushNotificationsAsync();
    
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

    if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('vulcano-sound', {
            name: 'Vulcano Sound',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
        });
    }

  }


  _handleNotification = async (notification) => {
        
    this.setState({notification: notification});
    var {origin, data} = notification;
    // https://stackoverflow.com/questions/48547771/navigate-app-from-the-application-root

    // https://expo.io/dashboard/notifications

    // console.log(notification);

    // let params = { first: 500, sortBy: MediaLibrary.SortBy.creationTime }

    if (origin === 'selected') {
        this.navigator && this.navigator.dispatch(
            NavigationActions.navigate({ routeName: data.screen})
        );
    }
};





  loadAssetsAsync = async () => {
    await Font.loadAsync({
      'RobotoBold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoRegular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoLight': require('./assets/fonts/RobotoCondensed-Light.ttf'),
    })
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
          <Image style={[MainStyle.tSplashs]} source={require('./assets/splash.png')} />
        </View>
      )   
  } 
}
