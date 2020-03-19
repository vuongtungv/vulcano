import React, { Component } from 'react';
import { 
    Text, View, Image, Dimensions , Alert,TouchableOpacity, FlatList
} from 'react-native';
import MainStyle from './../../styles/MainStyle';
import { Icon } from "native-base";
  
let ScreenWidth = Dimensions.get("window").width;
import {getCateNews} from './../../src/api/apiNews';
import {getTotalNotifications} from './../../src/api/apiUser';
import getStorage from './../api/getStorage';


export default class HeaderBase extends Component {
    constructor(props) {
        super(props);
        this.state={
            ListCateNewsHeader: false,
            countNotify: 0,
        }
        global.onRefresh = this.onRefresh.bind(this);
    } 

    componentDidMount() {
        this.getCateNews();
        getStorage('user')
        .then(user => {  
            if (user != '') {
                let arrUser = JSON.parse(user);
                this.setState({user_id: arrUser.id, token: arrUser.token});
                this.setState({user_id: arrUser.id, token: arrUser.token});
                this.getCountNotifi();
            }else{
                this.setState({countNotify: 0});
            }  
        });
    }

    gotoBack(){
        this.props.navigation.goBack();
    }


    getCateNews(){
        getCateNews()
        .then(resJSON => {
            const { list, error } = resJSON;
            // console.log(list); 
            if (error == false) {
                this.setState({
                listCateNews: list,  
                    loading: false,
                    refreshing: false,
                    error: false || null,  
                });  
                // console.log(list);
            } else {
                this.setState({ loading: false, refreshing: false });
            }

        }).catch(err => {
            this.setState({ loading: false }); 
        });
    }
    setStateListCateNewsHeader(method){
        this.setState({
            ListCateNewsHeader: !this.state.ListCateNewsHeader,   
        });  
    }
    showListCateNewsHeader(){
        if(this.state.ListCateNewsHeader)
            return (
                <View style={MainStyle.listCateNews}>
                    <View style={MainStyle.trianleTop}>
                        <Image source={require("../../assets/iconTop.png")}/>
                    </View>
                    <FlatList  
                        data={this.state.listCateNews}   
                        renderItem={({ item }) => (
                            <TouchableOpacity style={MainStyle.itemHeaderCateNews} onPress={() => this.gotoListNewsCate(item.id)}>
                                <Text style={MainStyle.txtCateHeaderNews}><Icon type="EvilIcons" name="chevron-right" style={{ color: '#000000', fontSize: 22 }} /> {item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    /> 
                    <View style={[MainStyle.borderCateNews]}></View>  
                </View>
            )
    }
    gotoListNewsCate(id){
        this.props.navigation.goBack();
        global.onRefresh();
        this.props.navigation.navigate('CateNewsScreen',{ id: id });
    }
    searchHome(){
        this.props.navigation.navigate('SearchHomeScreen');
    }
    notifiHome(){
        this.props.navigation.navigate('NotifiHomeScreen');
    }
    getCountNotifi = () => {
        // this.setState({ loading: true });
        getTotalNotifications(this.state.user_id, this.state.token)
        .then(resJSON => {  
            const { count, error} = resJSON;
            if (error == false) {
                this.setState({
                  countNotify: count,  
                });  
            } else {
                this.setState({ loading: false, refreshing: false });
            }
    
        }).catch(err => {
            // this.setState({ loading: false }); 
        });
      }

    
    onRefresh() {
        this.arr = [];
        this.setState({
            listRest: []
        });
    }


    show_count_notifi(){
        if(this.state.countNotify)
            return (
                <TouchableOpacity style={MainStyle.iconNotifiHeader} onPress={()=>this.notifiHome()}>
                    {/* <Icon type="Ionicons" name="ios-notifications-outline" style={{ color: '#000000', fontSize: 25 }} /> */}
                    <View style={MainStyle.vNotify}>
                        <Image style={{width: 21, height: 23 }} source={require("../../assets/icon_notify.png")} />
                        <View style={MainStyle.vnumNotify}>
                            <Text style={MainStyle.tnumNotify}>{this.state.countNotify}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
    }



    render() {
        const { navigation, page, title, heading } = this.props;
        switch(page){
            case 'home':
                return(
                    <View style={MainStyle.barHearder}>
                        <View style={MainStyle.logoHeader}> 
                            <Image style={{width: 99, height: 40}} source={require("../../assets/logo.png")} />
                        </View>
                        <TouchableOpacity style={MainStyle.iconSearchHeader} onPress={()=>this.searchHome()}>
                            <Icon type="FontAwesome" name="search" style={{ color: '#000000', fontSize: 22 }} />
                        </TouchableOpacity>
                        {this.show_count_notifi()}
                    </View>
                );
            case 'search':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );
            
            // sản phẩm
            case 'categories':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );
            case 'list_products':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );
            case 'cart':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                        <TouchableOpacity style={MainStyle.iconSearchHeader} onPress={()=>this.searchHome()}>
                            <Icon type="FontAwesome" name="search" style={{ color: '#000000', fontSize: 22 }} />
                        </TouchableOpacity>
                    </View>
                );

            // tin tức
            case 'news':
                return(
                    <View style={{position: 'relative'}}>
                        <View style={MainStyle.barHearder}>
                            <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                                <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                            </TouchableOpacity>
                            <View style={MainStyle.titleCenterHeader}> 
                                <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                            </View>
                            <TouchableOpacity style={MainStyle.iconDotsHeader} onPress={()=>this.setStateListCateNewsHeader()}>
                                <Icon type="MaterialCommunityIcons" name="dots-vertical" style={{ color: '#000000', fontSize: 23 }} />
                            </TouchableOpacity>
                        </View>
                        {this.showListCateNewsHeader()}
                    </View>
                    
                );
            case 'detail_news':
                return(
                    <View style={{position: 'relative'}}>
                        <View style={MainStyle.barHearder}>
                            <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                                <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                            </TouchableOpacity>
                            <View style={MainStyle.titleCenterHeader}> 
                                <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                            </View>
                            <TouchableOpacity style={MainStyle.iconDotsHeader} onPress={()=>this.setStateListCateNewsHeader()}>
                                <Icon type="MaterialCommunityIcons" name="dots-vertical" style={{ color: '#000000', fontSize: 23 }} />
                            </TouchableOpacity>
                        </View>
                        {this.showListCateNewsHeader()}
                    </View>
                );
            case 'videos':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );
            case 'showrooms':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );
            case 'user':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );
            case 'user_list_order':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );
            default: 
                return(
                    <View style={MainStyle.barHearder}>
                        <View style={MainStyle.logoHeader}> 
                            <Image style={{width: 99, height: 40}} source={require("../../assets/logo.png")} />
                        </View>
                        <TouchableOpacity style={MainStyle.iconSearchHeader} onPress={()=>this.searchHome()}>
                            <Icon type="FontAwesome" name="search" style={{ color: '#000000', fontSize: 22 }} />
                        </TouchableOpacity>
                    </View>
                );
        }
    }
}
