import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon } from "native-base";

import MainStyle from './../../styles/MainStyle';

export default class FooterBase extends Component {
    constructor(props) {   
        super(props);
    } 

    componentDidMount() {
        
    }

    gotoHomeScreen(){
        this.props.navigation.navigate('HomeScreen');
    }
    
    gotoCategories(){
        this.props.navigation.navigate('CategoriesScreen');
    }

    gotoCart(){
        this.props.navigation.navigate('CartScreen');
    }

    gotoShowrooms(){
        this.props.navigation.navigate('ListShowroomsScreen');
    }
    gotoUser(){
        this.props.navigation.navigate('UserScreen');
    }


    render() {

        const { navigation, page } = this.props;
        return (
            <View style={[MainStyle.tFooter]}>
                <TouchableOpacity style={MainStyle.tFItem} onPress={() => this.gotoHomeScreen()}>
                    {
                        page == 'home' ?
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 40,height:40}} source={require("../../assets/bar_home.png")} /> */}
                                <Icon type="FontAwesome" name="home" style={{ color: '#000000', fontSize: 27 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText,{color: '#000000'}]}>Trang chủ</Text>
                        </View> 
                        :
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 40,height:40}} source={require("../../assets/bar_home.png")} /> */}
                                <Icon type="FontAwesome" name="home" style={{ color: '#777777', fontSize: 27 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText,{color: '#777777'}]}>Trang chủ</Text>
                        </View>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={MainStyle.tFItem} onPress={()=>this.gotoCategories()}>
                    {   
                        page == 'categories' ?
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 40,height:40}} source={require("../../assets/bar_cate.png")} /> */}
                                <Icon type="Feather" name="menu" style={{ color: '#000000', fontSize: 27 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText, {color: '#000000'}]}>Danh mục</Text>
                        </View> 
                        :
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 40,height:40}} source={require("../../assets/bar_cate.png")} /> */}
                                <Icon type="Feather" name="menu" style={{ color: '#777777', fontSize: 27 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText,{color: '#777777'}]}>Danh mục</Text>
                        </View>
                    }
                </TouchableOpacity>
               
                <TouchableOpacity style={MainStyle.tFItem} onPress={()=>this.gotoCart()}>
                    {
                        page == 'cart' ?
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 30,height:25}} source={require("../../assets/bar_cart.png")} /> */}
                                <Icon type="SimpleLineIcons" name="handbag" style={{ color: '#000000', fontSize: 27 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText,{color: '#000000'}]}>Giỏ hàng</Text>
                        </View>:
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 30,height:25}} source={require("../../assets/bar_cart.png")} /> */}
                                <Icon type="SimpleLineIcons" name="handbag" style={{ color: '#777777', fontSize: 27 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText,{color: '#777777'}]}>Giỏ hàng</Text>
                        </View>
                    }
                    
                    
                </TouchableOpacity>
                
                <TouchableOpacity style={MainStyle.tFItem} onPress={()=>this.gotoShowrooms()}>
                    {
                        page == 'showrooms' ?
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 30,height:25}} source={require("../../assets/bar_showrooms.png")} /> */}
                                <Icon type="EvilIcons" name="location" style={{ color: '#000000', fontSize: 33 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText, {color: '#000000'}]}>Cửa hàng</Text>
                        </View> 
                        :
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 30,height:25}} source={require("../../assets/bar_showrooms.png")} /> */}
                                <Icon type="EvilIcons" name="location" style={{ color: '#777777', fontSize: 33 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText,{color: '#777777'}]}>Cửa hàng</Text>
                        </View>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={MainStyle.tFItem} onPress={()=>this.gotoUser()}>
                    {
                        page == 'user' ?
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 30,height:25}} source={require("../../assets/bar_profile.png")} /> */}
                                <Icon type="FontAwesome" name="user-o" style={{ color: '#000000', fontSize: 27 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText,{color: "#000000"}]}>Profile</Text>
                        </View> 
                        :
                        <View>
                            <View style={MainStyle.tFItemBoundIcon}>
                                {/* <Image style={{width: 30,height:25}} source={require("../../assets/bar_profile.png")} /> */}
                                <Icon type="FontAwesome" name="user-o" style={{ color: '#777777', fontSize: 27 }} />
                            </View>
                            <Text style={[MainStyle.tFItemText,{color: "#777777"}]}>Profile</Text>
                        </View>
                    }
                </TouchableOpacity>
                
                
            </View>
        );
    }
}

