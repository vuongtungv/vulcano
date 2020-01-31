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
                                <WebView
                                    style={ MainStyle.styleVideos }
                                    javaScriptEnabled={true}
                                    source={{uri: item.link}}
                                />
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
 