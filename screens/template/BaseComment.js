import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, TextInput, Modal, Alert, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import {getStudents, getComments, saveComments} from './../api/apiComment';
import {getCurentDate} from './../api/function';
import getStorage from './../api/getStorage';
const { width } = Dimensions.get('window');

import global from './../api/global';

export default class BaseComment extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            school_id: 0,
            class_group_id: 0,
            class_id: 50,
            teacher_id: 55,
            allow_more: true,
            loading: true,
            list: [],
            action: '',
            type: 0,
            heading: 'Nhận xét',
            modalVisible: false,
            comment: '',
            sComment: '',
            listComments: [],
            screen: 'HomeScreen',
            record_id: 0,
            number: 0,
            start_time: '12:00',
            end_time: '14:00',
            modalVisibleSleep: false,
            time: '',
            position: 0,
            label: 'Giờ ngủ',
            isCheckedAll: false,
            labelCheckedAll: 'Chọn tất cả',
            totalChecked: 0
        }

        this.arr = [];
    }

    componentDidMount() {
        const { action, type, screen, record_id } = this.props.navigation.state.params;

        this.setState({action, screen, record_id, type});

        getStorage('user')
        .then(user => {
            if (user != '') {
                let arrUser = JSON.parse(user);
                this.setState({ 
                    class_id: arrUser.class_id, 
                    teacher_id: arrUser.id,
                    school_id: arrUser.school_child_id,
                    class_group_id: arrUser.class_group_id, 
                });

                this.makeRemoteRequest();
            } 
        });

        getComments(action)
        .then(resJSON => {

            const {list, error } = resJSON;
            
			if(error == false){
				this.setState({
					listComments: list
				});
			}
        }).catch(err => {
            console.log(err);
		});

        var heading = 'Nhận xét';
        switch(action){
            case 'study':
                heading = 'Nhận xét học';
                /*if(type == 1)
                    heading = heading + ' sáng';
                else
                    heading = heading + ' chiểu';*/
                break;
            case 'eat':
                heading = 'Nhận xét ăn';
                break;
            case 'day':
                heading = 'Nhận xét hàng ngày';
                break;
            case 'week':
                heading = 'Nhận xét cuối tuần';
                break;
        }
        if(action == 'week')
            getStorage('weekComments')
            .then(weekComments => {
                if (weekComments != '') {
                    sComment = weekComments;
                    this.setState({sComment});
                } 
            })
        this.setState({heading, type});
    }

    makeRemoteRequest = () => {

        this.setState({ loading: true});
		
		getStudents(this.state.teacher_id, this.state.class_id, this.state.action, this.state.record_id, this.state.type)
        .then(resJSON => {
            const {list, error } = resJSON;
            
			if(error == false){
                this.arr = this.arr.concat(list);
                
				this.setState({
					list: this.arr, 
					loading: false, 
                    refreshing: false ,
                    allow_more: false
				});
			}else{
				this.setState({ 
					loading: false, 
					allow_more: false
				});
			}
				
        }).catch(err => {
			// console.log(err);
			this.setState({ loading: false });
        });
    
    }

    gotoDetailStudent(id) {
        this.props.navigation.navigate('DetailStudentsScreen', { id: id })
    }

	renderLoading  = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{paddingVertical: 20}}>
                <ActivityIndicator animating size="large" />
            </View>
        );
	};
    
    setChecked(index){
        var {list} = this.state;

        if(list[index].checked)
            list[index].checked = false;
        else
            list[index].checked = true;
        
        this.setState({list: list});

        this.calculatorChecked();
    }

    showModal(){
        this.setState({modalVisible: true});
    }

    hiddenModal(){
        this.setState({modalVisible: false});
    }

    setQuickComments(){
        this.setState({modalVisible: false});

        var {comment} = this.state;

        this.state.listComments.map((item)=>{
            if(item.checked)
                comment = comment + item.title
        });

        this.setState({comment});
    }

    checkQuickComments(index){
        var {listComments} = this.state;

        if(listComments[index].checked)
            listComments[index].checked = false;
        else
            listComments[index].checked = true;
        
        this.setState({listComments: listComments});
    }

    setHygieneNumber(type){
        var {list} = this.state;
        var number = parseInt(this.state.number);
        if(type == 2)
            number = number + 1;
        else{
            number = number - 1;
            if(number < 0)
                number = 0;
        }
        this.setState({number});
    }

    saveComments(){
        listId = '0';
        const {school_id, class_group_id, class_id, teacher_id, list, action, type, comment, record_id} = this.state;

        list.map((item)=>{
            if(item.checked)
                listId = listId + ','+ item.id
        });

        if(listId == '0'){
            Alert.alert('Thông báo', 'Bạn vui lòng chọn học sinh.');
            return;
        }
        var sComment = '';
        if(this.state.action != 'week'){
            if(comment == ''){
                Alert.alert('Thông báo', 'Bạn vui lòng nhập nhận xét.');
                return;
            }
            sComment = comment;
        }else{
            sComment = this.state.sComment;
        }

        var data = '';
        switch(action){
            case 'hygiene':
                data = this.state.number;
            break;
            case 'sleep':
                data = this.state.start_time+'|'+this.state.end_time
            break;
        }

        if(action == 'day' || action == 'week'){
            this.props.navigation.navigate('BaseVotesScreen', { school_id, class_group_id, teacher_id, class_id, listId, action, sComment, type, record_id, data })
        }else
            saveComments(school_id, class_group_id, teacher_id, class_id, listId, action, sComment, type, record_id, data)
            .then(resJSON => {
                Alert.alert('Thông báo', 'Đăng gửi nhận xét thành công',[
                    {text: 'OK', onPress: () => {
                        this.props.navigation.goBack();

                        global.onRefresh();
                        
                        this.props.navigation.navigate(this.state.screen);
                    }},
                ]);

            }).catch(err => {
                console.log(err);
            });
    }

    editTime(time, position){
        var label = 'Giờ ngủ';
        if(position == 2)
            label = 'Giờ dậy';
        this.setState({modalVisibleSleep: true, time, position, label});
    }

    saveTime(){
        if(this.state.position == 1)
            this.setState({start_time:this.state.time});
        else
            this.setState({end_time:this.state.time});
        this.setState({modalVisibleSleep: false, time: '', position: 0});
    }

    setCheckedAll(){
        var {list} = this.state;

        this.state.list.map((item, index)=>{
            list[index].checked = !this.state.isCheckedAll;
        });

        if(this.state.isCheckedAll == false){
            this.setState({
                isCheckedAll: true,
                labelCheckedAll: 'Bỏ chọn',
                list: list
            });
        }else{
            this.setState({
                isCheckedAll: false,
                labelCheckedAll: 'Chọn tất cả',
                list: list
            });
        }

        this.calculatorChecked();
    }

    calculatorChecked(){
        var totalChecked = 0;
        this.state.list.map((item, index)=>{
            if(item.checked)
                totalChecked++;
        });
        this.setState({totalChecked});
    }

    render() {
        const {navigation} = this.props;

        return(
            <Container> 
                <HeaderBase page="muster" title={this.state.heading} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault, {paddingTop: 10}]}>
                    <View style={MainStyle.tHeadDate}>
                        <Text style={MainStyle.tHeadDateText}>{getCurentDate()}</Text>
                    </View>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFixDefault, {backgroundColor: '#f5fdff'}]}>
                        <View style={MainStyle.tbcTools}>
                            <Text style={MainStyle.tbcToolsText}>Nhận xét <Text style={MainStyle.tbcToolsTextBold}>{this.state.totalChecked}/{this.state.list.length}</Text></Text>
                            <TouchableOpacity style={MainStyle.btnSelect}
                                onPress={() => this.setCheckedAll()}>
                                <Text style={MainStyle.btnSelectText}>{this.state.labelCheckedAll}</Text>
                            </TouchableOpacity>
                        </View>
                        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} enableOnAndroid={true} behavior={Platform.OS === "ios" ? 'position' : 'height'}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {this.state.list.map((item, index) =>
                                    <TouchableOpacity key={index} style={[MainStyle.tStudentItem, { marginBottom: 15, alignItems: 'center'}]} 
                                        onPress={()=>this.setChecked(index)}>
                                        <View style={[MainStyle.tsiThumb, MainStyle.tsiThumbTiny]}>
                                            <Image style={[MainStyle.tsiThumbImg, MainStyle.tsiThumbImgTiny]} source={{uri: item.image}}/>
                                        </View>
                                        <View style={[MainStyle.tsiSummary, { zIndex: 1, width: width - (100 + 55)}]}>  
                                            <Text style={MainStyle.tsiSummaryName}>{item.name}</Text>
                                        </View>
                                        <CheckBox onPress={()=>this.setChecked(index)} style={[MainStyle.tCheckBox, {borderRadius: 0}]} checked={this.state.list[index].checked} color={this.state.list[index].checked ? '#d4145a' :'#999999'}/>
                                    </TouchableOpacity>
                                )}
                                {this.renderLoading()}
                                {this.state.action == 'sleep' ?
                                    <View style={[MainStyle.tsiBoundSt, { justifyContent: 'center' }]}>
                                        <TouchableOpacity style={MainStyle.tstBtn}
                                            onPress={() => this.editTime(this.state.start_time, 1)}>
                                            <Text style={MainStyle.tstBtnText}>{this.state.start_time}</Text>
                                        </TouchableOpacity>
                                        <Icon type="FontAwesome" name="angle-double-right" style={MainStyle.tstIcon} />
                                        <TouchableOpacity style={[MainStyle.tstBtn, { backgroundColor: '#9bc632' }]}
                                            onPress={() => this.editTime(this.state.end_time, 2)}>
                                            <Text style={MainStyle.tstBtnText}>{this.state.end_time}</Text>
                                        </TouchableOpacity>
                                    </View> 
                                : null}
                                {this.state.action == 'hygiene' ?
                                    <View style={MainStyle.tsiBoundSt}>
                                        <Text style={{fontFamily: 'Avo'}}>Số lần đại tiện</Text>
                                        <View style={MainStyle.tsiBoundTool}>
                                            <TouchableOpacity onPress={() => this.setHygieneNumber(1)}>
                                                <Image style={{ width: 22, height: 22 }} source={require('./../../assets/icon_tru.png')} />
                                                {/* <Icon type="AntDesign" name="minuscircleo" style={MainStyle.tstToolIcon} /> */}
                                            </TouchableOpacity>
                                            <Text style={MainStyle.tstToolText}>{this.state.number}</Text>
                                            <TouchableOpacity onPress={() => this.setHygieneNumber(2)}>
                                                <Image style={{ width: 22, height: 22 }} source={require('./../../assets/icon_cong.png')} />
                                                {/* <Icon type="AntDesign" name="pluscircleo" style={MainStyle.tstToolIcon} /> */}
                                            </TouchableOpacity>
                                        </View>
                                    </View> 
                                : null}
                                {this.state.action != 'week' ?
                                    <View style={{ marginTop: 10 }}>
                                        <TextInput multiline={false} onChangeText={(comment) => this.setState({ comment })}
                                            numberOfLines={1} placeholder="Nhận xét" style={[MainStyle.prestTextArea,MainStyle.fontAvo, { marginBottom: 0, padding: 10, fontSize: 15, color: '#4d4d4d',paddingRight: 40, paddingTop: 10 }]}>
                                            {this.state.comment}
                                        </TextInput>
                                        <TouchableOpacity style={MainStyle.prestTextAreaBtn}
                                            onPress={() => { this.showModal() }}>
                                            <Image style = {{width: 20, height:10, marginTop:8}} source= {require('./../../assets/icon_down.png')}/>
                                        </TouchableOpacity>
                                    </View> 
                                : null}
                                <View style={[MainStyle.tBoundBtn, { marginTop: 10, marginBottom: 20}]}>
                                    <TouchableOpacity style={[MainStyle.tBtnAction, { backgroundColor: '#2AC4F3' }]}
                                        onPress={() => { this.saveComments() }}>
                                        <Text style={[MainStyle.tBtnActionText, { fontSize: 22 }]}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                    <Modal 
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}>
                        <View style={MainStyle.tContainerModal}>
                            
                            <View style={[MainStyle.tModalBody, { width: width - 80 }]}>
                                <View style={{ paddingTop: 10, backgroundColor: "#25bdf1", borderRadius: 25 }}></View>
                                {/* <TouchableOpacity style={MainStyle.tBtnCloseModal}
                                    onPress={()=>{ this.hiddenModal()}}>
                                    <Icon type="AntDesign" name="closecircleo" style={{fontSize: 30, color: '#ED1E79'}}/>
                                </TouchableOpacity> */}
                                {/*---------*/}
                                <View style={MainStyle.tModalContent}>
                                    <ScrollView>
                                    {this.state.listComments.map((item, index) =>
                                        <TouchableOpacity key={index} style={[MainStyle.tCmtItem, {backgroundColor: this.state.listComments[index].checked?'#fff':'#fff'}]} 
                                            onPress={()=>{ this.checkQuickComments(index)}}>
                                            <Text style={[MainStyle.fontAvo,{marginBottom: 5,color: this.state.listComments[index].checked?'#ED1E79':'#4d4d4d'}]} >{item.title}</Text>
                                        </TouchableOpacity>
                                    )}
                                    </ScrollView>
                                </View>
                                <TouchableOpacity style={MainStyle.tBtnModal}
                                    onPress={()=>{ this.setQuickComments()}}>
                                    <Text  style={MainStyle.tBtnModalText}>Xác nhận</Text>
                                </TouchableOpacity>
                                {/*---------*/}
                            </View>
                        </View>
                    </Modal>
                    <Modal 
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisibleSleep}
                        onRequestClose={() => {
                            
                        }}>
                        <View style={MainStyle.tContainerModal}>
                            <View style={[MainStyle.tModalBody, { width: width - 80 }]}>
                                <View style={{ paddingTop: 10, backgroundColor: "#25bdf1", borderRadius: 25 }}></View>
                                <View style={{padding: 10}}><Text style={{fontSize: 18, color: '#ea1b6e', textAlign: 'center', fontWeight: 'bold'}}>{this.state.label}</Text></View>
                                <TextInput style={MainStyle.tTimeText} onChangeText={(time)=>this.setState({time})} onSubmitEditing = {()=>this.onSubmit()} ref={input=>{this.loginPass = input;}} value={this.state.time} placeholderTextColor='#333' selectionColor="#333" placeholder={this.state.label} returnKeyType='done' 
                                    onSubmitEditing={() =>this.saveTime()}/>
                                <TouchableOpacity style={MainStyle.tBtnModal}
                                    onPress={()=>this.saveTime()}>
                                    <Text  style={MainStyle.tBtnModalText}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 