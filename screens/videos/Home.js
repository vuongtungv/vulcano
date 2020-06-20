import React, { Component } from 'react';
import { Dimensions, Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList, WebView, SafeAreaView  } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon, Item } from "native-base";
import {getAllVideos} from '../../src/api/apiVideos';

import YoutubePlayer from "react-native-youtube-iframe";

let ScreenWidth = Dimensions.get("window").width;


export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null, 
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            listVideos:[],
            page: 1,
        } 

        this.arr = [];
    }
 
    componentDidMount() {
        this.getAllVideos();
    }

    getAllVideos= () => {
        // this.setState({ loading: true });
        getAllVideos(this.state.page)
        .then(resJSON => {
            const { list, error } = resJSON;
            if (error == false) {
                this.setState({
                    listVideos: list,  
                    loading: false,
                    refreshing: false,
                    error: false || null,   
                });  
                console.log(this.state.listVideos);
            } else {
                this.setState({ loading: false, refreshing: false });
            }
     
        }).catch(err => {
            this.setState({ loading: false }); 
        });
    }


    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        },
        () => {
            this.getAllVideos();
        });
        // console.log(this.state.page);
    };
    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
	};


	
    render() {
        const {navigation} = this.props;
    
        return(
            <Container>
                <HeaderBase page="videos" title={'Vulcano videos'} navigation={navigation} />
                <View style={[MainStyle.pageNews, {marginTop: 20}]}>
                    {/* {this.state.listVideos.map((item, index) => {return (
                        <View key={item.id} style={MainStyle.itemVideos}>
                            <WebView
                                style={ MainStyle.styleVideos }
                                javaScriptEnabled={true}
                                source={{uri: item.link}}
                            />
                            <Text style={MainStyle.txtTitleVideos}>{item.title}</Text>
                        </View>
                    )})}     */} 
                    <FlatList  
                        data={this.state.listVideos}   
                        renderItem={({ item }) => (
                            <View key={item.id} style={MainStyle.itemVideos}>
                                {/* <WebView
                                        style={ MainStyle.styleVideos }
                                        javaScriptEnabled={true}
                                        domStorageEnabled={true}
                                        source={{ uri: item.link }}
                                    /> */}
                                    {/* <SafeAreaView style={{ flex: 1 }}> */}
                                        <YoutubePlayer height={(ScreenWidth-40)*9/16} width={ScreenWidth-40} videoId={item.youtube_key} />
                                    {/* </SafeAreaView> */}
                                <Text style={MainStyle.txtTitleVideos}>{item.title}</Text>
                            </View>          
                        )}
                        keyExtractor={item => item.id}
                        contentContainerStyle={MainStyle.containerListProducts} 
                        ListFooterComponent={this.renderFooter}     
                        refreshing={this.state.refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.5}
                    />   
                </View>
                <FooterBase navigation={navigation} page="muster" />
            </Container>
        );
    }
}
 