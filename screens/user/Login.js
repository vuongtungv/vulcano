import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert, TextInput, KeyboardAvoidingView,Keyboard, Platform} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import { submitLogin } from '../../src/api/apiUser';
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';

import { registerForPushNotificationsAsync } from './../api/registerForPushNotificationsAsync';
import { Notifications } from 'expo';
import Constants from 'expo-constants';


export default class Login extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            token:'',
            username: '',
            password: '',
            showPassword: true,
            textShowHidden: 'Hiện',
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
            if (!Constants.isDevice) {
                var token = '';
            }else{
                var token = await Notifications.getExpoPushTokenAsync();
            }
            console.log(token);
            this.setState({token});
            
        } catch (e) {
            console.log('Error');
        }

        this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide': 'keyboardWillHide', this.keyboardHideListener.bind(this));
    }

    componentWillUnmount() {
        this.keyboardHideListener.remove()
    }
    _handleNotification = notification => {
        // do whatever you want to do with the notification
        this.setState({ notification: notification });
    };  
    keyboardHideListener() {
        this.setState({
            keyboardAvoidingViewKey:'keyboardAvoidingViewKey' + new Date().getTime()
        });
    } 


    gotoLogin(){
        this.props.navigation.navigate('LoginScreen');
    }
    gotoRegister(){
        this.props.navigation.navigate('RegisterScreen');
    }
    forgotPassword(){
        this.props.navigation.navigate('FogotPasswordScreen');
    }
    

    showPass(){
        this.setState({ showPassword: !this.state.showPassword });
        if(this.state.showPassword == true){
            this.setState({ 
                textShowHidden: 'Ẩn',
            });
        }else{
            this.setState({ 
                textShowHidden: 'Hiện',
            });
        }
    }


    submitLogin(){
        var token = this.state.token;
        var username = this.state.username;
        var password = this.state.password;
        // const { token } = this.props.navigation.state.params;

        // Alert.alert(token);

        if(username == ''){
            Alert.alert('Số điện thoại hoặc email không được trống');
            return;
        }

        if(password == ''){
            Alert.alert('Mật khẩu không được trống');
            return;        
        }

        submitLogin(username, password, token)
            .then((responseJson) => {
                if (responseJson.error == '0') {
                    saveStorage('user', JSON.stringify(responseJson.user));
                    console.log(responseJson.user)
                    Alert.alert('Thông báo', 'Đăng nhập thành công.');

                    this.props.navigation.navigate('HomeScreen');
                } else {
                    Alert.alert('Thông báo', responseJson.message);
                }
            }).done(); 
    }

	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <View style={MainStyle.userLoginBanner}>
                    <Image style={MainStyle.userImgLoginB} source={require("../../assets/banner_login_register.png")} />
                    <View style={MainStyle.userImgCenterB}>
                        <View style={MainStyle.userImage}>
                            <Icon type="FontAwesome" name="user-o" style={{ color: '#FFFFFF', fontSize: 35 }} />
                        </View>
                    </View>
                </View>
                <View style={MainStyle.userTabLoginRegisterScreen}>
                    <TouchableOpacity style={[MainStyle.titleLoginRegis, MainStyle.titleLoginRegisActive]} onPress={()=>this.gotoLogin()}>
                        <Text style={[MainStyle.txtTabLoginRegister, MainStyle.txtTabLoginRegisterActive]}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={MainStyle.titleLoginRegis} onPress={()=>this.gotoRegister()}>
                        <Text style={[MainStyle.txtTabLoginRegister]}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView
                    behavior='height'
                >
                    <View style={MainStyle.formLogin}>
                        <TextInput
                            style={MainStyle.styleInputLogin}
                            placeholder='Email / Số điện thoại'
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                        />
                        <View style={MainStyle.vInputPass}>
                            <TextInput
                                style={MainStyle.styleInputLogin}
                                placeholder='Mật khẩu'
                                secureTextEntry={this.state.showPassword}
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                            />
                            <TouchableOpacity style={MainStyle.showPass} onPress={()=>this.showPass()}><Text>{this.state.textShowHidden}</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity style={MainStyle.touchSubLogin} onPress={()=>this.submitLogin()}>
                            <Text style={MainStyle.txtSubLogin}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>this.forgotPassword()}>
                            <Text style={{fontSize: 15, fontFamily: "RobotoRegular", color: '#000000', marginTop: 10}}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                        
                    </View>
                </KeyboardAvoidingView>

            </Container>
        );
    }
}
 