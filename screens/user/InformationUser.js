import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert,DatePickerIOS, TextInput, KeyboardAvoidingView} from 'react-native';
import { Picker} from "native-base";
import DatePicker from 'react-native-datepicker';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';

import { updateUser } from '../../src/api/apiUser';

export default class InformationUser extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            showPassword: true,
            showNewPassword: true,
            textShowHidden: 'Hiện',
            textNewShowHidden: 'Hiện',
            genderTF: false,   
            valueGender: 1,
            fullname: '',
            phone: '',
            email: '',
            address: '',
            password: '',
            birthday: '',
            password: '',
            newPassword: '',
            reNewPassword: '',
        }

        this.arr = [];
    }
 
    componentDidMount() {
        getStorage('user')
        .then(user => {
            if (user != '') {
                let arrUser = JSON.parse(user);
                console.log(arrUser);
                if(arrUser.gender == 2){
                    this.setState({ 
                        genderTF: true,   
                        valueGender: 2,
                    });
                }
                this.setState({ 
                    user_id: arrUser.id,
                    fullname: arrUser.fullname,
                    phone: arrUser.phone,
                    birthday: arrUser.birthday,
                    email: arrUser.email,
                    address: arrUser.address,
                    created_time: arrUser.created_time,
                });
            } 
        });
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
    
    showNewPass(){
        this.setState({ showNewPassword: !this.state.showNewPassword });
        if(this.state.showNewPassword == true){
            this.setState({ 
                textNewShowHidden: 'Ẩn',
            });
        }else{
            this.setState({ 
                textNewShowHidden: 'Hiện',
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

    updateUser(){
        var user_id = this.state.user_id;
        var fullname = this.state.fullname;
        var phone = this.state.phone;
        var email = this.state.email;
        
        var birthday = this.state.birthday;
        var gender = this.state.valueGender;
        var address = this.state.address;

        var password = this.state.password;
        var newPassword = this.state.newPassword;
        var reNewPassword = this.state.reNewPassword;

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

        if(password != ''){
            if(newPassword !='' && reNewPassword !=''){
                regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                if(regex_password.test(newPassword)){ //điền đúng định dạng
                    
                }else{
                    Alert.alert('Mật khẩu ít nhất 8 ký tự trong đó bao gồm chữ hoa, chữ thường và số.');
                    return;
                }
                if(regex_password.test(reNewPassword)){ //điền đúng định dạng
                    
                }else{
                    Alert.alert('Mật khẩu ít nhất 8 ký tự trong đó bao gồm chữ hoa, chữ thường và số.');
                    return;
                }
                if(newPassword != reNewPassword){
                    Alert.alert('Mật khẩu mới và nhập lại mật khẩu mới không khớp.');
                    return;
                }
                
            }else{
                Alert.alert('Vui lòng nhập mật khẩu mới.');
                return;
            }
        }


        updateUser(user_id, fullname, phone, email, password, newPassword, birthday, gender, address)
            .then((responseJson) => {
                if (responseJson.error == '0') {
                
                    Alert.alert('Thông báo', responseJson.message);
                    saveStorage('user', '');
                    
                    saveStorage('user', JSON.stringify(responseJson.user));
                   
                    this.props.navigation.navigate('UserScreen');
                } else {
                    Alert.alert('Thông báo', responseJson.message);
                }
            }).done(); 
    }



	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user" title={'Thông tin tài khoản'} navigation={navigation} />
                <KeyboardAvoidingView
                        behavior='height'
                    >
                <ScrollView>
                
                    <View style={{backgroundColor: '#eeeeee', borderBottomColor: '#cccccc', borderBottomWidth: 1, padding: 20,}}>
                        <Text style={{fontFamily: "RobotoBold", fontSize: 17, color: '#333333'}}>Cá nhân</Text>
                    </View>
                    <View style={MainStyle.formLogin}>
                        <TextInput
                            style={[MainStyle.styleInputLogin, {color: '#333333'}]}
                            placeholder='Họ và tên'
                            placeholderStyle={{color: '#777777', fontFamily: "RobotoRegular", fontSize: 16}}
                            onChangeText={(fullname) => this.setState({fullname})}
                            value={this.state.fullname}
                        />
                        <TextInput
                            style={[MainStyle.styleInputLogin, {color: '#333333'}]}
                            placeholder='Số điện thoại'
                            placeholderStyle={{color: '#777777', fontFamily: "RobotoRegular", fontSize: 16}}
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                        />
                        <TextInput
                            style={[MainStyle.styleInputLogin, {color: '#333333'}]}
                            placeholder='Email'
                            placeholderStyle={{color: '#777777', fontFamily: "RobotoRegular", fontSize: 16}}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                        />
                        <View style={{paddingTop: 30, paddingBottom: 10, borderBottomWidth: 1,borderBottomColor: '#e0e0e0'}}>
                            {this.renderButtonGender()}
                        </View>
                        <TextInput
                            style={[MainStyle.styleInputLogin, {color: '#333333'}]}
                            placeholder='Địa chỉ'
                            placeholderStyle={{color: '#777777', fontFamily: "RobotoRegular", fontSize: 16}}
                            onChangeText={(address) => this.setState({address})}
                            value={this.state.address}
                        />
                        <View style={{paddingTop: 25,paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}}>
                            <DatePicker 
                                mode="date"
                                date= {this.state.birthday}
                                placeholder="Cập nhật thông tin ngày sinh của bạn"
                                
                                format="DD/MM/YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    placeholderText: {
                                        fontSize: 15,
                                        color: '#777777',
                                        fontFamily: 'RobotoRegular'
                                    },
                                    dateText: {
                                        fontFamily: 'RobotoRegular',
                                        fontSize: 15,
                                        color: '#333333',
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
                        
                    </View>

                    <View style={{marginTop: 20, backgroundColor: '#eeeeee', borderBottomColor: '#cccccc', borderBottomWidth: 1, padding: 20,}}>
                        <Text style={{fontFamily: "RobotoBold", fontSize: 17, color: '#333333'}}>Mật khẩu</Text>
                    </View>

                    <View style={MainStyle.formLogin}>
                        <View style={MainStyle.vInputPass}>
                            <TextInput
                                style={[MainStyle.styleInputLogin, {color: '#333333'}]}
                                placeholder='Mật khẩu'
                                placeholderStyle={{color: '#777777', fontFamily: "RobotoRegular", fontSize: 16}}
                                secureTextEntry={this.state.showPassword}
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                            />
                            <TouchableOpacity style={MainStyle.showPass} onPress={()=>this.showPass()}><Text>{this.state.textShowHidden}</Text></TouchableOpacity>
                        </View>
                        <View style={MainStyle.vInputPass}>
                            <TextInput
                                style={[MainStyle.styleInputLogin, {color: '#333333'}]}
                                placeholder='Mật khẩu mới'
                                placeholderStyle={{color: '#777777', fontFamily: "RobotoRegular", fontSize: 16}}
                                secureTextEntry={this.state.showNewPassword}
                                onChangeText={(newPassword) => this.setState({newPassword})}
                                value={this.state.newPassword}
                            />
                            <TouchableOpacity style={MainStyle.showPass} onPress={()=>this.showNewPass()}><Text>{this.state.textNewShowHidden}</Text></TouchableOpacity>
                        </View>
                        <View style={MainStyle.vInputPass}>
                            <TextInput
                                style={[MainStyle.styleInputLogin, {color: '#333333'}]}
                                placeholder='Nhập lại mật khẩu mới'
                                placeholderStyle={{color: '#777777', fontFamily: "RobotoRegular", fontSize: 16}}
                                secureTextEntry={this.state.showNewPassword}
                                onChangeText={(reNewPassword) => this.setState({reNewPassword})}
                                value={this.state.reNewPassword}
                            />
                            <TouchableOpacity style={MainStyle.showPass} onPress={()=>this.showNewPass()}><Text>{this.state.textNewShowHidden}</Text></TouchableOpacity>
                        </View>
                                    

                        <TouchableOpacity style={[MainStyle.touchSubLogin, {marginBottom: 30, marginTop: 20,}]} onPress={()=>this.updateUser()}>
                            <Text style={MainStyle.txtSubLogin}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                
                </ScrollView>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}
 