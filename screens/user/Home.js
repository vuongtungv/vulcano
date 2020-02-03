import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import {getCities, getDistricts, getAllShowrooms} from '../../src/api/apiShowrooms';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            
        }

        this.arr = [];
    }
 
    componentDidMount() {
        
    }


    gotoLogin(){
        this.props.navigation.navigate('LoginScreen');
    }
    gotoListOrder(){
        this.props.navigation.navigate('ListOrderScreen');
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user" title={'Thành viên'} navigation={navigation} />
                <View style={[MainStyle.pageShowrooms, ]}>
                    <View style={{padding: 20, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <View style={MainStyle.userImage}>
                            <Icon type="FontAwesome" name="user-o" style={{ color: '#FFFFFF', fontSize: 35 }} />
                        </View>   
                        <View>
                            <Text style={{ color: '#777777', fontFamily: "RobotoRegular", fontSize: 16,marginBottom: 10, marginTop: 10 }}>Chào mừng bạn đến với Vulcano</Text>
                            <TouchableOpacity onPress={()=>this.gotoLogin()}>
                                <Text style={{ fontFamily: "RobotoBold", fontSize: 17}}>Đăng nhập / Đăng ký</Text>
                            </TouchableOpacity>
                        </View> 
                    </View>  
                    <View style = {{borderTopColor: '#f8f8ff', borderTopWidth: 10, paddingLeft: 20, paddingRight: 20}}>
                        <TouchableOpacity style={MainStyle.userHomeTab} onPress={()=>this.gotoListOrder()}>
                            <Icon type="Feather" name="file-text" style={MainStyle.userIconLeftTab} />
                            <Text style={MainStyle.userHomeTitleTab}>Quản lý đơn hàng</Text>
                            <Icon type="FontAwesome" name="angle-right" style={MainStyle.userIconRightTab} />
                        </TouchableOpacity>
                        <View style={MainStyle.userHomeTab}>
                            <Icon type="FontAwesome" name="user-o" style={MainStyle.userIconLeftTab} />
                            <Text style={MainStyle.userHomeTitleTab}>Thông tin tài khoản</Text>
                            <Icon type="FontAwesome" name="angle-right" style={MainStyle.userIconRightTab} />
                        </View>
                        <View style={MainStyle.userHomeTab}>
                            <Icon type="FontAwesome" name="phone" style={MainStyle.userIconLeftTab} />
                            <Text style={MainStyle.userHomeTitleTab}>Hotline: <Text style={{color: '#ce1e1e'}}>0988191996</Text> (tư vấn miễn phí)</Text>
                        </View>
                    </View>  
                </View>
                <FooterBase navigation={navigation} page="user" />
            </Container>
        );
    }
}
 