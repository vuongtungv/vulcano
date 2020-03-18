import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity, FlatList, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { Container, Content, CheckBox, Icon } from "native-base";
import MainStyle from '../../styles/MainStyle';
import HeaderBase from '../template/HeaderBase';
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';
import global from './../api/global';
import {get_product_by_cart,submitDonHang} from './../../src/api/apiProducts';




export default class Payment extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	constructor(props){
		super(props);
		
        this.state = {
            list: [],
            total: 0,
			page: 1,
			refreshing: false,
            loading: false,
            cart: '',
            methodPayment: false,
            valueMethodPayment: 1,
            genderTF: false,   
            fullname: '',
            valueGender: 1,
            email: '',
            address: '',
            phone: '',
            ids: '',
            user_id : '',
		}
		
		this.arr = [];
	}
	

	componentDidMount(){
        getStorage('user')
        .then(user => {
            if (user != '') {
                let arrUser = JSON.parse(user);
                console.log(arrUser);
                this.setState({ 
                    user_id: arrUser.id,
                    fullname: arrUser.fullname,
                    valueGender: arrUser.gender,
                    email: arrUser.email,
                    address: arrUser.address,
                    phone: arrUser.phone,
                });
                if(this.state.valueGender == 1 ){
                    this.setState({
                        genderTF: false,   
                    });
                }else{
                    this.setState({
                        genderTF: true,   
                    });
                } 
            } 
        });
        this.makeRemoteRequest();
	}
	
	makeRemoteRequest = () => {
        this.arr = [];
        this.setState({ loading: true });
        getStorage('cart')
        .then(cart => {
            if(cart != ''){
                this.setState({cart});
                // console.log(cart);
                var arrCart = JSON.parse(cart);
                var ids = '';
				arrCart.map(c => {
                    if(ids == '')
                        ids = c.id+','+c.size+','+c.style+','+c.amount;
                    else
                        ids = ids + '|' + c.id+','+c.size+','+c.style+','+c.amount;
                })
                this.setState({
                    ids:ids
                });
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

    submitPayment(){
        var fullname = this.state.fullname;
        var valueGender = this.state.valueGender;
        var email = this.state.email;
        var address = this.state.address;
        var phone = this.state.phone;
        var valueMethodPayment = this.state.valueMethodPayment;
        var ids = this.state.ids;                                                                                             
        var user_id = this.state.user_id;                                                                                             
        
        // if(this.state.list==''){
        //     Alert.alert('Rỗng');
        // }else{
        //     Alert.alert('Có sản phẩm');
        // }


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

        if(address == ''){
            Alert.alert('Địa chỉ không được để trống.');
            return;
        }

        if(phone == ''){
            Alert.alert('Số điện thoại không được để trống.');
            return;        
        }else{
            // regex_phone = /^0\d{9}$/;
            regex_phone = /^[0-9 .]+$/;
            if (regex_phone.test(phone) && (phone.length ==10 || phone.length== 11)) {   //điền đúng định dạng

            }else{
                Alert.alert('Số điện thoại gồm 10 hoặc 11 số.');
                return;
            } 
        }


        submitDonHang(user_id,fullname, valueGender, email, address, phone,valueMethodPayment,ids)

            .then((responseJson) => {
                // console.log(responseJson.order_id);
                if (responseJson.error == '0') {
                    this.setState({ order_id: responseJson.order_id, link: responseJson.link});

                    // this.props.navigation.goBack();
                    // global.onRefresh();
                    saveStorage('cart', '');
                    // console.log(responseJson.order_id);
                    if(valueMethodPayment ==1 ){
                        this.props.navigation.navigate('PaymentSuccessScreen', {order_id : responseJson.order_id});
                    }else{
                        this.props.navigation.navigate('PaymentWebScreen', {order_id : responseJson.order_id, link : responseJson.link});
                    }
                    
                } else {
                    Alert.alert('Thông báo', responseJson.message);
                }
            }).done();  

        
          
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
    
    // phương thức thanh toán
    renderButtonMethodPayment(){
        if(this.state.methodPayment == true)
            return (
                <View style={{padding: 20}}>
                    <TouchableOpacity style={[MainStyle.radioCheck,{marginBottom: 10}]} onPress={() => this.setStateMethodPay('1')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[MainStyle.fontRegular,{marginRight: 10,borderColor:'#dddddd', borderWidth: 1,padding: 2,marginTop: -2, borderRadius: 12, width:24, height: 24}]}>
                                <View style={{width: 16, height: 16, borderRadius: 9}}></View>
                            </View> 
                            <Text style={[MainStyle.fontRegular,MainStyle.pTextMethodPayment]}>Giao hàng - Nhận tiền (COD)</Text>
                        </View> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={[MainStyle.radioCheck, {marginBottom: 10}]} onPress={() => this.setStateMethodPay('2')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[MainStyle.fontRegular,{marginRight: 10,borderColor:'#000000', borderWidth: 1,padding: 3,marginTop: -2, borderRadius: 12, width:24, height: 24}]}>
                                <View style={{backgroundColor: '#000000', width: 16, height: 16, borderRadius: 8}}></View>
                            </View> 
                            <Text style={[MainStyle.fontRegular,MainStyle.pTextMethodPayment]}>Thanh toán online</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        else
            return ( 
                <View style={{padding: 20}}>
                    <TouchableOpacity style={[MainStyle.radioCheck, {marginBottom: 10}]} onPress={() => this.setStateMethodPay('1')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[MainStyle.fontRegular,{marginRight: 10,borderColor:'#000000', borderWidth: 1,padding: 3,marginTop: -2, borderRadius: 12, width:24, height: 24}]}>
                                <View style={{backgroundColor: '#000000', width: 16, height: 16, borderRadius: 8}}></View>
                            </View> 
                            <Text style={[MainStyle.fontRegular,MainStyle.pTextMethodPayment]}>Giao hàng - Nhận tiền (COD)</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[MainStyle.radioCheck,{marginBottom: 10}]} onPress={() => this.setStateMethodPay('2')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[MainStyle.fontRegular,{marginRight: 10,borderColor:'#dddddd', borderWidth: 1,padding: 2,marginTop: -2, borderRadius: 12, width:24, height: 24}]}>
                                <View style={{width: 16, height: 16, borderRadius: 9}}></View>
                            </View> 
                            <Text style={[MainStyle.fontRegular,MainStyle.pTextMethodPayment]}>Thanh toán online</Text>
                        </View> 
                    </TouchableOpacity>  
                </View>
            )
    }
    setStateMethodPay(method){
        if(method ==1 ){
            this.setState({
                methodPayment: false,   
                valueMethodPayment: method
            });
        }else{
            this.setState({
                methodPayment: true,   
                valueMethodPayment: method
            });
        }    
    }

    loginUser(){
        this.props.navigation.navigate('LoginScreen');
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="cart" title={'Thanh toán'} navigation={navigation} />
                <View style={[MainStyle.pageCart,{backgroundColor: "#FFFFFF"}]}>
                    <KeyboardAvoidingView
                        behavior='height'
                        keyboardVerticalOffset={80}
                    >
                        <ScrollView style={[MainStyle.scrollCart]}>
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
                                            <View style={{flexDirection: 'row', width: '44%', flexWrap: 'wrap'}}>
                                                <Text style={MainStyle.txtBCart}>Kiểu dáng: </Text>
                                                <Text style={MainStyle.txtBCart}>{item.style_name}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', width: '30%', flexWrap: 'wrap'}}>
                                                <Text style={MainStyle.txtBCart}>Kích cỡ: </Text>
                                                <Text style={MainStyle.txtBCart}>{item.size_name}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row',width: '25%', flexWrap: 'wrap'}}>
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
                                {
                                    this.state.user_id 
                                    ? 
                                        <View><Text></Text></View>
                                    :
                                    <View style={{flexDirection: 'row', paddingLeft: 20}}>
                                        <View><Text style={MainStyle.inforNotePay}>Vui lòng </Text></View>
                                        <TouchableOpacity onPress={()=>this.loginUser()}><Text style={[MainStyle.inforNotePay,{color: '#ff0700'}]}>đăng nhập</Text></TouchableOpacity> 
                                        <View><Text style={MainStyle.inforNotePay}> tài khoản để thanh toán tiện lợi hơn</Text></View>
                                    </View>
                                }
                                
                                
                                    <View style={MainStyle.lineInputPayment}>
                                        <View style={MainStyle.wid30}>
                                            <Text style={[MainStyle.titleInput,{marginRight:5}]}>Họ tên</Text>
                                            <Text style={[MainStyle.titleInput,{color: '#ff0700'}]}>*</Text>
                                            </View>
                                        <View style={MainStyle.wid70}>
                                            <TextInput
                                                style={MainStyle.inputInforPay}
                                                placeholder='Họ tên'
                                                onChangeText={(fullname) => this.setState({fullname})}
                                                value={this.state.fullname}
                                                /> 
                                        </View>
                                    </View>
                                    <View style={MainStyle.lineInputPayment}>
                                        <View style={MainStyle.wid30}>
                                            <Text style={[MainStyle.titleInput,{marginRight:5}]}>Giới tính</Text>
                                            <Text style={[MainStyle.titleInput,{color: '#ff0700'}]}>*</Text>
                                            </View>
                                        <View style={MainStyle.wid70}>
                                            {this.renderButtonGender()}
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
                                                placeholder='Email'
                                                onChangeText={(email) => this.setState({email})}
                                                value={this.state.email}
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
                                                placeholder='Địa chỉ'
                                                onChangeText={(address) => this.setState({address})}
                                                value={this.state.address}
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
                                                placeholder='Di dộng'
                                                onChangeText={(phone) => this.setState({phone})}
                                                value={this.state.phone}
                                                keyboardType={'numeric'}
                                            />
                                        </View>
                                    </View>
                            </View>

                            <View style={MainStyle.inforCustom}>
                                <View style={MainStyle.vHeaderOtherNews}>
                                    <Text style={MainStyle.txtOtherNews}>Hình thức thanh toán</Text>
                                    <View style={[MainStyle.brBottomOther, {width: 140}]}></View>
                                </View>
                                {this.renderButtonMethodPayment()}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                
                <View style={MainStyle.vBootTotalCt}>
                    <TouchableOpacity style={MainStyle.submitPayment} onPress={()=>this.submitPayment()}>
                        <Text style={[MainStyle.txtPayN,{fontSize: 19, color: '#FFFFFF', textTransform: 'uppercase'}]}>Hoàn thành đặt mua</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}
 