import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, PixelRatio } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import { Icon} from "native-base";
import { DrawerActions } from 'react-navigation';

import global from './../api/global';

export default class HeaderLeft extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    gotoInformation(){
        this.props.navigation.navigate('Information');
    }

    gotoBack(){
        // global.onRefreshCount();
        this.props.navigation.goBack();
    }

    renderButton(){
        const {navigation} = this.props;
            if(this.props.page && this.props.page == 'home'){
                return (
                    <TouchableOpacity onPress={() => this.gotoInformation()}>
                        <Icon type="SimpleLineIcons" name="menu" style={[MainStyle.tHeaderIconMenu,{fontSize:25, marginTop:20}]} />
                    </TouchableOpacity>
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => this.gotoBack()}>
                        <Icon type="SimpleLineIcons" name="arrow-left" style={[MainStyle.tHeaderIconMenu,{fontSize:25, marginTop:20}]} />
                    </TouchableOpacity>
                )
            }
        }
    
    renderSearchNews(){
        const {navigation} = this.props;
        if(this.props.page && (this.props.page == 'list_news' || this.props.page == 'news_detail'|| this.props.page == 'album'|| this.props.page == 'album_detail' )){
            return (
                <TouchableOpacity >
                    <Icon type="AntDesign" name="search1" style={MainStyle.psearchNewsIcon} />
                </TouchableOpacity>
            )
        }

    }
    renderAddMessage(){
        const {navigation} = this.props;
        if(this.props.page && (this.props.page == 'message' )){
            return (
                <TouchableOpacity onPress={() => navigation.navigate('SubmitMessageScreen')}>
                    <Icon type="AntDesign" name="plus" style={MainStyle.pAddMessageIcon} />
                </TouchableOpacity>
            )
        }

    }
    renderAddMedicine(){
        const {navigation} = this.props;
        if(this.props.page && (this.props.page == 'medicine')){
            return (
                <TouchableOpacity onPress={() => navigation.navigate('SubmitMedicineScreen')}>
                    <Icon type="AntDesign" name="plus" style={MainStyle.pAddMessageIcon} />
                </TouchableOpacity>
            )
        }

    }
    renderAddRest(){
        const {navigation} = this.props;
        if(this.props.page && (this.props.page == 'rest_home')){
            return (
                <TouchableOpacity onPress={() => navigation.navigate('Rest')}>
                    <Icon type="AntDesign" name="plus" style={MainStyle.pAddMessageIcon} />
                </TouchableOpacity>
            )
        }

    }
    render() {
        return(
            <View style={{alignSelf: 'flex-start', flexDirection:'row'}}>
                {this.renderButton()}
                {this.renderSearchNews()}
                {this.renderAddMessage()}
                {this.renderAddMedicine()}
                {this.renderAddRest()}
            </View>
        );
    }
}