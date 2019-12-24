import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput} from 'react-native';
import { CheckBox } from 'react-native-elements';
import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';
import {getAnswer} from '../../src/api/apiQuestion';
import MainStyle from '../../styles/MainStyle';

const {width} = Dimensions.get('window');

export default class FaqItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            info: {
                id: 0,
                cat_id: 0,
                title: '',
                ordering: 0,
                multi_check: 0,
                answers: [],
                other_answer: ''
            },
            questions: [],
            relate_detail: {
                title: '',
                summary: '',
                questions: []
            },
            relate_questions: []
        };
    }

    componentDidMount() {
        const {info, questions} = this.props;

        this.setState({
            info: info,
            questions: questions
        });
    }

    onCheckBoxPress(ans_id){
        let tmpQuestions = this.state.questions;
        
        if(tmpQuestions.multi_check == 1){
            tmpQuestions.answers[ans_id].checked = !tmpQuestions.answers[ans_id].checked;
        }else{
            for (var key in tmpQuestions.answers) {
                if (!tmpQuestions.answers.hasOwnProperty(key)) continue;
                tmpQuestions.answers[key].checked = false;
            }
            
            tmpQuestions.answers[ans_id].checked = !tmpQuestions.answers[ans_id].checked;
            
            if(tmpQuestions.answers[ans_id].checked && tmpQuestions.answers[ans_id].question_relate!=''){
                getAnswer(0, 0, this.state.info.cat_id, tmpQuestions.answers[ans_id].question_relate, tmpQuestions.ordering)
                .then(resJSON => {
                    const {detail, questions} = resJSON;

                    this.setState({
                        relate_detail: detail, 
                        relate_questions: questions
                    });

                    getStorage('questions')
                    .then(ques => {
                        var arrQuestions = [];
                        if(ques != ''){
                        
                            arrQuestions = JSON.parse(ques);
                        }

                        for (var key in questions) {
                            var keyExists = false;
                            arrQuestions.map(function(e){
                                if(key == e.id)
                                    keyExists = true;
                            });
                            if(keyExists == false)
                                arrQuestions.push(questions[key]);
                        }

                        saveStorage('questions', JSON.stringify(arrQuestions));
                    })
                    .catch(err => console.log(err));

                })
                .catch(err => console.log(err));
            }else{
                this.setState({
                    relate_detail: {
                        title: '',
                        summary: '',
                        questions: []
                    }, 
                    relate_questions: []
                });
            }
        }

        tmpQuestions.reply = true;

        this.setState({
            questions: tmpQuestions
        });

        this.saveQuestionsStorage(tmpQuestions);
    }

    setOtherAnswer(answer_formulation){
        let tmpQuestions = this.state.questions;
        tmpQuestions.answer_formulation = answer_formulation;
        this.setState({
            questions: tmpQuestions
        });

        this.saveQuestionsStorage(tmpQuestions);
    }

    saveQuestionsStorage(questions){
        getStorage('questions')
        .then(ques => {
            var arrQuestions = [];
            var tmpQuestions = [];

            if(ques != ''){
                arrQuestions = JSON.parse(ques);
            }
            
            arrQuestions.map(function(e){
                if(questions.id == e.id)
                    tmpQuestions.push(questions);
                else
                    tmpQuestions.push(e);
            });

            saveStorage('questions', JSON.stringify(tmpQuestions));
        })
        .catch(err => console.log(err));
    }

    render() {

        const e = this.state.info;

        return(
            <View key={e.id} >
                <View>
                    <View style={[MainStyle.scrollDateNow,{ paddingTop: 20}]}>
                        <View style={[MainStyle.buttonBlue, {paddingBottom: 10,paddingTop: 10, alignItems:'flex-start', justifyContent:'flex-start',minHeight:80}]}>
                            <Text style={{fontSize:15,paddingLeft:10,paddingTop:5,paddingBottom:5, color: '#4d4d4d',fontFamily: 'AvoBold'}}>{e.ordering}. {e.title}</Text>
                        </View>
                    </View>
                </View>
                {e.multi_check == 0?(
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        {e.answers.map(a => (
                        <View style={[MainStyle.psiBoundCB]}>
                            <CheckBox key={a.id}
                                onPress={() => this.onCheckBoxPress(a.id)}
                                style={{fontFamily:'Avo'}}
                                containerStyle = {styles.qiAnswer}
                                textStyle = {styles.qiAnswerText}
                                
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor='#ed1e79'
                                checked={this.state.questions.answers[a.id].checked}
                                    />
                            <Text style={{fontFamily:'Avo', fontSize: 13, paddingTop: 3}}>{a.title}</Text>
                        </View>
                        ))}  
                    </View>
                ):(
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        {e.answers.map(a => (
                            <View style={[MainStyle.psiBoundCB]}>
                            <CheckBox key={a.id}
                                onPress={() => this.onCheckBoxPress(a.id)}
                                containerStyle = {styles.qiAnswer}
                                textStyle = {styles.qiAnswerText}
                                title={a.title}
                                checkedColor='#f48120'
                                checked={this.state.questions.answers[a.id].checked} />
                            </View>
                        ))}
                    </View>
                )}
                {this.state.relate_detail.questions.map(a => (
                    <FaqItem info={a} questions={this.state.relate_questions[a.id]} key={a.id} />
                ))}
            </View>
           
        );
    }
}

const styles = StyleSheet.create({
    questionItem: {
        paddingTop: 10,
    },
    qiHeading: {
        backgroundColor: '#e5f1f8',
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    qihNumber: {
        width: 35,
        height: 35,
        backgroundColor: '#f48120',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        marginRight: 10
    },
    qihNumberText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    qihTitle:{
        width: width - 65,
    },
    qihTitleText: {
        fontSize: 14,
        color: '#222222',
    },
    qiOther:{
        padding: 10
    },
    qiOtherInput: {
        height: 40, 
        borderColor: '#555555', 
        borderWidth: 1,
        paddingLeft: 5
    },
    qiAnswer:{
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        padding: 0,
        margin: 0,
        marginTop: 5
    },
    qiAnswerText:{
        fontSize: 12,
        color: '#555555'
    },
});