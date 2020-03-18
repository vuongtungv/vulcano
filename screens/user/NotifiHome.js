import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';

import { getListNotifications } from '../../src/api/apiUser';


export default class NotifiHome extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            user_id: '',
            fullname: '',
            email: '',
            created_time: '',
            token: '',
        }

        this.arr = [];
    }
 
    componentDidMount() {
        getStorage('user')
        .then(user => {
            if (user != '') {
                let arrUser = JSON.parse(user);
                console.log(arrUser);
                this.setState({ 
                    user_id: arrUser.id,
                    fullname: arrUser.fullname,
                    email: arrUser.email,
                    created_time: arrUser.created_time,
                    token: arrUser.token,
                });
                this.getListNotifications();
            } 
        });
    }

    getListNotifications(){
        getListNotifications(this.state.user_id, this.state.token)
        .then(resJSON => {
            const { list,count, error} = resJSON;      
            if (error == false) {
                this.setState({
                    list: list,
                    refreshing: false,
                    loading: false,
                    count: count,
                });
            }else{
                this.setState({
                    count: 0,
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
                <HeaderBase page="user" title={'Thông báo'} navigation={navigation} />
                { this.state.user_id ?
                    <ScrollView style={{}}>
                        <TouchableOpacity onPress={()=>this.detailProduct()}> 
                            <View style={MainStyle.infoItemCart}>
                                <View style={{marginRight: 10, width: 70, height: 70, borderRadius: 40, overflow: 'hidden'}}>
                                    <Image style={{width: 70, height: 70}} source={require("../../assets/cart_img_product.png")} />
                                    {/* <Image style={MainStyle.imgCart} source={{uri:item.image }} /> */}
                                </View>
                                <View style={[MainStyle.rightInfoItem]}>
                                    <View>
                                        <View style={{width: '100%'}}>
                                            <Text style={[MainStyle.tProductItemCart,{fontFamily: 'RobotoBold'}]}>ÁO SƠ MI DÀI TAY 9360 - XSD6659360</Text>
                                            <Text style={[MainStyle.tProductItemCart,{textTransform: 'lowercase'}]}> vừa được đăng bán</Text>
                                        </View>
                                        <View style={{width: '100%', marginTop: 12}}>
                                            <Text style={MainStyle.dateTimeNotifi}>15:12, 23/02/2020</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                    :
                    <View><Text>Bạn cần đăng nhập để nhận thông báo</Text></View>
                }
                
                {/* <FooterBase navigation={navigation} page="user" /> */}
            </Container>
        );
    }
}
 