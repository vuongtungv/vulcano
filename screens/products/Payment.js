import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { Container, Content, CheckBox, Icon } from "native-base";
import MainStyle from '../../styles/MainStyle';
import HeaderBase from '../template/HeaderBase';
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';
import global from './../api/global';
import {get_product_by_cart} from './../../src/api/apiProducts';

export default class Payment extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	constructor(props){
		super(props);
		
        this.state = {
            list: [],
            total: '',
			page: 1,
			refreshing: false,
            loading: false,
            cart: ''
		}
		
		this.arr = [];
	}
	

	componentDidMount(){
        this.makeRemoteRequest();
	}
	
	makeRemoteRequest = () => {
        this.arr = [];
        this.setState({ loading: true });
        getStorage('cart')
        .then(cart => {
            if(cart != ''){
                this.setState({cart});
                
                var arrCart = JSON.parse(cart);
                var ids = '';
				arrCart.map(c => {
                    if(ids == '')
                        ids = c.id+','+c.size+','+c.style+','+c.amount;
                    else
                        ids = ids + '|' + c.id+','+c.size+','+c.style+','+c.amount;
                })
                this.getListCart(ids);
            }
        })
        .catch(err => console.log(err));
	}

    getListCart = (ids) => {
        this.setState({ loading: true });
        get_product_by_cart(ids)
        .then(resJSON => {
            const { list, total,error } = resJSON;
            console.log(list);
            if (error == false) {
                this.setState({
                    list: list,  
                    total: total,
                    error: false || null,  
                });  
            } else {
                this.setState({ loading: false, refreshing: false });
            }
    
        }).catch(err => {
            // this.setState({ loading: false }); 
        });
    }


    updateCart(){
        Alert.alert('Thông báo', 'Cập nhật đơn hàng thành công!');
    }

    gotoPayment(){
        this.props.navigation.navigate('PaymentScreen');
    }

    deleteItem(id){
        var arrCart = JSON.parse(this.state.cart);
        var tmp = [];
        arrCart.map(c => {
            if(c.id != id)
                tmp.push(c);
        });
        saveStorage('cart', JSON.stringify(tmp));
        this.makeRemoteRequest();
    }

    changeSize(id, size){
        var arrCart = JSON.parse(this.state.cart);
        var tmp = [];
        arrCart.map(c => {
            if(c.id != id)
                tmp.push(c);
            else
                tmp.push({
					id: c.id,
					size: size,
					quantity: c.quantity,
				});
        });
        saveStorage('cart', JSON.stringify(tmp));
        this.makeRemoteRequest();
    }

    changeQuantity(id, quantity){
        var arrCart = JSON.parse(this.state.cart);
        var tmp = [];
        arrCart.map(c => {
            if(c.id != id)
                tmp.push(c);
            else
                tmp.push({
					id: c.id,
					size: c.size,
					quantity: quantity,
				});
        });
        saveStorage('cart', JSON.stringify(tmp));
        this.makeRemoteRequest();
    }

    renderPrice(item){
        if(item.discount > 0){ 
            return(
                <View style={[MainStyle.cartItemInfoItem, {flexDirection: 'row'}]}>
                    <Text style={[MainStyle.cartItemInfoPrice, MainStyle.red]}>{item.price}</Text>
                    <Text style={[MainStyle.cartItemInfoPrice, MainStyle.productItemPriceOld, {paddingLeft: 5}]}>{item.price_old}</Text>
                </View>
            );
        }else{
            return (
                <View style={MainStyle.cartItemInfoItem}>
                    <Text style={[MainStyle.cartItemInfoPrice, MainStyle.red]}>{item.price}</Text>
                </View>
            )
        }
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="cart" title={'Thanh toán'} navigation={navigation} />
                <View style={[MainStyle.pageCart,{backgroundColor: "#FFFFFF"}]}>
                    <ScrollView style={MainStyle.scrollCart}>
                        {this.state.list.map((item, index) => {return (
                            <View style={MainStyle.itemCart} key={item.id}>
                            <View style={MainStyle.infoItemCart}>
                                <View style={MainStyle.imgItemCart}>
                                    {/* <Image style={MainStyle.imgCart} source={require("../../assets/cart_img_product.png")} /> */}
                                    <Image style={MainStyle.imgCart} source={{uri:item.image }} />
                                </View>
                                <View style={[MainStyle.rightInfoItem]}>
                                    <View style={[MainStyle.lineTopItemCart,{marginBottom: 25}]}>
                                        <View><Text style={MainStyle.tProductItemCart}>{item.name}</Text></View>
                                        <View><Text style={[MainStyle.fPriceItemCart]}>{item.price} đ</Text></View>
                                    </View>
                                    <View style={MainStyle.lineTopItemCart}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={MainStyle.txtBCart}>Kiểu dáng: </Text>
                                            <Text style={MainStyle.txtBCart}>{item.style_name}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={MainStyle.txtBCart}>Kích cỡ: </Text>
                                            <Text style={MainStyle.txtBCart}>{item.size_name}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={MainStyle.txtBCart}>Số lượng: </Text>
                                            <Text style={MainStyle.txtBCart}>{item.amount}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        )})} 

                        <View style={MainStyle.inforCustom}>
                            <View style={MainStyle.vHeaderOtherNews}>
                                <Text style={MainStyle.txtOtherNews}>Thông tin đặt hàng</Text>
                                <View style={[MainStyle.brBottomOther, {width: 140}]}></View>
                            </View>
                            <Text style={MainStyle.inforNotePay}>Vui lòng đăng nhập tài khoản để thanh toán tiện lợi hơn</Text>
                            <View style={MainStyle.lineInputPayment}>
                                <View style={MainStyle.wid30}>
                                    <Text style={[MainStyle.titleInput,{marginRight:5}]}>Họ tên</Text>
                                    <Text style={[MainStyle.titleInput,{color: '#ff0700'}]}>*</Text>
                                    </View>
                                <View style={MainStyle.wid70}>
                                    <TextInput
                                        style={MainStyle.inputInforPay}
                                        placeholder='1'
                                        value={this.state.amount}
                                        onChangeText={text => onChangeText(text)}
                                        // value={value}
                                        /> 
                                </View>
                            </View>
                            <View style={MainStyle.lineInputPayment}>
                                <View style={MainStyle.wid30}>
                                    <Text style={[MainStyle.titleInput,{marginRight:5}]}>Email</Text>
                                    <Text style={[MainStyle.titleInput,{color: '#ff0700'}]}>*</Text>
                                    </View>
                                <View style={MainStyle.wid70}>
                                    <TextInput
                                        style={MainStyle.inputInforPay}
                                        placeholder='1'
                                        value={this.state.amount}
                                        onChangeText={text => onChangeText(text)}
                                        // value={value}
                                        /> 
                                </View>
                            </View>
                            <View style={MainStyle.lineInputPayment}>
                                <View style={MainStyle.wid30}>
                                    <Text style={[MainStyle.titleInput,{marginRight:5}]}>Địa chỉ</Text>
                                    <Text style={[MainStyle.titleInput,{color: '#ff0700'}]}>*</Text>
                                    </View>
                                <View style={MainStyle.wid70}>
                                    <TextInput
                                        style={MainStyle.inputInforPay}
                                        placeholder='1'
                                        value={this.state.amount}
                                        onChangeText={text => onChangeText(text)}
                                        // value={value}
                                        /> 
                                </View>
                            </View>
                            <View style={MainStyle.lineInputPayment}>
                                <View style={MainStyle.wid30}>
                                    <Text style={[MainStyle.titleInput,{marginRight:5}]}>Di động</Text>
                                    <Text style={[MainStyle.titleInput,{color: '#ff0700'}]}>*</Text>
                                    </View>
                                <View style={MainStyle.wid70}>
                                    <TextInput
                                        style={MainStyle.inputInforPay}
                                        placeholder='1'
                                        value={this.state.amount}
                                        onChangeText={text => onChangeText(text)}
                                        // value={value}
                                        /> 
                                </View>
                            </View>
                        </View>
                        

                    
                    </ScrollView>
                </View>
                <View style={MainStyle.vBootTotalCt}>
                    <View style={MainStyle.totalPriceCart}>
                        <Text style={[MainStyle.txtPayN,{fontSize: 16}]}>Tổng tiền: <Text style={{fontSize: 18,color: '#ff0700'}}>{this.state.total} đ</Text></Text>
                    </View>
                    <TouchableOpacity style={MainStyle.payCart} onPress={()=>this.gotoPayment()}>
                        <Text style={[MainStyle.txtPayN,{fontSize: 18, color: '#FFFFFF'}]}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}
 