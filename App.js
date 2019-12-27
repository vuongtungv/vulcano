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

    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = async (notification) => {

    this.setState({ notification: notification });
    var { origin, data } = notification;
    // https://stackoverflow.com/questions/48547771/navigate-app-from-the-application-root

    // https://expo.io/dashboard/notifications

    // console.log(notification);

    if (origin === 'selected') {
      this.navigator && this.navigator.dispatch(
        NavigationActions.navigate({ routeName: data.screen })
      );
    }
  };

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
