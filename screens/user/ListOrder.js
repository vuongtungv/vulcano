import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import {getListOrder} from '../../src/api/apiUser';

import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage'

export default class ListOrder extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            user_id: '',
            list: [],
            count: 0,
            page: 1,
        }

        this.arr = [];
    }
 
    componentDidMount() {
        getStorage('user')
        .then(user => {
            if (user != '') {
                let arrUser = JSON.parse(user);
                this.setState({ 
                    user_id: arrUser.id,
                });
                this.getListOrder();
            } 
        });
    }


    gotoDetailOrder(id){
        this.props.navigation.navigate('UserDetailOrderScreen', {order_id : id});
    }
    
    getListOrder= () => {
        this.setState({ loading: true });
        getListOrder(this.state.user_id, this.state.page)
        .then(resJSON => {
            const { list,count, error } = resJSON;
            if (error == false) {
                console.log(list);
                this.setState({
                    listOrder: list,    
                    count: count,
                    loading: false,
                });  
            } else {
                this.setState({ loading: false, refreshing: false, count: 0 });
            }
        
        }).catch(err => {
        
        });
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        },
        () => {
            this.getListOrder();
        });
        // console.log(this.state.page);
    };
    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
	};

	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user_list_order" title={'Đơn hàng của tôi'} navigation={navigation} />
                <View style={[MainStyle.pageShowrooms]}>
                    { this.state.count > 0 ? 
                        <FlatList
                            data={this.state.listOrder}
                            renderItem={({ item }) => (
                                <TouchableOpacity key={item.id} style={MainStyle.userOrderItem} onPress={()=>this.gotoDetailOrder(item.id)}>
                                    <Text style={MainStyle.nameOrderItem}>{item.name}</Text>
                                    <Text style={MainStyle.briefOrderItem}>Mã đơn hàng: {item.code}</Text>
                                    <Text style={MainStyle.briefOrderItem}>Đặt hàng: {item.time_order} {item.created_time}</Text>
                                    <Text style={MainStyle.briefOrderItem}>Trạng thái: {item.status}</Text>
                                </TouchableOpacity>
                            )}
                            // numColumns={6}
                            contentContainerStyle={MainStyle.containerListProducts}
                            ListFooterComponent={this.renderFooter}     
                            refreshing={this.state.refreshing}
                            keyExtractor={item => item.id}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={0.5}
                        />
                        :
                        <View><Text></Text></View>
                    }
                </View>

                {/* <FooterBase navigation={navigation} page="user" /> */}
            </Container>
        );
    }
}
 