import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, PixelRatio } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import { Icon} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";

import { getCountNotifies } from './../api/apiTeacher';
import getStorage from './../api/getStorage';

import global from './../api/global';

export default class HeaderRight extends Component{
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            isDateTimePickerVisible: false,
            member_id: 0,
            total: 0
        }
    }

    componentDidMount() {
        getStorage('user')
        .then(user => {
            if (user != '') {
                let arrUser = JSON.parse(user);
                this.setState({member_id: arrUser.id}, this.onRefreshCount);
            }
        });

        this._interval = setInterval(() => {
            this.onRefreshCount();
        }, 3000);
    }

    componentWillUnmount(){
        clearInterval(this._interval);
    }

    onRefreshCount(){
        getCountNotifies(this.state.member_id)
        .then(resJSON => {
            const { total, error } = resJSON;
            if (error == false) {
                this.setState({
                    total: total
                });
            }
        })
    }

    onLogout() {
        this.props.navigation.navigate('NotificationsScreen');
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.hideDateTimePicker();
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var year = date.getFullYear();
        var cDate = year+'-'+month+'-'+day;
        console.log("A date has been picked: ", cDate);
        global.onChangeChangeDate(cDate);
    };

    renderButton(){
        const {navigation} = this.props;

        return (
            <TouchableOpacity onPress={() => this.onLogout()}>
                <Icon type="MaterialIcons" name="notifications" style={MainStyle.tHeaderIconNotify} />
                <View style={MainStyle.tNumberNotifi}>
                    <Text style={MainStyle.tNumberNotifiText}>{this.state.total}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderCalendar(){
        const {navigation} = this.props;
        if(this.props.page && (this.props.page =='muster' || this.props.page =='study' || this.props.page =='sleep' || this.props.page =='eat' || this.props.page =='list_news' || this.props.page =='news_detail'|| this.props.page =='message'|| this.props.page =='submit_message'|| this.props.page =='medicine'|| this.props.page =='submit_medicine'|| this.props.page =='album'|| this.props.page =='album_detail'|| this.props.page =='rest'|| this.props.page =='rest_home' || this.props.page =='remark_day'|| this.props.page =='remark_week'|| this.props.page =='remark_home') || this.props.page =='medicine_teacher' || this.props.page =='chat'|| this.props.page =='comment_day'|| this.props.page =='comment_week'){
            return (
                <TouchableOpacity onPress={() => this.showDateTimePicker()}>
                    <Icon type="FontAwesome" name="calendar" style={{color:'#fff',fontSize:25,fontWeight:'bold',paddingTop:18,paddingRight:5}} />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return(
            <View style={{alignSelf: 'flex-end',flexDirection:'row'}}>
                {this.renderCalendar()}
                {this.renderButton()}

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    cancelTextIOS={'Đóng'}
                    confirmTextIOS={'Xác nhận'}
                    />
            </View>
        );
    }
}