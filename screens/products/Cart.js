import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { Container, Content, CheckBox, Icon,Picker } from "native-base";
import MainStyle from '../../styles/MainStyle';
import HeaderBase from '../template/HeaderBase';
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';
import global from './../api/global';
import {get_product_by_cart , getSizeStyleEditItemCart} from './../../src/api/apiProducts';

export default class Cart extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	constructor(props){
		super(props);
		
        this.state = {
            list: [],
            total: '',
            count: 0,
			page: 1,
			refreshing: false,
            loading: false,
            cart: '',
            editItemCart : false,
            idEdit: '',
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
            }else{
                this.setState({ loading: false, refreshing: false,count: 0 });
            }
        })
        .catch(err => console.log(err));
	}

    getListCart = (ids) => {
        this.setState({ loading: true });
        get_product_by_cart(ids)
        .then(resJSON => {
            const { list, total,count, error } = resJSON;
            console.log(list);
            if (error == false) {
                this.setState({
                    list: list,  
                    total: total,
                    error: false || null,  
                    count: count,
                });  
            } else {
                this.setState({ loading: false, refreshing: false,count: 0 });
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

    updateItemCart(id){
        var arrCart = JSON.parse(this.state.cart);
        var tmp = [];
        arrCart.map(c => {
            if(c.id != id)
                tmp.push(c);
            else
                tmp.push({
					id: c.id,
					size: this.state.size,
					style: this.state.style,
					amount: this.state.amount,
                });
                this.setState({
                    editItemCart : false,
                    idEdit: '',
                    size: 0,
                    style: 0,
                    arr_size:[],
                    arr_kieu_dang:[],
                    amount: '',
                });
        });
        saveStorage('cart', JSON.stringify(tmp));
        this.makeRemoteRequest();
    }

    editItemCart(id, size, style, amount){
        this.setState({
            editItemCart : false,
            idEdit: '',
            size: 0,
            style: 0,
            arr_size:[],
            arr_kieu_dang:[],
            amount: '',
        });
        this.setState({
            editItemCart : true,
            idEdit: id,
            size: size,
            style: style,
            amount: amount,
        });
        
        getSizeStyleEditItemCart(id)
            .then(resJSON => {
                const { arr_kieu_dang,arr_size, error} = resJSON;
                if (error == false) {
                    this.setState({
                        arr_size: arr_size,
                        arr_kieu_dang: arr_kieu_dang,
                        loaded: true,
                    }); 
                }
            }).catch(err => {
                // this.setState({ loaded: true });  
            }); 
    }

    minus(){
        if(parseInt(this.state.amount)<=1){
            var a = 1;
        }else{
            a = parseInt(this.state.amount)-1;
        }
        var min = a.toString();
        
        this.setState({
            'amount' : min
        });
        console.log(a);
    }
    plus(){ 
        a = parseInt(this.state.amount)+1;
        var add = a.toString();
        this.setState({
            'amount' : add
        });
        console.log(a);
    }
    setAmount=(value, index)=>{
        var min = value.toString();
        
        this.setState(
          {
            "amount": min
          },
          () => {
            // here is our callback that will be fired after state change.
            // Alert.alert(this.state.city);
            // this.getDistricts();
            // this.getAllShowrooms();
          }
        );
    }
    



	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="cart" title={'Giỏ hàng'} navigation={navigation} />
                <View style={MainStyle.pageCart}>
                    <ScrollView style={MainStyle.scrollCart}>
                        {
                            this.state.count > 0 ?
                                this.state.list.map((item, index) => {return (
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
                                                <View style={{flexDirection: 'row', width: '44%', flexWrap: 'wrap'}}>
                                                    <Text style={MainStyle.txtBCart}>Kiểu dáng: </Text>
                                                    {
                                                        this.state.editItemCart == true && this.state.idEdit == item.id ? 
                                                        <View style={{marginLeft: 0, width: '90%',borderWidth: 1, borderColor: '#dddddd'}}>
                                                            <Picker
                                                                selectedValue={this.state.style}
                                                                style={{width: '100%', height: 28, color: '#000000', backgroundColor: '#FFFFFF'}}
                                                                onValueChange={(itemValue, itemIndex) =>
                                                                    this.setState({style: itemValue})
                                                                }
                                                            >
                                                                {this.state.arr_kieu_dang.map((item, index) => {return (
                                                                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                                                                )})} 
                                                            </Picker>
                                                        </View>
                                                        :
                                                        <View><Text style={MainStyle.txtBCart}>{item.style_name}</Text></View>
                                                    }
                                                    
                                                </View>
                                                <View style={{flexDirection: 'row', width: '30%', flexWrap: 'wrap'}}>
                                                    <Text style={MainStyle.txtBCart}>Kích cỡ: </Text>
                                                    {
                                                        this.state.editItemCart == true && this.state.idEdit == item.id ? 
                                                        <View style={{marginLeft: 0, width: '90%',borderWidth: 1, borderColor: '#dddddd'}}>
                                                            <Picker
                                                                selectedValue={this.state.size}
                                                                style={{width: '100%', height: 28, color: '#000000', backgroundColor: '#FFFFFF'}}
                                                                onValueChange={(itemValue, itemIndex) =>
                                                                    this.setState({size: itemValue})
                                                                }
                                                            >
                                                                {this.state.arr_size.map((item, index) => {return (
                                                                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                                                                )})} 
                                                            </Picker>
                                                        </View>
                                                        :
                                                        <Text style={MainStyle.txtBCart}>{item.size_name}</Text>
                                                    }
                                                </View>
                                                <View style={{flexDirection: 'row',width: '25%', flexWrap: 'wrap'}}>
                                                    <Text style={MainStyle.txtBCart}>Số lượng: </Text>
                                                    {
                                                        this.state.editItemCart == true && this.state.idEdit == item.id ? 
                                                        <View style={MainStyle.touchNumbers}>
                                                            <TouchableOpacity onPress={()=> this.minus()} style={MainStyle.minusNumbers}><Text>-</Text></TouchableOpacity>
                                                            <TextInput
                                                                style={{height: 30, textAlign: 'center', width: 30, borderWidth: 1, borderColor: '#ff0700', borderRadius: 3}}
                                                                placeholder='1'
                                                                value={this.state.amount}
                                                                onChangeText={text => this.setAmount(text)}
                                                                keyboardType={'numeric'}
                                                                />  
                                                            <TouchableOpacity onPress={()=> this.plus()} style={MainStyle.minusNumbers}><Text>+</Text></TouchableOpacity>
                                                        </View> 
                                                        :
                                                        <Text style={MainStyle.txtBCart}>{item.amount}</Text>
                                                    }
                                                    
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={MainStyle.taskCart}>
                                        {
                                            this.state.editItemCart == true && this.state.idEdit == item.id ? 
                                            <TouchableOpacity style={MainStyle.editItemCart} onPress={()=> this.updateItemCart(item.id)}>
                                                <Text><Icon type="FontAwesome" name="edit" style={{ color: '#000000', fontSize: 20 }} /></Text>
                                                <Text style={[MainStyle.textTaskCart]}>Cập nhật</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={MainStyle.editItemCart} onPress={()=> this.editItemCart(item.id, item.size, item.style, item.amount)}>
                                                <Text><Icon type="FontAwesome" name="edit" style={{ color: '#000000', fontSize: 20 }} /></Text>
                                                <Text style={[MainStyle.textTaskCart]}>Chỉnh sửa</Text>
                                            </TouchableOpacity>
                                        }
                                        
                                        <TouchableOpacity style={MainStyle.editItemCart} onPress={()=>this.deleteItem(item.id)}>
                                            <Text><Icon type="AntDesign" name="delete" style={{ color: '#000000', fontSize: 20 }} /></Text>
                                            <Text style={[MainStyle.textTaskCart]}>Xóa</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                )})
                            :
                            <View style={{padding: 20}}><Text style={{fontFamily: "RobotoRegular", fontSize: 15,}}>Không có sản phẩm nào trong giỏ hàng</Text></View>
                        }
                    
                   
                    </ScrollView>
                </View>
                {
                    this.state.count > 0 ?
                        <View style={MainStyle.vBootTotalCt}>
                            <View style={MainStyle.totalPriceCart}>
                                <Text style={[MainStyle.txtPayN,{fontSize: 16}]}>Tổng tiền: <Text style={{fontSize: 18,color: '#ff0700'}}>{this.state.total} đ</Text></Text>
                            </View>
                            <TouchableOpacity style={MainStyle.payCart} onPress={()=>this.gotoPayment()}>
                                <Text style={[MainStyle.txtPayN,{fontSize: 18, color: '#FFFFFF'}]}>Thanh toán</Text>
                            </TouchableOpacity>
                        </View>
                    :
                    <View><Text></Text></View>
                }
                
            </Container>
        );
    }
}
 