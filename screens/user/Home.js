import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList , Alert} from 'react-native';
import { Picker} from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import {getCities, getDistricts, getAllShowrooms} from '../../src/api/apiShowrooms';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            
        }

        this.arr = [];
    }
 
    componentDidMount() {
        
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="user" title={'Thành viên'} navigation={navigation} />
                <ScrollView style={[MainStyle.pageShowrooms]}>
                    <View style={{padding: 20}}>
                        <Text style={{fontSize: 16, fontFamily:'RobotoRegular'}}>Hệ thống đang cập nhật vui lòng quay lại sau.</Text>    
                    </View>    
                </ScrollView>
                <FooterBase navigation={navigation} page="user" />
            </Container>
        );
    }
}
 