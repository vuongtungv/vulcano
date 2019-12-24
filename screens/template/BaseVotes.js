import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Container, Icon } from "native-base";
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';

import {getVotesBaby, saveComments} from './../api/apiComment';
import {getCurentDate} from './../api/function';
import saveStorage from './../api/saveStorage';
import global from './../api/global';

export default class BaseVotes extends Component {
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {   
        super(props);

        this.state = {
            heading: 'Phiếu bé ngoan',
            loading: true,
            list: [],
        }
    } 

    componentDidMount() {
        const { school_id, class_group_id, teacher_id, class_id, listId, action, sComment, type, record_id, data } = this.props.navigation.state.params;

        getVotesBaby(school_id)
        .then(resJSON => {

            const {list, error } = resJSON;
            
			if(error == false){
				this.setState({
					list: list
				});
			}
        }).catch(err => {
            console.log(err);
        });
        
    }

    setChecked(index){
        var {list} = this.state;
        list.map((item, i) =>{
            list[i].checked = false;
        });
        list[index].checked = true;
        this.setState({list: list});
    }

    saveComments(){
        var {list} = this.state;
        listCk = '0';
        data = '';
        list.map((item)=>{
            if(item.checked){
                listCk = listId + ','+ item.id
                data = item.id + "|"+ item.image;
            }
        });

        if(listCk == '0'){
            Alert.alert('Thông báo', 'Bạn vui lòng chọn phiếu bé ngoan.');
            return;
        }

        data = encodeURIComponent(data);

        const { school_id, class_group_id, teacher_id, class_id, listId, action, sComment, type, record_id } = this.props.navigation.state.params;

        saveComments(school_id, class_group_id, teacher_id, class_id, listId, action, sComment, type, record_id, data)
        .then(resJSON => {
            Alert.alert('Thông báo', 'Gửi nhận xét thành công',[
                {text: 'OK', onPress: () => {
                    saveStorage('CommentTeacher', 'true');

                    this.props.navigation.goBack();

                    global.onRefresh();

                    if(action == 'day')
                        this.props.navigation.navigate('CommentDayTeacherScreen');
                    else
                        this.props.navigation.navigate('CommentWeekTeacherScreen');
                }},
            ]);

        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        const { navigation} = this.props;

        return (
            <Container> 
                <HeaderBase page="votes" title={this.state.heading} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault, {paddingTop: 10}]}>
                    <View style={MainStyle.tHeadDate}>
                        <Text style={MainStyle.tHeadDateText}>{getCurentDate()}</Text>
                    </View>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFixDefault, {backgroundColor: '#f5fdff'}]}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={MainStyle.voteList}>
                                {this.state.list.map((item, index) =><TouchableOpacity style={MainStyle.voteItem} key={item.id} onPress={()=>this.setChecked(index)}>
                                    {this.state.list[index].checked?<Icon type="AntDesign" name="checkcircle" style={MainStyle.voteItemCheck} />:null}
                                    <Image style={MainStyle.voteItemImg} source={{ uri: item.image }} />
                                </TouchableOpacity>)}
                            </View>
                            <View style={[MainStyle.tBoundBtn, { marginTop: 10, marginBottom: 20}]}>
                                <TouchableOpacity style={[MainStyle.tBtnAction, { backgroundColor: '#2AC4F3' }]}
                                    onPress={() => { this.saveComments() }}>
                                    <Text style={[MainStyle.tBtnActionText, { fontSize: 22 }]}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <FooterBase navigation={navigation} page="votes"  />
            </Container>
        );
    }
}
