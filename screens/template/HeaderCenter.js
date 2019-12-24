import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text} from 'react-native';
import MainStyle from './../../styles/MainStyle';

import global from "../api/global";

export default class HeaderCenter extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    gotoHomeScreen() {
        switch(global.VERSION){
            case 'parent':
                this.props.navigation.navigate('NewsScreen');
                break;
            case 'teacher':
                this.props.navigation.navigate('HomeTeacherScreen');
                break;
            case 'master':
                this.props.navigation.navigate('HomeMasterScreen');
                break;
        }
    }

    renderButton(){
        const {navigation, page, title, heading} = this.props;

        switch(page){
            case 'home':
                return (
                    <TouchableOpacity onPress={() => this.gotoHomeScreen()}>
                        <Image style={[MainStyle.tHeaderLogoMenu,MainStyle.pHeaderLogoMenu]} source={require('./../../assets/logo_news.png')}/>
                    </TouchableOpacity>
                )
            default:
                if(global.VERSION == 'master')
                    return (
                        <TouchableOpacity onPress={() => this.gotoHomeScreen()}>
                            <Image style={[MainStyle.tHeaderLogoMenu,MainStyle.pHeaderLogoMenu]} source={require('./../../assets/logo_news.png')}/>
                        </TouchableOpacity>
                    )
                else
                    return (
                        <Text style={[MainStyle.tHeaderTitle,MainStyle.pHeaderTitle]}>{title}</Text>
                    )
        }
       
    }

    render() {
        return(
            <View style={{alignItems: 'center'}}>
                {this.renderButton()}
            </View>
        );
    }
}