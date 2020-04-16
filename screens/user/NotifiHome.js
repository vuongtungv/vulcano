import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';

import { getListNotifications, updateIsReadNotifications } from '../../src/api/apiUser';


export default class NotifiHome extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            page: 1,
            count: '',
            list: [],
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
                this.makeRequestCompoment();
                this.updateRead();
            } 
        });
    }

    makeRequestCompoment(){   
    
        getListNotifications(this.state.page,this.state.user_id, this.state.token)
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
            this.setState({ loading: false });   
        }); 
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        },
        () => {
            this.makeRequestCompoment();
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


    detailNotifi(screen, id){
        this.props.navigation.navigate(screen,{ id: id });
    }
    updateRead(){
        updateIsReadNotifications(this.state.user_id, this.state.token)
        .then(resJSON => {
            const { error} = resJSON;      
            if (error == false) {
               
            }
        }).catch(err => {
            this.setState({ loading: false });   
        }); 
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user" title={'Thông báo'} navigation={navigation} />
                { this.state.user_id ?
                    <View style={[MainStyle.notifiListHome]}>
                        {
                            this.state.count > 0 ?
                            <FlatList  
                                data={this.state.list}   
                                renderItem={({ item }) => (
                                    <TouchableOpacity key={item.id} onPress={()=>this.detailNotifi(item.screen,item.record_id)}> 
                                        <View style={MainStyle.infoItemCart}>
                                            <View style={{marginRight: 10, width: 70, height: 70, borderRadius: 40, overflow: 'hidden', backgroundColor: '#d9d9d9', justifyContent: 'center', alignItems: 'center'}}>
                                                {/* <Image style={{width: 65, height: 35}}  source={require("../../assets/logo.png")} /> */}
                                                { 
                                                    item.image !='' ? 
                                                    <Image style={MainStyle.imgCart} source={{uri:item.image }} />
                                                    :
                                                    <Image style={{width: 65, height: 35}}  source={require("../../assets/logo.png")} />
                                                }
                                            </View>
                                            <View style={[MainStyle.rightInfoItem]}>
                                                <View>
                                                    <View style={{width: '100%'}}>
                                                        <Text style={[MainStyle.tProductItemCart,{fontFamily: 'RobotoBold'}]}>{item.title}</Text>
                                                        <Text style={[MainStyle.tProductItemCart,{textTransform: 'lowercase'}]}> {item.body}</Text>
                                                    </View>
                                                    <View style={{width: '100%', marginTop: 0}}>
                                                        <Text style={MainStyle.dateTimeNotifi}>{item.created_time}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.id}
                                    contentContainerStyle={MainStyle.containerListProducts}
                                    ListFooterComponent={this.renderFooter}     
                                    refreshing={this.state.refreshing}
                                    onEndReached={this.handleLoadMore}
                                    onEndReachedThreshold={0.5}
                            />   
                            :
                            <View style={{padding: 20}}><Text>Bạn không có thông báo.</Text></View>
                        }
                    </View>
                    :
                    <View style={{padding: 20}}><Text>Bạn cần đăng nhập để nhận thông báo</Text></View>
                }
                
                {/* <FooterBase navigation={navigation} page="user" /> */}
            </Container>
        );
    }
}
 