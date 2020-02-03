import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert, TextInput, DatePickerIOS} from 'react-native';
import { Picker} from "native-base";
import DatePicker from 'react-native-datepicker';

import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { submitRegister } from '../../src/api/apiUser';


export default class Register extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            showPassword: true,
            textShowHidden: 'Hiện',
            genderTF: false,   
            valueGender: 1,
            fullname: '',
            phone: '',
            email: '',
            password: '',
            birthday: '',
        }

        this.arr = [];
    }
 
    componentDidMount() {
        
    }


    gotoLogin(){
        this.props.navigation.navigate('LoginScreen');
    }
    gotoRegister(){
        this.props.navigation.navigate('RegisterScreen');
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

    renderButtonGender(){
        if(this.state.genderTF == true)
            return (
                <View style={[MainStyle.TextGenderLine]}>
                    <TouchableOpacity style={[MainStyle.radioCheck,{marginBottom: 10, marginRight: 30}]} onPress={() => this.setStateGender('1')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[MainStyle.fontRegular,{marginRight: 10,borderColor:'#dddddd', borderWidth: 1,padding: 2,marginTop: -2, borderRadius: 12, width:24, height: 24}]}>
                                <View style={{width: 16, height: 16, borderRadius: 9}}></View>
                            </View> 
                            <Text style={[MainStyle.fontRegular,MainStyle.pTextMethodPayment]}>Nam</Text>
                        </View> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={[MainStyle.radioCheck, {marginBottom: 10}]} onPress={() => this.setStateGender('2')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[MainStyle.fontRegular,{marginRight: 10,borderColor:'#000000', borderWidth: 1,padding: 3,marginTop: -2, borderRadius: 12, width:24, height: 24}]}>
                                <View style={{backgroundColor: '#000000', width: 16, height: 16, borderRadius: 8}}></View>
                            </View> 
                            <Text style={[MainStyle.fontRegular,MainStyle.pTextMethodPayment]}>Nữ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        else
            return ( 
                <View style={[MainStyle.TextGenderLine]}>
                    <TouchableOpacity style={[MainStyle.radioCheck, {marginBottom: 10,marginRight: 30}]} onPress={() => this.setStateGender('1')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[MainStyle.fontRegular,{marginRight: 10,borderColor:'#000000', borderWidth: 1,padding: 3,marginTop: -2, borderRadius: 12, width:24, height: 24}]}>
                                <View style={{backgroundColor: '#000000', width: 16, height: 16, borderRadius: 8}}></View>
                            </View> 
                            <Text style={[MainStyle.fontRegular,MainStyle.pTextMethodPayment]}>Nam</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[MainStyle.radioCheck,{marginBottom: 10}]} onPress={() => this.setStateGender('2')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[MainStyle.fontRegular,{marginRight: 10,borderColor:'#dddddd', borderWidth: 1,padding: 2,marginTop: -2, borderRadius: 12, width:24, height: 24}]}>
                                <View style={{width: 16, height: 16, borderRadius: 9}}></View>
                            </View> 
                            <Text style={[MainStyle.fontRegular,MainStyle.pTextMethodPayment]}>Nữ</Text>
                        </View> 
                    </TouchableOpacity>  
                </View>
            )
    }
    setStateGender(gender){
        if(gender ==1 ){
            this.setState({
                genderTF: false,   
                valueGender: gender
            });
        }else{
            this.setState({
                genderTF: true,   
                valueGender: gender
            });
        }    
    }

    submitRegister(){
        var fullname = this.state.fullname;
        var phone = this.state.phone;
        var email = this.state.email;
        var password = this.state.password;
        var birthday = this.state.birthday;
        var gender = this.state.valueGender;

        if(fullname == ''){
            Alert.alert('Họ tên không được để trống.');
            return;
        }else{
            regex_name  =  /^[a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
            if (regex_name.test(fullname)) {   //điền đúng định dạng

            }else{
                Alert.alert('Họ tên phải là ký tự từ a-z.');
                return;
            } 
        }

        if(phone == ''){
            Alert.alert('Số điện thoại không được để trống.');
            return;        
        }else{
            regex_phone = /^0\d{9}$/;
            if (regex_phone.test(phone)) {   //điền đúng định dạng

            }else{
                Alert.alert('Số điện thoại gồm 10 số, bắt đầu từ số 0.');
                return;
            } 
        }


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

        if(password == ''){
            Alert.alert('Mật khẩu không được.');
            return;
        }else{
            regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            if(regex_password.test(password)){ //điền đúng định dạng

            }else{
                Alert.alert('Mật khẩu ít nhất 8 ký tư, 1 số, 1 chữ hoa, 1 chữ thường.');
                return;
            }
        }


        submitRegister(fullname, phone, email, password, birthday, gender)
            .then((responseJson) => {
                if (responseJson.error == '0') {
                    this.setState({ rest_id: responseJson.rest_id});

                    Alert.alert('Thông báo', responseJson.message);
                    
                    this.props.navigation.navigate('LoginScreen');
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
                    <TouchableOpacity style={[MainStyle.titleLoginRegis]} onPress={()=>this.gotoLogin()}>
                        <Text style={[MainStyle.txtTabLoginRegister]}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[MainStyle.titleLoginRegis, MainStyle.titleLoginRegisActive]} onPress={()=>this.gotoRegister()}>
                        <Text style={[MainStyle.txtTabLoginRegister, MainStyle.txtTabLoginRegisterActive]}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                    <ScrollView>
                    <View style={MainStyle.formLogin}>
                        <TextInput
                            style={MainStyle.styleInputLogin}
                            placeholder='Họ và tên'
                            onChangeText={(fullname) => this.setState({fullname})}
                            value={this.state.fullname}
                        />
                        <TextInput
                            style={MainStyle.styleInputLogin}
                            placeholder='Số điện thoại'
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                        />
                        <TextInput
                            style={MainStyle.styleInputLogin}
                            placeholder='Email'
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
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
                        <View style={{paddingTop: 25,paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}}>
                            <DatePicker 
                                mode="date"
                                date= {this.state.birthday}
                                placeholder="Ngày sinh"
                                format="DD/MM/YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateText: {
                                        fontFamily: 'RobotoRegular',
                                        fontSize: 15,
                                    },
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                        width:0
                                    },
                                    dateInput: {
                                        position: 'absolute',
                                        left:0,
                                        borderWidth:0,
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ birthday: date }) }}
                            />
                        </View>
                        <View style={{paddingTop: 30, paddingBottom: 10}}>
                            {this.renderButtonGender()}
                        </View>
                        <TouchableOpacity style={[MainStyle.touchSubLogin, {marginBottom: 30, marginTop: 10,}]} onPress={()=>this.submitRegister()}>
                            <Text style={MainStyle.txtSubLogin}>Đăng ký</Text>
                        </TouchableOpacity>
                        
                    </View>
                </ScrollView>
                
            </Container>
        );
    }
}
 