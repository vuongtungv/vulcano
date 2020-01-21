import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity, FlatList, TextInput, Alert,Dimensions } from 'react-native';
import { Container, Content, CheckBox, Icon } from "native-base";
import MainStyle from '../../styles/MainStyle';
import HeaderBase from '../template/HeaderBase';
import saveStorage from '../api/saveStorage';
import getStorage from '../api/getStorage';
import global from '../api/global';
import { getDetailOrder } from '../../src/api/apiProducts';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;


export default class PaymentSuccess extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		header: null
	});

	constructor(props){
		super(props);
		
        this.state = {
            detail: '',
            list: [],
			refreshing: false,
            loading: false,
		}
		
		this.arr = [];
	}
	

	componentDidMount(){
        // const { order_id } = this.props.navigation.state.params;
        getDetailOrder(102)
            .then(resJSON => {
                const { detail, list, error} = resJSON;
                
                if (error == false) {
                    this.setState({
                        detail: detail,
                        list: list,
                        loaded: true,
                    });
                
                }
            }).catch(err => {
                this.setState({ loaded: true });  
            }); 
	}


    gotoHome(){
        this.props.navigation.navigate('HomeScreen');
    }

    

    

    


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="payment_success" title={'Thanh toán thành công'} navigation={navigation} />
                <View style={{alignItems: "center",width: ScreenWidth, height: 100}}>
                    <Image style={{width: 100,height:100}} source={require("../../assets/icon_success.png")} />
                    <Text style={{fontFamily: 'RobotoRegular', fontSize: 15}}>Đặt hàng thành công</Text>
                </View>
                <View style={{width: ScreenWidth, padding: 20}}>
                    <Text style={{fontFamily: 'RobotoBold', fontSize: 16}}>Mã đơn hàng: {this.state.detail.code}</Text>
                    <Text style={{fontFamily: 'RobotoRegular', fontSize: 14}}>Cảm ơn quý khách {this.state.detail.name} đã mua hàng trên <Text style={{fontFamily: 'RobotoBold'}}>vulcano.vn</Text></Text>
                    <Text style={{fontFamily: 'RobotoRegular', fontSize: 14, textAlign: 'justify'}}>
                        Nhằm giúp việc xử lý đơn hàng nhanh hơn nữa, <Text style={{fontFamily: 'RobotoBold'}}>vulcano.vn</Text> sẽ không gọi điện hoặc gửi tin nhắn đến Quý khách để xác nhận đơn hàng. Nếu Quý khách có nhu cầu xem lại thông tin mua hàng, vui lòng kiểm tra xác nhận đơn hàng đã được gửi qua email.
                    </Text>
                    <Text style={{fontFamily: 'RobotoRegular', fontSize: 14, marginTop: 5,textAlign: 'justify'}}>
                        Trong trường hợp Quý khách không phải là người trực tiếp nhận hàng. Quý khách vui lòng thông báo cho người nhận luôn bật điện thoại để nhận liên lạc.
                    </Text>
                </View>

                <View style={MainStyle.vHeaderOtherNews}>
                    <Text style={MainStyle.txtOtherNews}>Thông tin người nhận hàng</Text>
                    <View style={MainStyle.brBottomOther}></View>
                </View>


                <View style={MainStyle.vBootTotalCt}>
                    <TouchableOpacity style={MainStyle.submitPayment} onPress={()=>this.gotoHome()}>
                        <Text style={[MainStyle.txtPayN,{fontSize: 19, color: '#FFFFFF', textTransform: 'uppercase'}]}>Quay về trang chủ</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}
 