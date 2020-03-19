import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";


import { registerForPushNotificationsAsync } from './../api/registerForPushNotificationsAsync';
import { Notifications } from 'expo';
import Constants from 'expo-constants';

import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage'

export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            user_id: '',
            fullname: '',
            email: '',
            created_time: '',
            notification: {},
            token: '',
            keyboardAvoidingViewKey:'keyboardAvoidingViewKey'
        }

        this.arr = [];
    }
 
    async componentDidMount() {
        getStorage('user')
        .then(user => {
            if (user != '') {
                let arrUser = JSON.parse(user);
                console.log(arrUser);
                this.setState({ 
                    user_id: arrUser.id,
                    fullname: arrUser.fullname,
                    email: arrUser.email,
                    created_time: arrUser.created_time,
                });
            }else{
                registerForPushNotificationsAsync();
                this._notificationSubscription = Notifications.addListener(this._handleNotification);
            }  
        });
        try {
            var token = await Notifications.getExpoPushTokenAsync();
            if (!Constants.isDevice) {
                var token = '';
            }else{
                var token = await Notifications.getExpoPushTokenAsync();
            }
            this.setState({token});
            console.log(this.state.token);
            
        } catch (e) {
            console.log('Error token');
        }

        this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide': 'keyboardWillHide', this.keyboardHideListener.bind(this));
    }

    _handleNotification = notification => {
        // do whatever you want to do with the notification
        this.setState({ notification: notification });
    };


    gotoLogin(){
        token = this.state.token;
        this.props.navigation.navigate('LoginScreen', {token: token});
    }
    gotoListOrder(){
        this.props.navigation.navigate('ListOrderScreen');
    }
    logout(){
        saveStorage('user', '');
        this.props.navigation.navigate('HomeScreen');
    }
    informationUser(){
        this.props.navigation.navigate('InformationUserScreen');
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user" title={'Thành viên'} navigation={navigation} />
                <ScrollView style={[MainStyle.pageShowrooms, {paddingBottom: 108}]}>
                    <View style={{padding: 20, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        {/* <View>
                            <Text>Origin: {this.state.notification.origin}</Text>
                            <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
                            <Text>Token {this.state.token}</Text>
                        </View> */}

                        <View style={MainStyle.userImage}>
                            <Icon type="FontAwesome" name="user-o" style={{ color: '#FFFFFF', fontSize: 35 }} />
                        </View>   
                        {
                            this.state.user_id ? 
                            <View>
                                <Text style={{ color: '#333333', fontFamily: "RobotoBold", fontSize: 16, marginTop: 10 }}>{this.state.fullname}</Text>
                                <Text style={{ color: '#777777', fontFamily: "RobotoRegular", fontSize: 15}}>{this.state.email}</Text>
                                <Text style={{ color: '#777777', fontFamily: "RobotoRegular", fontSize: 15}}>Thành viên từ: {this.state.created_time}</Text>
                            </View> 
                            :
                            <View>
                                <Text style={{ color: '#777777', fontFamily: "RobotoRegular", fontSize: 16,marginBottom: 10, marginTop: 10 }}>Chào mừng bạn đến với Vulcano</Text>
                                <TouchableOpacity onPress={()=>this.gotoLogin()}>
                                    <Text style={{ fontFamily: "RobotoBold", fontSize: 17}}>Đăng nhập / Đăng ký</Text>
                                </TouchableOpacity>
                            </View> 
                        }
                    </View>  
                    {
                        this.state.user_id ?
                        <View style = {{borderTopColor: '#f8f8ff', borderTopWidth: 10, paddingLeft: 20, paddingRight: 20}}>
                            <TouchableOpacity style={MainStyle.userHomeTab} onPress={()=>this.gotoListOrder()}>
                                <Icon type="Feather" name="file-text" style={MainStyle.userIconLeftTab} />
                                <Text style={MainStyle.userHomeTitleTab}>Quản lý đơn hàng</Text>
                                <Icon type="FontAwesome" name="angle-right" style={MainStyle.userIconRightTab} />
                            </TouchableOpacity>
                            <TouchableOpacity style={MainStyle.userHomeTab} onPress={()=>this.informationUser()}>
                                <Icon type="FontAwesome" name="user-o" style={MainStyle.userIconLeftTab} />
                                <Text style={MainStyle.userHomeTitleTab}>Thông tin tài khoản</Text>
                                <Icon type="FontAwesome" name="angle-right" style={MainStyle.userIconRightTab} />
                            </TouchableOpacity>
                            <View style={MainStyle.userHomeTab}>
                                <Icon type="FontAwesome" name="phone" style={MainStyle.userIconLeftTab} />
                                <Text style={MainStyle.userHomeTitleTab}>Hotline: <Text style={{color: '#ce1e1e'}}>0988191996</Text> (tư vấn miễn phí)</Text>
                            </View>
                        </View>
                        :
                        <View style = {{borderTopColor: '#f8f8ff', borderTopWidth: 10, paddingLeft: 20, paddingRight: 20}}>
                            <View style={MainStyle.userHomeTab}>
                                <Icon type="FontAwesome" name="phone" style={MainStyle.userIconLeftTab} />
                                <Text style={MainStyle.userHomeTitleTab}>Hotline: <Text style={{color: '#ce1e1e'}}>0988191996</Text> (tư vấn miễn phí)</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
                {
                    this.state.user_id ?
                        <TouchableOpacity style={MainStyle.userLogout} onPress={()=>this.logout()}>
                            <Text style={{fontFamily: "RobotoBold", color: '#000000', fontSize: 17, textTransform: 'uppercase', lineHeight:55}}>Đăng xuất</Text> 
                        </TouchableOpacity>
                    :
                    <View><Text></Text></View>

                }
                
                <FooterBase navigation={navigation} page="user" />
            </Container>
        );
    }
}
 