import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList,WebView } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import {getAllVideos} from '../../src/api/apiVideos';
import { Video } from 'expo-av';
export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            listVideos:[],
        }

        this.arr = [];
    }
 
    componentDidMount() {
        this.getAllVideos();
    }

    getAllVideos= () => {
        this.setState({ loading: true });
        getAllVideos()
        .then(resJSON => {
            const { list, error } = resJSON;
            if (error == false) {
                this.setState({
                    listVideos: list,  
                    loading: false,
                    refreshing: false,
                    error: false || null,   
                });  
            } else {
                this.setState({ loading: false, refreshing: false });
            }
     
        }).catch(err => {
        
        });
      }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="videos" title={'Vulcano videos'} navigation={navigation} />
                <ScrollView style={[MainStyle.pageNews, {marginTop: 20}]}>
                    {this.state.listVideos.map((item, index) => {return (
                        <View key={item.id} style={MainStyle.itemVideos}>
                            <WebView
                                style={ MainStyle.styleVideos }
                                javaScriptEnabled={true}
                                source={{uri: item.link}}
                            />
                            <Text style={MainStyle.txtTitleVideos}>{item.title}</Text>
                        </View>
                    )})}     
                </ScrollView>
                <FooterBase navigation={navigation} page="muster" />
            </Container>
        );
    }
}
 