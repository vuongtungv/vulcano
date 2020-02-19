import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert, TextInput, KeyboardAvoidingView} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import { forgotPassword } from '../../src/api/apiUser';
export default class ForgotPassword extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
        }

        this.arr = [];
    }
 
    componentDidMount() {
        
    }
    


    ForgotPassword(){
        var email = this.state.email;

        if(email == ''){
            Alert.alert('Email không được để trống.');
            return;
        }else{
            regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex_email.test(email)) {   //điền đúng định dạng

            }else{
                Alert.alert('Email không đúng định dạng.');
                return;
            } 
        }

        forgotPassword(email)
            .then(resJSON => {
                const {msg, error } = resJSON;
                if(error == false){
                    Alert.alert(msg);
                    this.props.navigation.navigate('LoginScreen');
                }else{
                    Alert.alert(msg);
                    return;
                }	
            }).catch(err => {
                this.setState({ loading: false });
            }); 
    }

	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user" title={'Quên mật khẩu'} navigation={navigation} />
                <View>
                    <Image style={MainStyle.userImgLoginB} source={require("../../assets/banner_login_register.png")} />
                    <View style={MainStyle.userImgCenterB}>
                        <View style={MainStyle.userImage}>
                            <Icon type="FontAwesome" name="user-o" style={{ color: '#FFFFFF', fontSize: 35 }} />
                        </View>
                    </View>
                </View>
                <View style={{padding: 20}}>
                    <TextInput
                        style={MainStyle.styleInputLogin}
                        placeholder='Nhập địa chỉ email'
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                    <TouchableOpacity style={MainStyle.touchSubLogin} onPress={()=>this.ForgotPassword()}>
                            <Text style={MainStyle.txtSubLogin}>Khôi phục mật khẩu</Text>
                        </TouchableOpacity>
                </View>
                

            </Container>
        );
    }
}
 