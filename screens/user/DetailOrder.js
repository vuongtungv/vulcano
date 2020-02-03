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
                <HeaderBase page="user_list_order" title={'Đơn hàng'} navigation={navigation} />
                <ScrollView style={[MainStyle.pageShowrooms]}>
                    <TouchableOpacity style={MainStyle.userOrderItem} onPress={()=>this.gotoDetailOrder()}>
                        <Text style={MainStyle.nameOrderItem}>Áo sơ mi dài tay 9360 - XDD0094938</Text>
                        <Text style={MainStyle.briefOrderItem}>Mã đơn hàng: DH000033</Text>
                        <Text style={MainStyle.briefOrderItem}>Đặt hàng: 15:12 21/01/2019</Text>
                        <Text style={MainStyle.briefOrderItem}>Trạng thái: Đơn hàng mới</Text>
                    </TouchableOpacity>
                    <View style={MainStyle.userOrderItem}>
                        <Text style={MainStyle.nameOrderItem}>Địa chỉ người nhận</Text>
                        <Text style={MainStyle.briefOrderItem}>Vương Sỹ Tùng</Text>
                        <Text style={MainStyle.briefOrderItem}>0369094525</Text>
                        <Text style={MainStyle.briefOrderItem}>Số 401 Ngõ 68 Cầu Diễn, Hà Nội</Text>
                    </View>
                    <View style={MainStyle.userOrderItem}>
                        <Text style={MainStyle.nameOrderItem}>Hình thức giao hàng</Text>
                        <Text style={MainStyle.briefOrderItem}>Giao hàng nhận tiền</Text>
                    </View>
                    <View>
                        <Text style={[MainStyle.nameOrderItem, {paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}]}>Thông tin đơn hàng</Text>
                        <View style={MainStyle.infoItemCart}>
                            <View style={MainStyle.imgItemCart}>
                                <Image style={MainStyle.imgCart} source={require("../../assets/cart_img_product.png")} />
                                {/* <Image style={MainStyle.imgCart} source={{uri:item.image }} /> */}
                            </View>
                            <View style={[MainStyle.rightInfoItem]}>
                                <View style={[MainStyle.lineTopItemCart,{marginBottom: 25}]}>
                                    <View><Text style={MainStyle.tProductItemCart}>Áo sơ mi dài tay SDXK300394</Text></View>
                                    <View><Text style={[MainStyle.fPriceItemCart]}>1.300.000 đ</Text></View>
                                </View>
                                <View style={MainStyle.lineTopItemCart}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={MainStyle.txtBCart}>Kiểu dáng: </Text>
                                        <Text style={MainStyle.txtBCart}>Slim-fit</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={MainStyle.txtBCart}>Kích cỡ: </Text>
                                        <Text style={MainStyle.txtBCart}>40</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={MainStyle.txtBCart}>Số lượng: </Text>
                                        <Text style={MainStyle.txtBCart}>2</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={MainStyle.infoItemCart}>
                            <View style={MainStyle.imgItemCart}>
                                <Image style={MainStyle.imgCart} source={require("../../assets/cart_img_product.png")} />
                                {/* <Image style={MainStyle.imgCart} source={{uri:item.image }} /> */}
                            </View>
                            <View style={[MainStyle.rightInfoItem]}>
                                <View style={[MainStyle.lineTopItemCart,{marginBottom: 25}]}>
                                    <View><Text style={MainStyle.tProductItemCart}>Áo sơ mi dài tay SDXK300394</Text></View>
                                    <View><Text style={[MainStyle.fPriceItemCart]}>1.300.000 đ</Text></View>
                                </View>
                                <View style={MainStyle.lineTopItemCart}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={MainStyle.txtBCart}>Kiểu dáng: </Text>
                                        <Text style={MainStyle.txtBCart}>Slim-fit</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={MainStyle.txtBCart}>Kích cỡ: </Text>
                                        <Text style={MainStyle.txtBCart}>40</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={MainStyle.txtBCart}>Số lượng: </Text>
                                        <Text style={MainStyle.txtBCart}>2</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* <FooterBase navigation={navigation} page="user" /> */}
            </Container>
        );
    }
}
 