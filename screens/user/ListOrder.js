import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import {getCities, getDistricts, getAllShowrooms} from '../../src/api/apiShowrooms';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class ListOrder extends Component{
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


    gotoDetailOrder(){
        this.props.navigation.navigate('UserDetailOrderScreen');
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user_list_order" title={'Đơn hàng của tôi'} navigation={navigation} />
                <View style={[MainStyle.pageShowrooms]}>
                    <TouchableOpacity style={MainStyle.userOrderItem} onPress={()=>this.gotoDetailOrder()}>
                        <Text style={MainStyle.nameOrderItem}>Áo sơ mi dài tay 9360 - XDD0094938</Text>
                        <Text style={MainStyle.briefOrderItem}>Mã đơn hàng: DH000033</Text>
                        <Text style={MainStyle.briefOrderItem}>Đặt hàng: 15:12 21/01/2019</Text>
                        <Text style={MainStyle.briefOrderItem}>Trạng thái: Đơn hàng mới</Text>
                    </TouchableOpacity>
                    <View style={MainStyle.userOrderItem}>
                        <Text style={MainStyle.nameOrderItem}>Áo sơ mi dài tay 9360 - XDD0094938</Text>
                        <Text style={MainStyle.briefOrderItem}>Mã đơn hàng: DH000033</Text>
                        <Text style={MainStyle.briefOrderItem}>Đặt hàng: 15:12 21/01/2019</Text>
                        <Text style={MainStyle.briefOrderItem}>Trạng thái: Đơn hàng mới</Text>
                    </View>
                </View>

                {/* <FooterBase navigation={navigation} page="user" /> */}
            </Container>
        );
    }
}
 