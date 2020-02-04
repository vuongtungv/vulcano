import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import {getDetailOrder} from '../../src/api/apiUser';

export default class ListOrder extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            list: [],
            detail: '',
        }

        this.arr = [];
    }
 
    componentDidMount() {
        const { order_id } = this.props.navigation.state.params;
        getDetailOrder(order_id)
            .then(resJSON => {
                const { list, detail, error} = resJSON;
                if (error == false) {
                    this.setState({
                        list: list, 
                        detail: detail,
                    }); 
                }
            }).catch(err => {
                // this.setState({ loaded: true });  
            }); 
    }



	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user_list_order" title={'Đơn hàng'} navigation={navigation} />
                <ScrollView style={[MainStyle.pageShowrooms]}>
                    <View style={MainStyle.userOrderItem}>
                        <Text style={MainStyle.nameOrderItem}>{this.state.detail.name}</Text>
                        <Text style={MainStyle.briefOrderItem}>Mã đơn hàng: {this.state.detail.code}</Text>
                        <Text style={MainStyle.briefOrderItem}>Đặt hàng: {this.state.time_order} {this.state.created_time}</Text>
                        <Text style={MainStyle.briefOrderItem}>Trạng thái: {this.state.status}</Text>
                    </View>
                    <View style={MainStyle.userOrderItem}>
                        <Text style={MainStyle.nameOrderItem}>Địa chỉ người nhận</Text>
                        <Text style={MainStyle.briefOrderItem}>{this.state.detail.fullname}</Text>
                        <Text style={MainStyle.briefOrderItem}>{this.state.detail.phone}</Text>
                        <Text style={MainStyle.briefOrderItem}>{this.state.detail.address}</Text>
                    </View>
                    <View style={MainStyle.userOrderItem}>
                        <Text style={MainStyle.nameOrderItem}>Hình thức giao hàng</Text>
                        <Text style={MainStyle.briefOrderItem}>{this.state.detail.method}</Text>
                    </View>
                    <View>
                        <Text style={[MainStyle.nameOrderItem, {paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}]}>Thông tin đơn hàng</Text>
                        <FlatList style={MainStyle.defaultContainerNew}
                                data={this.state.list}
                                renderItem={({ item }) => (
                                    <View key={item.id} style={MainStyle.infoItemCart}>
                                        <View style={MainStyle.imgItemCart}>
                                            {/* <Image style={MainStyle.imgCart} source={require("../../assets/cart_img_product.png")} /> */}
                                            <Image style={MainStyle.imgCart} source={{uri:item.image }} />
                                        </View>
                                        <View style={[MainStyle.rightInfoItem]}>
                                            <View style={[MainStyle.lineTopItemCart,{marginBottom: 25}]}>
                                                <View style={{width: '70%'}}><Text style={[MainStyle.tProductItemCart, {flexWrap: 'wrap'}]}>{item.title}</Text></View>
                                                <View style={{width: '30%', alignItems: 'flex-end'}}><Text style={[MainStyle.fPriceItemCart]}>{item.price} đ</Text></View>
                                            </View>
                                            <View style={MainStyle.lineTopItemCart}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={MainStyle.txtBCart}>Kiểu dáng: </Text>
                                                    <Text style={MainStyle.txtBCart}>{item.style}</Text>
                                                </View>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={MainStyle.txtBCart}>Kích cỡ: </Text>
                                                    <Text style={MainStyle.txtBCart}>{item.size}</Text>
                                                </View>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={MainStyle.txtBCart}>Số lượng: </Text>
                                                    <Text style={MainStyle.txtBCart}>{item.amount}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                            />
                    </View>
                </ScrollView>

                {/* <FooterBase navigation={navigation} page="user" /> */}
            </Container>
        );
    }
}
 