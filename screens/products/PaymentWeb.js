import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, WebView } from 'react-native';
import { Container, Content, Icon} from "native-base";

import MainStyle from '../../styles/MainStyle';
import HeaderBase from '../template/HeaderBase';
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';
import global from './../api/global';

export default class PaymentWeb extends Component{

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);

        this.state = {
            heading: 'Thanh toán đơn hàng',
		}
    }

    componentDidMount() {
        
    }

    render() {
        const {navigation } = this.props;
        const {link} =  this.props.navigation.state.params;
        console.log(link);
        return(
            <Container>
				<HeaderBase heading={this.state.heading} page="payment" navigation={navigation} />
				<WebView
                    source={{uri: link}}/>
            </Container>
        );
    }
}