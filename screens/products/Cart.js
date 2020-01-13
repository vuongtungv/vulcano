import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { Container, Content, CheckBox, Icon } from "native-base";
import MainStyle from '../../styles/MainStyle';
import HeaderBase from '../template/HeaderBase';
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';
import global from './../api/global';
import {get_product_by_cart} from './../../src/api/apiProducts';

export default class Cart extends React.Component {
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
                // get_product_by_cart = () => {
                //     this.setState({ loading: true });
                //     get_product_by_cart(ids)
                //     .then(resJSON => {
                //         const {list, total } = resJSON;
                //         console.log(list);
                //         this.arr = list.concat(this.arr);
                //         this.setState({
                //             list: this.arr, 
                //             refreshing: false,
                //             loading: false,
                //             total: total
                //         });
                //     }).catch(err => {
                //         // this.setState({ loading: false }); 
                //     });
                // }
                // console.log(ids);
                // fetch(global.BASE_URL+'/get_product_by_cart.api', {  
                //     method: 'POST',
                //     headers: {
                //       'Accept': 'application/json',
                //       'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         cart:ids,
                //     })
                //   })
                // .then(res => res.json())
                // .then(resJSON => {
                //     const {list, total } = resJSON;
                //     console.log(list);
                //     this.arr = list.concat(this.arr);
                //     this.setState({
                //         list: this.arr, 
                //         refreshing: false,
                //         loading: false,
                //         total: total
                //     });
                // })
                // .catch(err => console.log(err));
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
                <HeaderBase page="cart" title={'Giỏ hàng'} navigation={navigation} />
                <View style={MainStyle.pageCart}>
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
                            <View style={MainStyle.taskCart}>
                                <View style={MainStyle.editItemCart}>
                                    <Text><Icon type="FontAwesome" name="edit" style={{ color: '#000000', fontSize: 20 }} /></Text>
                                    <Text style={[MainStyle.textTaskCart]}>Chỉnh sửa</Text>
                                </View>
                                <View style={MainStyle.editItemCart}>
                                    <Text><Icon type="AntDesign" name="delete" style={{ color: '#000000', fontSize: 20 }} /></Text>
                                    <Text style={[MainStyle.textTaskCart]}>Xóa</Text>
                                </View>
                            </View>
                        </View>
                        )})} 
                   
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
 